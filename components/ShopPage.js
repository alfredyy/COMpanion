import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Header, Icon, Card, Tooltip } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import Toast from 'react-native-toast-message';
import { BottomTabBar, BottomTabBarHeightContext, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import style from 'react-native-password-strength-meter/src/style';

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
                        console.log('data: ', data[0])
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

    const buyItem = async (item, cost) => {
        if (currency < cost) {
            Toast.show({
                type: 'error',
                text1: 'Insufficient Coins!',
                text2: 'Complete tasks to earn coins!'
            });
        } else {
            const { data, error } = await supabaseClient
                .from('profiles')
                .update({ currency: currency - cost })
                .eq('id', id)
            if (error) {
                console.log(error);
            } else {
                console.log(data)
                setCurrency(data[0].currency);
            }

            switch (item) {
                case 'bread':
                    await supabaseClient
                        .rpc('incrementbread', { x: 1, row_id: id })
                    break;
                case 'bacon':
                    await supabaseClient
                        .rpc('incrementbacon', { x: 1, row_id: id })
                    break;
                case 'egg':
                    await supabaseClient
                        .rpc('incrementegg', { x: 1, row_id: id })
                    break;
                case 'meatball':
                    await supabaseClient
                        .rpc('incrementmeatball', { x: 1, row_id: id })
                    break;
                case 'sushi':
                    await supabaseClient
                        .rpc('incrementsushi', { x: 1, row_id: id })
                    break;
                case 'salmon':
                    await supabaseClient
                        .rpc('incrementsalmon', { x: 1, row_id: id })
                    break;
                case 'steak':
                    await supabaseClient
                        .rpc('incrementsteak', { x: 1, row_id: id })
                    break;
                case 'chicken':
                    await supabaseClient
                        .rpc('incrementchicken', { x: 1, row_id: id })
                    break;
            }
            Toast.show({
                type: 'success',
                text1: 'Purchased!',
                text2: `1 x ${item.toUpperCase()}`
            })
        }
    }

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
        <>
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

                <View style={styles.cardContainer}>
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold', fontSize: 24 }}>
                        Companions
                    </Text>
                </View>

                <View style={styles.cardRow}>

                    <View style={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('mack') ? styles.unlocked : styles.locked} source={require('../assets/mack/mack3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('mack') ? selectCompanion('mack') : adoptCompanion('mack')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('mack') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('pickles') ? styles.unlocked : styles.locked} source={require('../assets/pickles/pickles3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('pickles') ? selectCompanion('pickles') : adoptCompanion('pickles')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('pickles') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('pumpkin') ? styles.unlocked : styles.locked} source={require('../assets/pumpkin/pumpkin3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('pumpkin') ? selectCompanion('pumpkin') : adoptCompanion('pumpkin')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('pumpkin') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('shadow') ? styles.unlocked : styles.locked} source={require('../assets/shadow/shadow3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('shadow') ? selectCompanion('shadow') : adoptCompanion('shadow')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('shadow') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.cardContainer}>
                        <Image style={ownedCompanions.includes('smokey') ? styles.unlocked : styles.locked} source={require('../assets/smokey/smokey3.png')} />
                        <TouchableOpacity style={styles.button} onPress={() => ownedCompanions.includes('smokey') ? selectCompanion('smokey') : adoptCompanion('smokey')}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                {ownedCompanions.includes('smokey') ? 'SELECT' : 'ADOPT - 160'}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style={styles.cardContainer}>
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold', fontSize: 24 }}>
                        Food
                    </Text>
                </View>

                <View style={styles.cardRow}>


                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Bread
                        </Text>
                        <Image source={require('../assets/food/bread.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('bread', 2)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 2
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Bacon
                        </Text>
                        <Image source={require('../assets/food/bacon.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('bacon', 2)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 2
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Egg
                        </Text>
                        <Image source={require('../assets/food/egg.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('egg', 2)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 2
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Meatball
                        </Text>
                        <Image source={require('../assets/food/meatball.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('meatball', 4)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 4
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Sushi
                        </Text>
                        <Image source={require('../assets/food/sushi.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('sushi', 8)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 8
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Salmon
                        </Text>
                        <Image source={require('../assets/food/salmon.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('salmon', 10)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 10
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Steak
                        </Text>
                        <Image source={require('../assets/food/steak.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('steak', 12)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 12
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                            Roasted Chicken
                        </Text>
                        <Image source={require('../assets/food/roastedchicken.png')} style={styles.food} />
                        <TouchableOpacity style={styles.button} onPress={() => buyItem('chicken', 15)}>
                            <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                                BUY - 15
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ead4aa',
        marginBottom: 50
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
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
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    cardContainer: {
        borderRadius: 3,
        backgroundColor: '#3f2832',
        borderColor: '#743f39',
        borderWidth: 5,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 5
    },
    food: {
        width: 50,
        height: 50,
        margin: 4
    }
});
