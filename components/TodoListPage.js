import { TextInput, Dimensions, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button, Input, ListItem, CheckBox, Text, Header, Icon } from 'react-native-elements';
import React, { useEffect, useRef, useState } from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AntDesign } from '@expo/vector-icons';


export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [datetime, setDateTime] = useState(new Date());
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [id, setId] = useState('');
  let loading = false;

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchTodos = async () => {
        try {
          const { data, error } = await supabaseClient
            .from('todos')
            .select('*')
            .order('datetime', { ascending: true });
          if (isActive) {
            console.log('Todos: ', data);
        setTodos(data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchTodos();

      return () => {
        isActive = false
      };
    }, []));

  const toggleCompleted = async (id, completed) => {
    const { data, error } = await supabaseClient
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }
  };

  const deleteTodo = async id => {
    const { error } = await supabaseClient.from('todos').delete().eq('id', id);
    if (error) {
      console.log('error', error);
    } else {
      setTodos(todos.filter(x => x.id !== Number(id)));
    }
  };

  const handlePress = async (todo) => {
    setName(todo.item_name)
    setDesc(todo.description)
    setId(todo.id)
    setDateTime(new Date(todo.datetime))
    setModalVisible(true)
  };

  const showDate = () => {
    setShow(true)
    setMode('date')
}

const showTime = () => {
    setShow(true)
    setMode('time')
}

const onChange = (event, selectedDate) => {
  let currentDate = selectedDate;
  setShow(false)
  setDateTime(selectedDate)
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

  const dateFormatter = () => {
    let day = datetime.getDate()
    let month = datetime.getMonth()
    let year = datetime.getFullYear()
    return day + '/' + month + '/' + year
  }

  const handleUpdate = async (id, name, desc, datetime) => {
        try {
            loading = true
        const { error } = await supabaseClient
            .from('todos')
            .update({ item_name: name, description: desc, datetime: datetime.toISOString() })
            .eq('id', id)
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
                text1: 'Task Updated!',
            });
        }
    
}


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
          <View style={styles.modalView}>

            <View style={styles.details}>
              <Icon name='info' type='feather' color='#fff' />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                Task Details
              </Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.descBox}>
                {/* <Text>{name}</Text> */}
                <TextInput
                            placeholder={name}
                            maxLength={50}
                            onChangeText={(itemName => setName(itemName))}
                        />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={styles.DTBox}>
                  <TouchableOpacity onPress={showDate}>
                  <Icon name='date-range' type='material' color='gray' />
                  <Text style={{ fontFamily: "Roboto", padding: 5 }}>
                    {dateFormatter()}
                  </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.DTBox}>
                  <TouchableOpacity onPress={showTime}>
                  <Icon name='access-time' type='material' color='gray' />
                  <Text style={{ fontFamily: "Roboto", padding: 5 }}>
                    {timeFormatter()}
                  </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {show && (
                        <DateTimePicker
                            mode={mode}
                            onChange={onChange}
                            value={datetime}
                            minimumDate={Date.now()} />
                    )}

              <View style={styles.descBox}>
                {/* <Text>{desc}</Text> */}
                <TextInput
                            placeholder={desc}
                            maxLength={100}
                            onChangeText={(itemDesc => setDesc(itemDesc))}
                        />
              </View>

              <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  HIDE
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => handleUpdate(id, name, desc, datetime)}
              >
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  SUBMIT
                </Text>
              </Pressable>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>


        <Header
          statusBarProps={{ backgroundColor: '#ec2929' }}
          placement='left'
          leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
          centerComponent={{ text: 'To Do List', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: '#ec2929',
            alignItems: 'baseline'
          }}
        />
        <View style={styles.rectangle}>
          <FlatList
            scrollEnabled={true}
            data={todos}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item: todo }) => (


              <View style={[styles.dFlex]}>
                <CheckBox
                  checked={todo.completed}
                  onPress={() => toggleCompleted(todo.id, todo.completed)}
                />

                <TouchableOpacity onLongPress={() => handlePress(todo)}>
                  <Text style={[styles.mtAuto]}>
                    {todo.item_name}
                  </Text>
                </TouchableOpacity>

                <AntDesign name="delete" size={24} color="black" onPress={() => deleteTodo(todo.id)} />

              </View>
            )}
          />
        </View>
        <Toast />
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  rectangle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  dFlex: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    width: 350,
    borderRadius: 30,
    borderColor: 'black',
    height: 60,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  mtAuto: {
    width: 230,
    paddingRight: 15
  },
  modalView: {
    margin: 20,
    marginTop: "25%",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    // paddingTop: 35,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  DTBox: {
    backgroundColor: "#fff",
    width: "35%",
    borderRadius: 25,
    height: 55,
    marginRight: Dimensions.get("window").width * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  descBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 25,
    marginBottom: 20,
    padding: 20,
  },
  details: {
    backgroundColor: "#ec2929",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    paddingLeft: 40,
    paddingBottom: 20,
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20
  }
});