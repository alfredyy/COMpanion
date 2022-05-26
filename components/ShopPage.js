import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import {Button, Input, ListItem, CheckBox, Text, Header, Icon} from 'react-native-elements';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import Toast from 'react-native-toast-message';

export default function ShopPage({ navigation }) {
    const componentMounted = useRef(true);

    // useEffect(() => {
    //     const fetchTodos = async () => {
    //       const {data, error} = await supabaseClient
    //         .from('todos')
    //         .select('*')
    //         .order('id', {ascending: false});
    //       if (error) {
    //         console.log('error', error);
    //       } else {
    //         console.log('Todos: ', data);
    //         setTodos(data);
    //       }
    //     };
    //     if (componentMounted.current) {
    //       fetchTodos();
    //     }
    
    //     return () => {
    //       componentMounted.current = false;
    //     };


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container}>
                <Header
                    statusBarProps={{ backgroundColor: '#ec2929' }}
                    placement='left'
                    leftComponent={{ icon: 'store', color: '#fff', size: 30 }}
                    centerComponent={{ text: 'Shop', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    inputField: {
        backgroundColor: "#ffffff",
        width: "80%",
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 55,
        fontFamily: "Roboto"
    },
    rectangle: {
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});
