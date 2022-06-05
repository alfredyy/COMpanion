import { TextInput, Dimensions, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button, Input, ListItem, CheckBox, Text, Header, Icon, Card } from 'react-native-elements';
import React, { useEffect, useRef, useState } from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import { AntDesign } from '@expo/vector-icons';


  const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
//export default function TodoList() {
  // const [todos, setTodos] = useState([]);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [name, setName] = useState('');
  // const [desc, setDesc] = useState('');
  // const [datetime, setDateTime] = useState(new Date());
  // const [show, setShow] = useState(false)
  // const [mode, setMode] = useState('date')
  // const [id, setId] = useState('');
  // let loading = false;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;

  //     const fetchTodos = async () => {
  //       try {
  //         const { data, error } = await supabaseClient
  //           .from('todos')
  //           .select('*')
  //           .order('datetime', { ascending: true });
  //         if (isActive) {
  //           console.log('Todos: ', data);
  //           setTodos(data);
  //         }
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };

  //     fetchTodos();

  //     return () => {
  //       isActive = false
  //     };
  //   }, []));

  // const toggleCompleted = async (id, completed) => {
  //   const { data, error } = await supabaseClient
  //     .from('todos')
  //     .update({ completed: !completed })
  //     .eq('id', id)
  //     .single();
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     setTodos(todos.map(todo => (todo.id === id ? data : todo)));
  //   }
  // };

  // const deleteTodo = async id => {
  //   const { error } = await supabaseClient.from('todos').delete().eq('id', id);
  //   if (error) {
  //     console.log('error', error);
  //   } else {
  //     setTodos(todos.filter(x => x.id !== Number(id)));
  //   }
  // };

  // const handlePress = async (todo) => {
  //   setName(todo.item_name)
  //   setDesc(todo.description)
  //   setId(todo.id)
  //   setDateTime(new Date(todo.datetime))
  //   setModalVisible(true)
  // };

  // const showDate = () => {
  //   setShow(true)
  //   setMode('date')
  // }

  // const showTime = () => {
  //   setShow(true)
  //   setMode('time')
  // }

  // const onChange = (event, selectedDate) => {
  //   let currentDate = selectedDate;
  //   setShow(false)
  //   setDateTime(selectedDate)
  // }

  // const timeFormatter = () => {
  //   let hours = datetime.getHours()
  //   let ampm = "am"
  //   if (hours >= 12) {
  //     ampm = "pm"
  //     if (hours > 12) {
  //       hours -= 12
  //     }
  //   }
  //   let minutes = datetime.getMinutes()
  //   if (minutes < 10) {
  //     minutes = '0' + minutes.toString()
  //   }
  //   return hours + ':' + minutes + ampm
  // }

  // const dateFormatter = () => {
  //   let day = datetime.getDate()
  //   let month = datetime.getMonth()
  //   let year = datetime.getFullYear()
  //   return day + '/' + month + '/' + year
  // }

  // const handleUpdate = async (id, name, desc, datetime) => {
  //   try {
  //     loading = true
  //     const { error } = await supabaseClient
  //       .from('todos')
  //       .update({ item_name: name, description: desc, datetime: datetime.toISOString() })
  //       .eq('id', id)
  //     if (error) throw error
  //   } catch (error) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: error.message
  //     });
  //   } finally {
  //     loading = false
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Task Updated!',
  //     });
  //   }

  // }


  // return (
  //   <TouchableWithoutFeedback onPress={() => {
  //     Keyboard.dismiss();
  //   }}>
  //     <View style={styles.container}>

  //       <Modal
  //         animationType="slide"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <TouchableWithoutFeedback onPress={() => {
  //           Keyboard.dismiss();
  //         }}>
  //           <View style={styles.modalView}>

  //             <View style={styles.details}>
  //               <Icon name='info' type='feather' color='#fff' />
  //               <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
  //                 Task Details
  //               </Text>
  //             </View>

  //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>

  //               <View style={styles.descBox}>
  //                 <TextInput
  //                   value={name}
  //                   maxLength={50}
  //                   onChangeText={(itemName => setName(itemName))}
  //                   multiline={true}
  //                 />
  //               </View>

  //               <View style={{ flexDirection: "row" }}>
  //                 <TouchableOpacity style={styles.DTBox} onPress={showDate}>
  //                   <Icon name='date-range' type='material' color='gray' />
  //                   <Text style={{ fontFamily: "Roboto", padding: 5 }}>
  //                     {dateFormatter()}
  //                   </Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity style={styles.DTBox} onPress={showTime}>
  //                   <Icon name='access-time' type='material' color='gray' />
  //                   <Text style={{ fontFamily: "Roboto", padding: 5 }}>
  //                     {timeFormatter()}
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //               {show && (
  //                 <DateTimePicker
  //                   mode={mode}
  //                   onChange={onChange}
  //                   value={datetime}
  //                   minimumDate={Date.now()} />
  //               )}

  //               <View style={styles.descBox}>
  //                 <TextInput
  //                   value={desc}
  //                   multiline={true}
  //                   numberOfLines={9}
  //                   maxLength={280}
  //                   onChangeText={(desc => setDesc(desc))}
  //                   textAlignVertical='top'
  //                 />
  //               </View>

  //               <Pressable
  //                 style={[styles.primaryButton]}
  //                 onPress={() => handleUpdate(id, name, desc, datetime)}
  //               >
  //                 <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
  //                   SAVE CHANGES
  //                 </Text>
  //               </Pressable>

  //               <Pressable
  //                 style={[styles.secondaryButton]}
  //                 onPress={() => setModalVisible(!modalVisible)}
  //               >
  //                 <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
  //                   HIDE
  //                 </Text>
  //               </Pressable>

  //             </View>
  //           </View>
  //         </TouchableWithoutFeedback>
  //       </Modal>


  //       <Header
  //         statusBarProps={{ backgroundColor: '#ec2929' }}
  //         placement='left'
  //         leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
  //         centerComponent={{ text: 'To Do List', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
  //         containerStyle={{
  //           backgroundColor: '#ec2929',
  //           alignItems: 'baseline'
  //         }}
  //       />
  //       <View style={styles.rectangle}>
  //         <FlatList
  //           scrollEnabled={true}
  //           data={todos}
  //           keyExtractor={item => `${item.id}`}
  //           renderItem={({ item: todo }) => (


  //             <View style={[styles.dFlex]}>
  //               <CheckBox
  //                 checked={todo.completed}
  //                 onPress={() => toggleCompleted(todo.id, todo.completed)}
  //               />

  //               <TouchableOpacity onLongPress={() => handlePress(todo)}>
  //                 <Text style={[styles.mtAuto]}>
  //                   {todo.item_name}
  //                 </Text>
  //               </TouchableOpacity>

  //               <AntDesign name="delete" size={24} color="black" onPress={() => deleteTodo(todo.id)} />

  //             </View>
  //           )}
  //         />
  //       </View>
  //       <Toast />
  //     </View>

  //   </TouchableWithoutFeedback>
  // );
