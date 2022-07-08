import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import Toast from 'react-native-toast-message';

export default function ForgotPasswordPage({ navigation }) {
    let loading = false
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')


    async function sendEmail() {
        if (email.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Enter Email!'
            });
        } else {
            try {
                loading = true
                const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
                    email
                )
                if (error) {
                    Toast.show({
                        type: 'error',
                        text1: error.message
                    });
                    console.log(error.message)
                } else if (data) {
                    Toast.show({
                        type: 'success',
                        text1: 'Sent!',
                        text2: 'Check your email inbox!'
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

    async function verifyOTP() {
        if (token.length == 0 || email.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Fields'
            });
        } else {
            try {
                loading = true
                const { user, session, error } = await supabaseClient.auth.verifyOTP({
                    email,
                    token,
                    type: 'recovery'
                })
                if (error) {
                    Toast.show({
                        type: 'error',
                        text1: error.message
                    });
                    console.log(error.message)
                } else {
                    Toast.show({
                        type: 'success',
                        text1: 'Success!',
                        text2: 'Reset your password in Profile > Account'
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
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Image style={styles.logo} source={require('../assets/logo2.png')} />

            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: 10 }}>
                Forgot Password?
            </Text>

            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Roboto', marginHorizontal: 50, textAlign: 'center', marginBottom: 10 }}>
                Enter the email you signed up with to receive a One-Time Password (OTP)
            </Text>

            <View style={styles.rectangle}>

                <View style={styles.inputField}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => sendEmail()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        SEND EMAIL
                    </Text>
                </TouchableOpacity>

                <View style={styles.inputField}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="OTP"
                        onChangeText={(token) => setToken(token)}
                        autoCapitalize='none'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => verifyOTP()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        VERIFY OTP
                    </Text>
                </TouchableOpacity>

            </View>
            <Toast />
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ec2929',
        paddingTop: StatusBar.currentHeight,
        height: Dimensions.get('window').height,
    },
    inputField: {
        backgroundColor: "#ffffff",
        width: "80%",
        borderRadius: 25,
        height: 55,
        marginBottom: 10,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 55,
        fontFamily: "Roboto",
        width: '100%'
    },
    rectangle: {
        paddingVertical: 40,
        width: Dimensions.get("window").width,
        backgroundColor: "#f9f9f9",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        resizeMode: 'contain',
        marginBottom: -30
    }
});
