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
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { color } from '@chakra-ui/react';
  

export default function TodoList() { 
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
  let loading = false;
  //const [markedDatesArray, setMarkedDatesArray] = useState({});
  const isFocused = useIsFocused();

  //Fetch tasks on selected day when clicked
      const fetchTodosday = async (selecteddate) => {
        var nowdate = new Date((new Date(selecteddate)).getTime() - 60 * 60 * 12 * 1000);
        // var nextdate = selecteddate.setHours(selecteddate.getHours() + 24)
        var nextdate = new Date(nowdate.getTime() + 60 * 60 * 12 * 1000);
        nextdate.setHours(23,59,0,0)
          const { data, error } = await supabaseClient
            .from('todos')
            .select('*')
            .gte('datetime', nowdate.toISOString())
            .lte('datetime', nextdate.toISOString())
            .order('datetime', { ascending: true });
            if (error) {
              console.log(error);
          } else {
            console.log('Todosday: ', data);
            console.log('datetime: ', nowdate.toISOString())
            console.log('datetime: ', nextdate.toISOString())
            setTodos(data);
          }
      }


    let dDates = [];
    let markedDatesArrayy = [];

    // useFocusEffect(
    //   React.useCallback(() => {
    //   let isActive = true;

    //   const fetchTodos = async () => {
    //       const { data, error } = await supabaseClient
    //         .from('todos')
    //         .select('*')
    //         .order('datetime', { ascending: true });
    //         if (error) {
    //           console.log(error);
    //       } else {
    //         console.log('Todos: ', data);
    //         setTodoss(data);
    //         dDates = [];
    //         data.forEach(x => {
    //           // console.log(x);
    //           dDates.push(timeToStringg(x.datetime));
    //         })
    //         console.log('dDates: ', dDates);
    //       }
    //   }

    //   fetchTodos();

    //   return () => {
    //     isActive = false
    //   };
    // }, []));




    
    useFocusEffect(
      React.useCallback(() => {
          let isActive = true;

          const fetchTodosday = async () => {
            var d = new Date().setUTCHours(0,0,0,0);
            var nowdate = new Date(new Date(d).getTime());
            var nextdate = new Date(nowdate.getTime() + 60 * 60 * 12 * 1000);
            nextdate.setHours(23,59,0,0)
              const { data, error } = await supabaseClient
                .from('todos')
                .select('*')
                .gte('datetime', nowdate.toISOString())
                .lte('datetime', nextdate.toISOString())
                .order('datetime', { ascending: true });
                if (error) {
                  console.log(error);
              } else {
                console.log('Todos: ', data);
                console.log('datetime: ', nowdate.toISOString())
                console.log('datetime: ', nextdate.toISOString())
                setTodos(data);
              }
          }

        fetchTodosday();

          return () => {
              isActive = false
          };
      }, []));



    // useFocusEffect(() => {

    //       let isActive = true;

    //       const fetchTodosday = async () => {
    //         var d = new Date().setUTCHours(0,0,0,0);
    //         var nowdate = new Date(new Date(d).getTime());
    //         var nextdate = new Date(nowdate.getTime() + 60 * 60 * 12 * 1000);
    //         nextdate.setHours(23,59,0,0)
    //           const { data, error } = await supabaseClient
    //             .from('todos')
    //             .select('*')
    //             .gte('datetime', nowdate.toISOString())
    //             .lte('datetime', nextdate.toISOString())
    //             .order('datetime', { ascending: true });
    //             if (error) {
    //               console.log(error);
    //           } else {
    //             console.log('Todos: ', data);
    //             console.log('datetime: ', nowdate.toISOString())
    //             console.log('datetime: ', nextdate.toISOString())
    //             setTodos(data);
    //           }
    //       }

    //       fetchTodosday();

    //       return () => {
    //           isActive = false
    //       };
    //     }
    // );




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
            // dDates = [];
            // data.forEach(x => {
            //   console.log(x);
            //   dDates.push(timeToStringg(x.datetime));
            // })
            // console.log('dDates: ', dDates);
            markedDatesFunc();
            // console.log('datee: ', markedDatesArrayy[0].date);
            // console.log('dotss: ', markedDatesArrayy[0].dots);
            // console.log('markedDatesArray', markedDatesArrayy);
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

  const handleSearchButton = () => {
    setModalVisible3(true);
  }

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



  const timeToStringg = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  
    const markedDatesFunc = () => {
        markedDatesArrayy = [];
        dDates.forEach(x => {
          markedDatesArrayy.push(
            {date: `${x}`, 
            dots: [
            {
              color: "red",
              selectedColor: "red"
            }
          ]});
        });
        
        //setMarkedDatesArray(markedDatesArray);
        // console.log('datee: ', markedDatesArrayy[0].date);
        // console.log('dotss: ', markedDatesArrayy[0].dots);
        //console.log('markedDatesArrayy', markedDatesArrayy);
        
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

  

  if (isFocused) {
  return ( 
    
    <MenuProvider>
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

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.modalView}>

              <View style={styles.details}>
                <Icon name='info' type='feather' color='#fff' />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                  Task Completed
                </Text>
              </View>

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
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
                    CLOSE
                  </Text>
                </Pressable>

            </View>
          </TouchableWithoutFeedback>
        </Modal> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            setModalVisible3(!modalVisible3);
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.modalView1}>

              {/* <View style={styles.details}>
                <Icon name='info' type='feather' color='#fff' />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                  Task Options
                </Text>
              </View> */}

            </View>
          </TouchableWithoutFeedback>
        </Modal>

      <Header
          statusBarProps={{ backgroundColor: '#ec2929' }}
          placement='left'
          leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
          centerComponent={{ text: 'To Do List', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
          rightComponent={{ icon: 'search', color: '#fff', size: 30, onPress: handleSearchButton}}
          containerStyle={{
            backgroundColor: '#ec2929',
            alignItems: 'baseline'
          }}
        />

         <View style={styles.container}>
          <CalendarStrip
            scrollable
            //markedDates={markedDatesArrayy}
            onWeekScrollEnd={(start, end) => fetchTodosweek(start, end)}
            //onWeekChanged={(start, end) => fetchTodosweek(start, end)}
            style={{height: 95, paddingTop: 10, marginBottom: 10}}
            calendarColor={'#fff'}
            calendarHeaderStyle={{color: '#ec2929'}}
            dateNumberStyle={{color: '#ec2929'}}
            dateNameStyle={{color: '#ec2929'}}
            iconContainer={{flex: 0.1}}
            selectedDate={new Date()}
            daySelectionAnimation={{type: 'border', duration: 10, borderWidth: 1, borderHighlightColor: '#ec2929'}}
            highlightDateNumberStyle={{color: '#ec2929'}}
            highlightDateNameStyle={{color: '#ec2929'}}
            onDateSelected={selectedDate => fetchTodosday(selectedDate)}
          />
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
                <Text style={{color: '#A4A1A1', marginTop: 3}}>
                {getDayname(new Date(todo.datetime))}
              </Text>
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
                

                {/* <Menu onSelect={value => (value == 1) ? handlePress(todo) : deleteTodo(todo.id)}>
                  <MenuTrigger>
                  <SimpleLineIcons name="options-vertical" size={24} color="white" />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{justifyContent:'space-between', paddingBottom:8, width:100,height:100}}>
                  <MenuOption value={1} text='Edit' />
                  <MenuOption text='Delete'>

                  </MenuOption>
                  </MenuOptions>
                </Menu> */}
                
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
    </MenuProvider>

   )}

   return ( 
    
    <MenuProvider>
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

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.modalView}>

              <View style={styles.details}>
                <Icon name='info' type='feather' color='#fff' />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                  Task Completed
                </Text>
              </View>

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
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
                    CLOSE
                  </Text>
                </Pressable>

            </View>
          </TouchableWithoutFeedback>
        </Modal> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            setModalVisible3(!modalVisible3);
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <View style={styles.modalView1}>

              {/* <View style={styles.details}>
                <Icon name='info' type='feather' color='#fff' />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
                  Task Options
                </Text>
              </View> */}

            </View>
          </TouchableWithoutFeedback>
        </Modal>

      <Header
          statusBarProps={{ backgroundColor: '#ec2929' }}
          placement='left'
          leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
          centerComponent={{ text: 'To Do List', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
          rightComponent={{ icon: 'search', color: '#fff', size: 30, onPress: handleSearchButton}}
          containerStyle={{
            backgroundColor: '#ec2929',
            alignItems: 'baseline'
          }}
        />

         <View style={styles.container}>
          <CalendarStrip
            scrollable
            //markedDates={markedDatesArrayy}
            onWeekScrollEnd={(start, end) => fetchTodosweek(start, end)}
            //onWeekChanged={(start, end) => fetchTodosweek(start, end)}
            style={{height: 95, paddingTop: 10, marginBottom: 10}}
            calendarColor={'#fff'}
            calendarHeaderStyle={{color: '#ec2929'}}
            dateNumberStyle={{color: '#ec2929'}}
            dateNameStyle={{color: '#ec2929'}}
            iconContainer={{flex: 0.1}}
            selectedDate={0}
            daySelectionAnimation={{type: 'border', duration: 10, borderWidth: 1, borderHighlightColor: '#ec2929'}}
            highlightDateNumberStyle={{color: '#ec2929'}}
            highlightDateNameStyle={{color: '#ec2929'}}
            onDateSelected={selectedDate => fetchTodosday(selectedDate)}
            startingDate={new Date()}
          />
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
                <Text style={{color: '#A4A1A1', marginTop: 3}}>
                {getDayname(new Date(todo.datetime))}
              </Text>
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
                

                {/* <Menu onSelect={value => (value == 1) ? handlePress(todo) : deleteTodo(todo.id)}>
                  <MenuTrigger>
                  <SimpleLineIcons name="options-vertical" size={24} color="white" />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{justifyContent:'space-between', paddingBottom:8, width:100,height:100}}>
                  <MenuOption value={1} text='Edit' />
                  <MenuOption text='Delete'>

                  </MenuOption>
                  </MenuOptions>
                </Menu> */}
                
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
    </MenuProvider>

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
    width: 20,
    color: '#A4A1A1', 
    marginLeft: 10,
    marginTop: 3
  
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
  modalView1: {
    margin: 10,
    marginTop: 52,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingBottom: 90,
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
  }
});




