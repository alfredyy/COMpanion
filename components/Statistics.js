import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';
import moment from 'moment';

export default function Statistics({ navigation }) {
    let loading = false;
    const [todosCount, setTodosCount] = useState(0);
    const [todosCompleted, setTodosCompleted] = useState(0)
    const [companionCount, setCompanionCount] = useState(0)

    const fetchTodosCount = async () => {
        const { data, count } = await supabaseClient
            .from('todos')
            .select('id', { count: 'exact' })

        setTodosCount(count);
    }

    const fetchTodosCompleted = async () => {
        const { data, count } = await supabaseClient
            .from('todos')
            .select('*', { count: 'exact' })
            .eq('completed', 'true')

        setTodosCompleted(count);
    }

    const fetchCompanionCount = async () => {
        const { data } = await supabaseClient
        .from('profiles')
        .select('owned_companions')

        if (data) {
            setCompanionCount(data[0].owned_companions.length)
        }
    }


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            fetchTodosCount();
            fetchTodosCompleted();
            fetchCompanionCount();
            return () => {
                isActive = false;
            };
        }, []));

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
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

                <View style={styles.statRow}>
                    <Text style={styles.statName}>
                        Tasks Added
                    </Text>
                    <Text style={styles.statNumber}>
                        {todosCount}
                    </Text>
                </View>

                <View style={styles.statRow}>
                    <View>
                        <Text style={styles.statName}>
                            Tasks Completed
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.statNumber}>
                            {todosCompleted}
                        </Text>
                    </View>
                </View>

                <View style={styles.statRow}>
                    <View>
                        <Text style={styles.statName}>
                            Companions Adopted
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.statNumber}>
                            {companionCount}
                        </Text>
                    </View>
                </View>

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
    statName: {
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 50
    },
    statNumber: {
        fontWeight: 'bold',
        marginTop: 15,
        marginRight: 50
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

