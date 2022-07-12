import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';

export default function ProfilePage({ navigation }) {
    let loading = false;
    const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    const [tasksAdded, setTasksAdded] = useState(0)
    const [companionsAdopted, setCompanionsAdopted] = useState(0)
    // const [joinedOn, setJoinedOn] = useState(new Date())

    async function handleLogout() {
        try {
            loading = true
            const { error } = await supabaseClient.auth.signOut()
            if (error) throw error;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.message
            });
        } finally {
            loading = false
            Toast.show({
                type: 'success',
                text1: 'Successfully Logged Out'
            });
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
                    leftComponent={{ icon: 'person', color: '#fff', size: 30, type: 'octicon' }}
                    centerComponent={{ text: 'Profile', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />

                <TouchableOpacity style={styles.listMenu} onPress={() => navigation.navigate("Account")}>
                    <View style={{ flexDirection: 'row', padding: 5 }} >
                        <Icon name='account-details' type='material-community' color='grey' size={26} marginHorizontal={20} />
                        <View style={{flexDirection:'column'}}>
                            <Text>
                                Account
                            </Text>
                            <Text style={{color:'grey'}}>
                                Name, email, password
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listMenu} onPress={() => navigation.navigate("Statistics")}>
                    <View style={{ flexDirection: 'row', padding: 5 }} >
                        <Icon name='stats-chart' type='ionicon' color='grey' size={26} marginHorizontal={20} />
                        <View style={{flexDirection:'column'}}>
                            <Text>
                                Statistics
                            </Text>
                            <Text style={{color:'grey'}}>
                                User statistics
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listMenu} onPress={() => navigation.navigate("AppInfo")}>
                    <View style={{ flexDirection: 'row', padding: 5 }} >
                        <Icon name='info' type='feather' color='grey' size={26} marginHorizontal={20} />
                        <View style={{flexDirection:'column'}}>
                            <Text>
                                App Info
                            </Text>
                            <Text style={{color:'grey'}}>
                                About, how to use, acknowledgement links
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                    <Icon name='logout' type='material' color='#fff' size={24} marginRight={5} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        LOGOUT
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
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row'
    },
    cardContainer: {
        // padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '80%',
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        marginBottom: 20
    },
    cardTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',

    },
    cardLine: {
        padding: 10,
        backgroundColor: '#fff',
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    listMenu: {
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: '#f9f9f9'
    }
});
