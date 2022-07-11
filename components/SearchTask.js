import { TextInput, Dimensions, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button, Input, ListItem, CheckBox, Text, Header, Icon, Card, SearchBar } from 'react-native-elements';
import React, { useEffect, useRef, useState } from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';



import CalendarStrip from 'react-native-calendar-strip';


import { SimpleLineIcons } from '@expo/vector-icons'; 
import { color } from '@chakra-ui/react';

export default function SearchTask({ navigation }) {
    const [todos, setTodos] = useState([]);
    const[todoss, setTodoss] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    //const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
  
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [datetime, setDateTime] = useState(new Date());
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')
    const [id, setId] = useState('');
    const [currency, setCurrency] = useState(0);
    const [iD, setID] = useState('');
    const [chosenDate, setChosenDate] = useState(new Date());
    let loading = false;
    //const [markedDatesArray, setMarkedDatesArray] = useState({});
    const isFocused = useIsFocused();
  
      useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchTodosAll = async () => {
             const { data, error } = await supabaseClient
              .from('todos')
              .select('*')
              .order('datetime', { ascending: true });
             if (error) {
              console.log(error);
             } else {
               console.log('AllTodos: ', data);
               setTodos(data)
             }
        }
  
          fetchTodosAll();
  
            return () => {
                isActive = false
            };
        }, []));
  
        //Fetching data on number of coins user has
        useFocusEffect(
          React.useCallback(() => {
              let isActive = true;
    
              const fetchData = async () => {
                  try {
                      const { data, error } = await supabaseClient
                          .from('profiles')
                          .select('id, currency')
                      if (isActive) {
                          console.log('data: ', data[0])
                          setID(data[0].id)
                          setCurrency(data[0].currency);
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
  
  
      //Fetching data on tasks for selected week when clicked
      const fetchTodosweek = async (start, end) => {
        var nextdate = new Date(end);
        nextdate.setHours(23,59,0,0);
          const { data, error } = await supabaseClient
            .from('todos')
            .select('*')
            .gte('datetime', start.toISOString())
            .lte('datetime', nextdate.toISOString())
            .order('datetime', { ascending: true });
            if (error) {
              console.log(error)
            } else {
              console.log('Todoss: ', data);
              setTodos(data);
              console.log('start: ', start.toISOString())
              console.log('end :', nextdate.toISOString())
            }
      }
  
    const toggleCompleted = async (id, completed, ID) => {
      
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
  
      if (completed == false) 
      {const { data1, error1 } = await supabaseClient
        .from('profiles')
        .update({ currency: currency + 10 })
        .eq('id', ID)
      if (error1) {
        console.log(error);
      } else {
        Toast.show({
          type: 'success',
          text1: "Well done, you've just earned 10 coins!",
        })
        setId(id)
        //setModalVisible1(true)
  
      }
     }
  
     if (completed == true) 
     {const { data2, error2 } = await supabaseClient
       .from('profiles')
       .update({ currency: currency - 10 })
       .eq('id', ID)
     if (error2) {
       console.log(error);
    //  } else {
    //    Toast.show({
    //      type: 'success',
    //      text1: "10 coins deducted!",
    //    })
  
     }
    }
  
  };
  
  
    const deleteTodo = async id => {
      const { error } = await supabaseClient.from('todos').delete().eq('id', id);
      if (error) {
        console.log('error', error);
      } else {
        setTodos(todos.filter(x => x.id !== Number(id)));
        setModalVisible2(!modalVisible2);
      }
    };
  
    const handlePress = async (todo) => {
      setName(todo.item_name)
      setDesc(todo.description)
      setId(todo.id)
      setDateTime(new Date(todo.datetime))
      setModalVisible(true)
    };
  
    const handlePressEdit = async (todo) => {
      setModalVisible(true)
    };
  
  
    const handlePress1 = async (todo) => {
      setName(todo.item_name)
      setDesc(todo.description)
      setId(todo.id)
      setDateTime(new Date(todo.datetime))
      setModalVisible2(true)
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
  
    const timeToString = (time) => {
      const date = new Date(time)
      let hours = date.getHours()
      let ampm = "AM"
      if (hours >= 12) {
        ampm = "PM"
        if (hours > 12) {
          hours -= 12
        }
      }
      let minutes = date.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes.toString()
      }
      return hours + ':' + minutes + ampm
  };
  
    const dateFormatter = () => {
      let day = datetime.getDate()
      let month = datetime.getMonth() + 1
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
  
  
  
    const timeToStringg = (time) => {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    };
  
  
      const getDayname = (x) => {
        const dayNo = x.getDay()
        if (dayNo == 0) {
          return 'Sun'
        }
        if (dayNo == 1) {
          return 'Mon'
        }
        if (dayNo == 2) {
          return 'Tue'
        }
        if (dayNo == 3) {
          return 'Wed'
        }
        if (dayNo == 4) {
          return 'Thu'
        }
        if (dayNo == 5) {
          return 'Fri'
        }
        if (dayNo == 6) {
          return 'Sat'
        }
      }

      const getMonthname = (x) => {
        const monthNo = x.getMonth()
        if (monthNo == 0) {
            return '1'
        }
        if (monthNo == 1) {
            return '2'
        }
        if (monthNo == 2) {
            return '3'
        }
        if (monthNo == 3) {
            return '4'
        }
        if (monthNo == 4) {
            return '5'
        }
        if (monthNo == 5) {
            return '6'
        }
        if (monthNo == 6) {
            return '7'
        }
        if (monthNo == 7) {
            return '8'
        }
        if (monthNo == 8) {
            return '9'
        }
        if (monthNo == 9) {
            return '10'
        }
        if (monthNo == 10) {
            return '11'
        }
        if (monthNo == 11) {
            return '12'
        }
      }
  
      const searchName = async (input) => {
        const { data, error } = await supabaseClient
         .from('todos')
         .select('*')
         .order('datetime', { ascending: true });
        if (error) {
          console.log(error);
        } else {
          console.log('AllTodos: ', data);
          //setTodos(data);
        }
        const newData = data.filter((item) => {
          return item.item_name.toLowerCase().startsWith(input.toLowerCase())
        })
        setTodos(newData)
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
            // onRequestClose={() => {
            //   setModalVisible(!modalVisible);
            // }}
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
                    <TextInput
                      value={name}
                      maxLength={50}
                      onChangeText={(itemName => setName(itemName))}
                      multiline={true}
                    />
                  </View>
  
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.DTBox} onPress={showDate}>
                      <Icon name='date-range' type='material' color='gray' />
                      <Text style={{ fontFamily: "Roboto", padding: 5 }}>
                        {dateFormatter()}
                      </Text>
                    </TouchableOpacity>
  
                    <TouchableOpacity style={styles.DTBox} onPress={showTime}>
                      <Icon name='access-time' type='material' color='gray' />
                      <Text style={{ fontFamily: "Roboto", padding: 5 }}>
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
  
                  <View style={styles.descBox}>
                    <TextInput
                      value={desc}
                      multiline={true}
                      numberOfLines={9}
                      maxLength={280}
                      onChangeText={(desc => setDesc(desc))}
                      textAlignVertical='top'
                    />
                  </View>
  
                  <Pressable
                    style={[styles.primaryButton]}
                    onPress={() => handleUpdate(id, name, desc, datetime)}
                  >
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                      SAVE CHANGES
                    </Text>
                  </Pressable>
  
                  <Pressable
                    style={[styles.secondaryButton]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
                      HIDE
                    </Text>
                  </Pressable>
  
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            //onRequestClose={(chosenDate) => fetchTodosday(chosenDate.setUTCHours(0,0,0,0))}
            //onAfterClose={(chosenDate) => fetchTodosday(chosenDate.setUTCHours(0,0,0,0))}
            //shouldReturnFocusAfterClose={true}
            //onRequestClose={fetchTodosday(new Date((new Date()).setUTCHours(0,0,0,0)))}
          >
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
            }}>
              <View style={styles.modalView}>
  
                <View style={styles.details}>
                  <Icon name='info' type='feather' color='#fff' />
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                    Task Options
                  </Text>
                </View>
  
                  <Pressable
                    style={[styles.primaryButton1]}
                    onPress={handlePressEdit}
                  >
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                      EDIT
                    </Text>
                  </Pressable>
  
                  <Pressable
                    style={[styles.primaryButton1]}
                    onPress={() => deleteTodo(id)}
                  >
                    <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                      REMOVE
                    </Text>
                  </Pressable>
  
                  <Pressable
                    style={[styles.secondaryButton1]}
                    onPress={() => setModalVisible2(!modalVisible2)}
                  >
                    <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
                      CLOSE
                    </Text>
                  </Pressable>
  
              </View>
            </TouchableWithoutFeedback>
          </Modal>
  
        <Header
            statusBarProps={{ backgroundColor: '#ec2929' }}
            placement='left'
            leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
            centerComponent={{ text: 'Search Task', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
            containerStyle={{
              backgroundColor: '#ec2929',
              alignItems: 'baseline'
            }}
          />
          <View style={{height: 95, paddingTop: 10, marginBottom: 10}}>
              <View style={styles.inputField}>
                <TextInput
                 placeholder='Search Task'
                 maxLength={50}
                 onChangeText={(input) => searchName(input)}
                />
              </View>
          </View>

           <View style={styles.container}>
            <View style={{alignItems:'center'}}>
             <FlatList
              scrollEnabled={true}
              data={todos}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item: todo }) => (
  
            <View style={styles.row}>
               <View style={styles.time}>
                <View style={{flexDirection: 'row'}}>
                 <Text style={[styles.mtAutoTime]}>
                   {(new Date(todo.datetime)).getDate()}
                 </Text>
                 <Text style={{color: '#A4A1A1', marginTop: 3, paddingRight: 5}}>
                 /{getMonthname(new Date(todo.datetime))}
                 </Text>
                 <Text style={{color: '#A4A1A1', marginTop: 3}}>
                  {getDayname(new Date(todo.datetime))}
                 </Text>
                 {/* <Text style={{color: '#A4A1A1', marginTop: 3}}>
                  {getMonthname(new Date(todo.datetime))}
                 </Text> */}
                </View>
  
                <Text style={[styles.mtAutoTime1]}>
                  {timeToString(todo.datetime)}
                </Text>
              </View> 
  
  
              <View style={[styles.dFlex]}>
  
                  
                    <CheckBox
                      checked={todo.completed}
                      onPress={() => toggleCompleted(todo.id, todo.completed, todo.user_id)}
                    />
                    <Text style={[styles.mtAutoName]}>
                      {todo.item_name}
                    </Text>

                  
                  <Pressable onPress={() => handlePress1(todo)}>
                  <SimpleLineIcons name="options-vertical" size={24} color="#ec2929" />
                  </Pressable>
  
                </View>
            </View>
              )}
            />
            </View>
          </View>
          <Toast />
        </View>
  
      </TouchableWithoutFeedback>
     )          
  }
  
  const styles = StyleSheet.create({
  
  
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    row: {
      flexDirection: 'row',
    },
    dFlex: {
      flexDirection: 'row',
      backgroundColor: "#fff",
      width: 280,
      borderRadius: 80,
      borderColor: '#ec2929',
      borderWidth: 1,
      height: 60,
      marginBottom: 20,
      justifyContent: "flex-start",
      alignItems: 'center',
    },
    time: {
      width: 80,
      marginLeft: 0,
      marginRight: 10,
      marginTop: 7,
    },
    mtAutoTime: {
      //width: 20,
      color: '#A4A1A1', 
      marginLeft: 10,
      marginTop: 3,
      //justifyContent: 'space-evenly'
    
    },
    mtAutoTime1: {
      width: 60,
      color: '#A4A1A1', 
      marginLeft: 10,
  
    
    },
    mtAutoName: {
      width: 170,
      paddingRight: 15,
      margin: 2,
      fontSize: 15, 
      color: '#ec2929'
    },
    modalView: {
      margin: 20,
      marginTop: "20%",
      backgroundColor: "#f9f9f9",
      borderRadius: 20,
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
    primaryButton: {
      backgroundColor: '#ec2929',
      borderRadius: 10,
      width: '80%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    secondaryButton: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '80%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      borderColor: '#ec2929',
      borderWidth: 1
    },
    primaryButton1: {
      backgroundColor: '#ec2929',
      borderRadius: 10,
      width: '80%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 35,
      marginTop: 20
      
    },
    secondaryButton1: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '80%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      borderColor: '#ec2929',
      borderWidth: 1,
      marginLeft: 35
    },
    DTBox: {
      backgroundColor: "#fff",
      // width: "35%",
      borderRadius: 25,
      height: 55,
      marginRight: Dimensions.get("window").width * 0.05,
      marginLeft: Dimensions.get("window").width * 0.05,
      marginBottom: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'row',
      padding: 10
    },
    descBox: {
      backgroundColor: "#fff",
      width: "80%",
      borderRadius: 25,
      marginBottom: 10,
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
    },
    inputField: {
      backgroundColor: "#fff",
      width: 350,
      borderRadius: 50,
      height: 60,
      justifyContent: 'center',
      alignItems: "center",
      margin: 10,
      marginLeft: 23,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });
  
  
  
  
  

