import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';

export default function Account({ navigation }) {
    let loading = false;
    const [id, setID] = useState(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchProfile = async () => {
                try {
                    const { data, error } = await supabaseClient
                        .from('profiles')
                        .select('id, name, email')
                    if (isActive) {
                        console.log(data)
                        setID(data[0].id)
                        setName(data[0].name);
                        setEmail(data[0].email)
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchProfile();

            return () => {
                isActive = false
            };
        }, []));

    async function saveChanges() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (name.length == 0 || email.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Fields!',
            });
        } else if (reg.test(email) === false) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email!',
            });
        } else {
            try {
                loading = true
                const { user, error } = await supabaseClient.auth.update({
                    data: { name: name },
                    email: email,
                })

                const { data, error1 } = await supabaseClient
                    .from('profiles')
                    .update({
                        name: name,
                        email: email,
                    })
                    .eq('id', id)

                if (error) {
                    Toast.show({
                        type: 'error',
                        text1: error.message
                    });
                    console.log(error.message)
                } else if (user) {
                    Toast.show({
                        type: 'success',
                        text1: 'Saved!'
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: error.message
                });
            } finally {
                loading = false
            }
        }
    }

    async function handleChangePassword() {

        if (password.length == 0 || cpassword.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Fields!',
            });
        } else if (password != cpassword) {
            Toast.show({
                type: 'error',
                text1: 'Passwords do not match!',
            });
        } else if (password.length <= 6) {
            Toast.show({
                type: 'error',
                text1: 'Password Not Long Enough!',
              });
        } else {
            try {
                loading = true
                const { user, error } = await supabaseClient.auth.update({
                    password: password,
                })

                if (error) {
                    Toast.show({
                        type: 'error',
                        text1: error.message
                    });
                    console.log(error.message)
                } else if (user) {
                    Toast.show({
                        type: 'success',
                        text1: 'Saved!'
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: error.message
                });
            } finally {
                loading = false
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <Header
                    statusBarProps={{ backgroundColor: '#ec2929' }}
                    placement='left'
                    leftComponent={{ icon: 'account-details', color: '#fff', size: 30, type: 'material-community' }}
                    centerComponent={{ text: 'Account', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />

                <Text style={styles.mainTitles}>
                    Personal Information
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.titles}>
                        Name
                    </Text>

                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={name}
                            onChangeText={(name) => setName(name)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.titles}>
                        Email
                    </Text>

                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={email}
                            onChangeText={(email) => setName(email)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => saveChanges()} disabled={loading}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        SAVE CHANGES
                    </Text>
                </TouchableOpacity>

                <Text style={styles.mainTitles}>
                    Password
                </Text>

                <View style={styles.passwordInputField}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize='none'
                    />
                </View>

                <View style={styles.passwordInputField}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="confirm password"
                        secureTextEntry={true}
                        onChangeText={(cpassword) => setCpassword(cpassword)}
                        autoCapitalize='none'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => handleChangePassword()} disabled={loading}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        CHANGE PASSWORD
                    </Text>
                </TouchableOpacity>

                <Toast />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    inputField: {
        backgroundColor: "#ffffff",
        width: "60%",
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        marginRight: '15%'
    },
    passwordInputField: {
        backgroundColor: "#ffffff",
        width: "80%",
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        marginTop: 20
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50
    },
    titles: {
        fontWeight: 'bold',
        marginRight: 30,
        alignSelf: 'flex-start',
        marginLeft: '15%',
        marginTop: 15
    },
    mainTitles: {
        fontWeight: 'bold',
        marginTop: 20
    }
});
