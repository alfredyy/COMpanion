import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Header, Icon, Card, Tooltip } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import Toast from 'react-native-toast-message';

export default function ShopPage({ navigation }) {
    const componentMounted = useRef(true);
    const [id, setID] = useState('');
    const [currency, setCurrency] = useState(0);
    const [ownedCompanions, setOwnedCompanions] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchData = async () => {
                try {
                    const { data, error } = await supabaseClient
                        .from('profiles')
                        .select('id, currency, owned_companions')
                    if (isActive) {
                        console.log('ID: ', data[0].id)
                        console.log('Currency: ', data[0].currency);
                        console.log('Owned Companions: ', data[0].owned_companions)
                        setID(data[0].id)
                        setCurrency(data[0].currency);
                        setOwnedCompanions(data[0].owned_companions)
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchData();

            return () => {
                isActive = false
            };
        }, []));

    //ADOPT COMPANION DOESNT WORK YET
    const adoptCompanion = async (name) => {
        if (currency < 160) {
            Toast.show({
                type: 'error',
                text1: 'Insufficient Coins!',
                text2: 'Complete tasks to earn coins!'
            });
        } else if (ownedCompanions.includes(name)) {
            Toast.show({
                type: 'info',
                text1: 'This companion has been adopted already'
            });
        } else {
            let newOwnedCompanions = ownedCompanions.concat(name)
            const { data, error } = await supabaseClient
                .from('profiles')
                .update({ owned_companions: newOwnedCompanions, currency: currency - 160 })
                .eq('id', id)
            if (error) {
                console.log(error);
            } else {
                console.log(data)
                setCurrency(data[0].currency);
                setOwnedCompanions(data[0].owned_companions)
            }
        }
    };

    const selectCompanion = async (name) => {
        const { data, error } = await supabaseClient
            .from('profiles')
            .update({ selected_companion: name })
            .eq('id', id)
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            Toast.show({
                type: 'success',
                text1: 'Companion Selected'
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
                    leftComponent={{ icon: 'storefront', color: '#fff', size: 30 }}
                    centerComponent={{ text: 'Shop', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    rightComponent={
                        <Tooltip
                            popover={<Text style={{ color: 'white' }}> Complete Tasks to Earn Coins! </Text>}
                            height={60}
                            backgroundColor='#ec2929'>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: "#851717",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    borderRadius: 50

                                }}>
                                <Image style={styles.coin} source={require('../assets/coin.png')} />
                                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 20, fontFamily: 'Roboto' }}>
                                    {currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Text>
                            </View>
                        </Tooltip>}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />
                <View style={styles.cardRow}>

                    <Card containerStyle={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('mack') ? styles.unlocked : styles.locked} source={require('../assets/mack/mack3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('mack') ? selectCompanion('mack') : adoptCompanion('mack')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('mack') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('pickles') ? styles.unlocked : styles.locked} source={require('../assets/pickles/pickles3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('pickles') ? selectCompanion('pickles') : adoptCompanion('pickles')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('pickles') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('pumpkin') ? styles.unlocked : styles.locked} source={require('../assets/pumpkin/pumpkin3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('pumpkin') ? selectCompanion('pumpkin') : adoptCompanion('pumpkin')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('pumpkin') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('shadow') ? styles.unlocked : styles.locked} source={require('../assets/shadow/shadow3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('shadow') ? selectCompanion('shadow') : adoptCompanion('shadow')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('shadow') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </Card>

                </View>
                <Toast />
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locked: {
        tintColor: '#696969',
        marginTop: 10,
        marginBottom: 10
    },
    unlocked: {
        marginTop: 10,
        marginBottom: 10
    },
    coin: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 10,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    cardContainer: {
        borderRadius: 20,
        backgroundColor: '#fff',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
