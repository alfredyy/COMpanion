import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';

export default function Statistics({ navigation }) {
    let loading = false;

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <Header
                    statusBarProps={{ backgroundColor: '#ec2929' }}
                    placement='left'
                    leftComponent={{ icon: 'stats-chart', color: '#fff', size: 30, type: 'ionicon' }}
                    centerComponent={{ text: 'Statistics', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />
                <Toast />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    }
});