// }

//const styles = StyleSheet.create({


  // container: {
  //   flex: 1,
  //   backgroundColor: '#f9f9f9',
  // },
  // rectangle: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingTop: 30,
  // },
  // dFlex: {
  //   flexDirection: 'row',
  //   backgroundColor: "#ffffff",
  //   width: 350,
  //   borderRadius: 30,
  //   borderColor: 'black',
  //   height: 60,
  //   marginBottom: 20,
  //   justifyContent: "flex-start",
  //   alignItems: 'center',
  // },
  // mtAuto: {
  //   width: 230,
  //   paddingRight: 15
  // },
  // modalView: {
  //   margin: 20,
  //   marginTop: "20%",
  //   backgroundColor: "#f9f9f9",
  //   borderRadius: 20,
  //   // paddingTop: 35,
  //   paddingBottom: 35,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  // },
  // primaryButton: {
  //   backgroundColor: '#ec2929',
  //   borderRadius: 10,
  //   width: '80%',
  //   height: 45,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 20
  // },
  // secondaryButton: {
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   width: '80%',
  //   height: 45,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 20,
  //   borderColor: '#ec2929',
  //   borderWidth: 1
  // },
  // DTBox: {
  //   backgroundColor: "#fff",
  //   // width: "35%",
  //   borderRadius: 25,
  //   height: 55,
  //   marginRight: Dimensions.get("window").width * 0.05,
  //   marginLeft: Dimensions.get("window").width * 0.05,
  //   marginBottom: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: 'row',
  //   padding: 10
  // },
  // descBox: {
  //   backgroundColor: "#fff",
  //   width: "80%",
  //   borderRadius: 25,
  //   marginBottom: 10,
  //   padding: 20,
  // },
  // details: {
  //   backgroundColor: "#ec2929",
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'baseline',
  //   paddingLeft: 40,
  //   paddingBottom: 20,
  //   paddingTop: 25,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   marginBottom: 20
  // }
