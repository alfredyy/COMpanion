import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto';
import Toast from 'react-native-toast-message';



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

    const timeFormatter = () => {
        let hours = datetime.getHours()
        let ampm = "am"
        if (hours >= 12) {
            ampm = "pm"
            if (hours > 12) {
                hours -= 12
            }
        }
        let minutes = datetime.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes.toString()
        }
        return hours + ':' + minutes + ampm
    }

    const submitToDo = async () => {
        if (item_name.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Field',
                text2: 'Task Name cannot be empty!'
              });
        } else if (datetime < new Date()) {
            Toast.show({
                type: 'error',
                text1: 'Time Travelling Detected',
                text2: 'Ensure that event starts later than current time!'
              });
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
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message
                  });
            } finally {
                loading = false
                Toast.show({
                    type: 'success',
                    text1: 'Task Added!',
                  });
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Add Task</Text>
                </View>

                <View style={styles.rectangle}>

                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Task Name'
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
                                {timeFormatter()}
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
                            placeholder='Notes'
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
                <Toast />
            </View>
            
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ec2929',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
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
        width: "35%",
        borderRadius: 25,
        height: 55,
        marginRight: Dimensions.get("window").width * 0.05,
        marginLeft: Dimensions.get("window").width * 0.05,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    inputFieldDesc: {
        backgroundColor: "#ffffff",
        width: "80%",
        borderRadius: 25,
        height: 100,
        marginBottom: 20,
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
    rectangle: {
        height: '70%',
        width: Dimensions.get("window").width,
        backgroundColor: "#f9f9f9",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        bottom: 0,
        position: "absolute",
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: 30
    },
    button: {
        backgroundColor: '#ec2929',
        borderRadius: 10,
        width: '80%',
        height: 45,
        // marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    header: {
        justifyContent: 'center',
        width: '80%',
        height: 80,
        marginBottom:30,
        backgroundColor: 'white',
        borderRadius: 15,
        top: '10%',
        position:"absolute"
     },
     title: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Roboto'
     
     }
});
