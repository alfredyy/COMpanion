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

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchProfile = async () => {
                try {
                    const { data, error } = await supabaseClient
                        .from('profiles')
                        .select('name, owned_companions')
                    if (isActive) {
                        console.log(data)
                        setName(data[0].name);
                        setCompanionsAdopted(data[0].owned_companions.length)
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

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const fetchTodos = async () => {
                try {
                    const { data, error } = await supabaseClient
                        .from('todos')
                        .select('id', { count: 'exact' })
                    if (isActive) {
                        console.log(data);
                        setTasksAdded(data.length);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchTodos();

            return () => {
                isActive = false;
            };
        }, []));

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
                <Card containerStyle={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', padding: 5 }} >
                        <Icon name='account-details' type='material-community' color='black' size={24} marginRight={10} />
                        <Text style={styles.cardTitle}>
                            Account Details
                        </Text>
                    </View>
                    <Card.Divider />
                    <View style={styles.cardLine}>
                        <Text>
                            Name
                        </Text>
                        <Text>
                            {name}
                        </Text>
                    </View>
                    {/* <Card.Divider />
                    <View style={styles.cardLine}>
                        <Text>
                            Email
                        </Text>
                        <Text>
                            {email}
                        </Text>
                    </View> */}
                </Card>
                <Card containerStyle={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', padding: 5 }} >
                        <Icon name='stats-chart' type='ionicon' color='black' size={24} marginRight={10} />
                        <Text style={styles.cardTitle}>
                            Statistics
                        </Text>
                    </View>
                    <Card.Divider />
                    <View style={styles.cardLine}>
                        <Text>
                            Tasks Added
                        </Text>
                        <Text>
                            {tasksAdded}
                        </Text>
                    </View>
                    <Card.Divider />
                    <View style={styles.cardLine}>
                        <Text>
                            Companions Adopted
                        </Text>
                        <Text>
                            {companionsAdopted}
                        </Text>
                    </View>
                    {/* <Card.Divider />
                    <View style={styles.cardLine}>
                        <Text>
                            Joined On
                        </Text>
                        <Text>
                            {joinedOn.toString()}
                        </Text>
                    </View> */}
                </Card>
                <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                    <Icon name='logout' type='material' color='#fff' size={24} marginRight={5} />
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
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
});