//});




import { MaterialCommunityIcons } from '@expo/vector-icons';


// Light theme colors
const lightColors = {
  background: '#FFFFFF',
  primary: '#283747',
  text: '#d7dbdd',
  error: '#283747',
};

// Dark theme colors
const darkColors = {
  background: '#808080',
  primary: '#283747',
  text: '#283747',
  error: '#283747',
};

// Dark theme colors
const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  subtitle: 14,
  small: 10
};

export default function TodoList() {
  const [rawtodos, setRawtodos] = useState();
  const [todos, setTodos] = useState({});
  const [items, setItems] = useState({});
  const [datas, setDatas] = useState();
    // const [todos, setTodos] = useState([]);
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
            console.log(data);
            setRawtodos(data);
            const reduced = data.reduce((acc, currentItem) => {
              const {datetime, ...coolItem} = currentItem;
              acc[timeToString(datetime)] = [currentItem];
              return acc;
            }, {});
            console.log(reduced);
            setTodos(reduced);
            setDatas(data);
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
      } 
      else {
        setRawtodos(rawtodos.map(todo => (todo.id === id ? data : todo)));
        

      }
    };
  
    const deleteTodo = async id => {
      const { error } = await supabaseClient.from('todos').delete().eq('id', id);
      if (error) {
        console.log('error', error);
      } 
      else {
        setRawtodos(rawtodos.filter(x => x.id !== Number(id)));
      }
    };
    
    

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleCompleted(item.id, item.completed)}
        />
        <TouchableOpacity onLongPress={() => handlePress(item, item.id)}>
        <Text style={styles.task}>{item.item_name}</Text>
        </TouchableOpacity>
        <AntDesign name="delete" size={24} color="black" onPress={() => deleteTodo(item.id)} />
      </View>
    );
  };

  const renderKnobIcon = () => {
        return (
            <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
                <MaterialCommunityIcons name="ray-vertex" size={30} color="#283747" />
            </TouchableOpacity>
        );
  };


  const handlePress = async (todo, id) => {
    setName(todo.item_name)
    setDesc(todo.description)
    setId(id)
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

  const handleUpdate = async () => {
    try {
      loading = true;
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
                  onPress={handleUpdate}
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
      <Agenda 
      items={todos} 
      //loadItemsForMonth={loadItems(datas)}
      renderItem={renderItem} 
      pastScrollRange={12} 
      futureScrollRange={12}  
      renderKnob={renderKnobIcon}
      hideKnob={false}
      showClosingKnob={true}
      disabledByDefault={false}
      refreshing={false}
      showScrollIndicator={true}
      scrollEnabled={true}
      pagingEnabled={true}
      //style={{height:400}}
       />
    </View>
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80
  },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    task: {
      width: 200,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    dateViewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        height: "auto"
    },
    dateStyle: {
        color: "#283747",
        fontSize: 18,
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    viewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 5,
        marginTop: 30,
        height: 50
    },
    textStyle: {
        //fontSize: 18,
        margin: 5,
        color: '#283747',
        fontSize: sizes.font,
        fontWeight: "500",
        color: '#283747',

    },
    modalView: {
      margin: 20,
      marginTop: "20%",
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