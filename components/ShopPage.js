import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { Button, Text, Header, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import Toast from 'react-native-toast-message';

export default function ShopPage({ navigation }) {
    const componentMounted = useRef(true);
    const [currency, setCurrency] = useState(0);
    const [ownedCompanions, setOwnedCompanions] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          let isActive = true;
    
          const fetchData = async () => {
            try {
                const { data, error } = await supabaseClient
                .from('profiles')
                .select('currency, owned_companions')
              if (isActive) {
                console.log('Currency: ', data[0].currency);
                console.log('Owned Companions: ', data[0].owned_companions)
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

    //ADOPT COMPANION NOT TESTED YET
    const adoptCompanion = async (name) => {
        if (currency < 160) {
            Toast.show({
                type: 'error',
                text1: 'Insufficient Coins'
            });
        } else if (ownedCompanions.includes(name)) {
            Toast.show({
                type: 'info',
                text1: 'This companion has been adopted already'
            });
        } else {
            const { data, error } = await supabaseClient
                .from('profiles')
                .update({ owned_companions: ownedCompanions.push(name), currency: currency - 160 })
            if (error) {
                console.log(error);
            } else {
                console.log(data)
                setCurrency(data[0].currency);
                setOwnedCompanions(data[0].owned_companions)
            }
        }
    };

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
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />
                <Card containerStyle={styles.currencyCardContainer}>
                    <View
                        style={{
                            position: "relative",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            flexDirection: 'row'
                        }}
                    >
                        <Icon name='attach-money' type='material' color='black' size={30} />
                        <Text style={{ color: "black", fontWeight: 'bold', fontSize: 24, fontFamily: 'Roboto' }}>
                            {currency}
                        </Text>
                    </View>
                </Card>
                <Card containerStyle={styles.currencyCardContainer}>
                    <View
                        style={{
                            position: "relative",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            flexDirection: 'row'
                        }}
                    ></View>
                    <Image style={ownedCompanions.includes('mack') ? styles.unlocked : styles.locked} source={require('../assets/mack/mack3.png')} />
                    <Image style={ownedCompanions.includes('pickles') ? styles.unlocked : styles.locked} source={require('../assets/pickles/pickles3.png')} />
                    <Image style={ownedCompanions.includes('pumpkin') ? styles.unlocked : styles.locked} source={require('../assets/pumpkin/pumpkin3.png')} />
                </Card>
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
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    currencyCardContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    locked: {
        opacity: 0.5,
        tintColor: 'grey',
        margin: 10
    },
    unlocked: {
        margin: 10
    }
});
