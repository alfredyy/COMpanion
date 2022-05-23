import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';
// import Toast from 'react-native-toast-message';



export default function AddToDoPage({ navigation }) {
    const [item_name, setItemName] = useState('')
    const [datetime, setDateTime] = useState(new Date())
    const [desc, setDesc] = useState('')
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')
    let loading = false


    const onChange = (event, selectedDate) => {
        let currentDate = selectedDate;
        setShow(false)
        setDateTime(selectedDate)
    }

    const showDate = () => {
        setShow(true)
        setMode('date')
    }

    const showTime = () => {
        setShow(true)
        setMode('time')
    }

    const submitToDo = async () => {
        if (item_name.length == 0) {
            Alert.alert("Error", "Item name cannot be empty!")
        } else if (datetime < new Date()) {
            Alert.alert("Invalid date", "Time travelling to the past is not allowed!")
        } else {
            try {
                loading = true
                const user = supabaseClient.auth.user()
                const { error } = await supabaseClient.from("todos")
                    .insert([{
                        item_name: item_name,
                        description: desc,
                        datetime: datetime.toISOString(),
                        completed: false,
                        user_id: user.id
                    }])
                if (error) throw error
            } catch (error) {
                Alert.alert("Error", error.message)
            } finally {
                loading = false
                Alert.alert("Success!", "To-do is successfully added")
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputField}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Item Name'
                    maxLength={50}
                    onChangeText={(itemName => setItemName(itemName))}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.inputFieldDT} onPress={showDate}>
                    <Text style={{ fontFamily: "Roboto" }}>
                        {datetime.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputFieldDT} onPress={showTime}>
                    <Text style={{ fontFamily: "Roboto" }}>
                        {datetime.getHours() + ":" + datetime.getMinutes() }
                    </Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    mode={mode}
                    onChange={onChange}
                    value={datetime}
                    minimumDate={Date.now()} />
            )}

            <View style={styles.inputFieldDesc}>
                <TextInput
                    style={styles.inputTextDesc}
                    placeholder='Description'
                    multiline={true}
                    numberOfLines={4}
                    maxLength={1000}
                    onChangeText={(desc => setDesc(desc))}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => submitToDo()}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                    DONE
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ec2929',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Roboto"
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
    inputFieldDT: {
        backgroundColor: "#ffffff",
        width: "37%",
        borderRadius: 25,
        height: 55,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    inputFieldDesc: {
        backgroundColor: "#ffffff",
        width: "80%",
        borderRadius: 25,
        height: 100,
        marginBottom:20,
        padding: 20
    },
    inputText: {
        height: 55,
        fontFamily: "Roboto"
    },
    inputTextDesc: {
        // height: 55,
        fontFamily: "Roboto",
        textAlignVertical: "top"
    },
    rectangleLogin: {
        height: 400,
        width: Dimensions.get("window").width,
        backgroundColor: "#f9f9f9",
        borderRadius: 50,
        top: '25%',
        position: "absolute"
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});
