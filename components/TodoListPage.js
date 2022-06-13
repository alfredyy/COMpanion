import { TextInput, Dimensions, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button, Input, ListItem, CheckBox, Text, Header, Icon, Card } from 'react-native-elements';
import React, { useEffect, useRef, useState } from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import CalendarStrip from 'react-native-calendar-strip';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { SimpleLineIcons } from '@expo/vector-icons'; 
  
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const[todoss, setTodoss] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;

      // const fetchTodosday = async (selecteddate) => {
      //   var nextdate = new Date(selecteddate)
      //   nextdate.setHours(23,59,0,0)
      //     const { data, error } = await supabaseClient
      //       .from('todos')
      //       .select('*')
      //       .gte('datetime', selecteddate.toISOString())
      //       .lte('datetime', nextdate.toISOString())
      //       .order('datetime', { ascending: true });
      //       if (error) {
      //         console.log(error);
      //     } else {
      //       console.log('Todos: ', data);
      //       setTodos(data);
      //     }
      // }

    //   fetchTodos();

    //   return () => {
    //     isActive = false
    //   };
    // }, []));

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
    //           console.log(x);
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
            console.log('Todos: ', data);
            setTodos(data);
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

    }
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

    // Marked dates callback
    // markedDatesFunc = date => {
    //   // Dot
    //   if (date.isoWeekday() === 4) { // Thursdays
    //     return {
    //       dots:[{
    //         color: <string>,
    //         selectedColor: <string> (optional),
    //       }]
    //     };
    //   }
    //   // Line
    //   if (date.isoWeekday() === 6) { // Saturdays
    //     return {
    //       lines:[{
    //         color: <string>,
    //         selectedColor: <string> (optional),
    //       }]
    //     };
    //   }
    //   return {};
    // }

    // const markedDatesArray = [
    //   {
    //     date: "2022-06-11",
    //     dots: [
    //       {
    //         color: "red",
    //         selectedColor: "red"
    //       }
    //     ]
    //   },
    //   {
    //     date: "2022-06-12",
    //     dots: [
    //       {
    //         color: "red",
    //         selectedColor: "red"
    //       }
    //     ]
    //   }
    // ];
  

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

         <View style={styles.container}>
          <CalendarStrip
            //scrollable
            //markedDates={markedDatesArrayy}
            onWeekChanged={(start, end) => fetchTodosweek(start, end)}
            style={{height:80, paddingTop: 10, paddingBottom: 10, marginBottom: 10}}
            calendarColor={'#fff'}
            // calendarHeaderStyle={{color: 'white'}}
            // dateNumberStyle={{color: 'white'}}
            // dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            selectedDate={new Date()}
            daySelectionAnimation={{type: 'border', duration: 10, borderWidth: 1, borderHighlightColor: '#ec2929'}}
            highlightDateNumberStyle={{color: '#ec2929'}}
            highlightDateNameStyle={{color: '#ec2929'}}
            //onDateSelected={selectedDate => {fetchTodosday(selectedDate)}}
          />
          <View style={{alignItems:'center'}}>
           <FlatList
            scrollEnabled={true}
            data={todos}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item: todo }) => (

            <View style={[styles.dFlex]}>
                <Menu onSelect={value => (value == 1) ? null : deleteTodo(todo.id)}>
                  <MenuTrigger>
                  <CheckBox
                  checked={todo.completed}
                  onPress={() => toggleCompleted(todo.id, todo.completed, todo.user_id)}
                  />
                  </MenuTrigger>
                  <MenuOptions>
                  <MenuOption value={1} text='Keep' />
                  <MenuOption value={2}>
                  <Text style={{color: 'red'}}>Remove</Text>
                  </MenuOption>
                  </MenuOptions>
                </Menu>

              
                <View>
                  <Text style={[styles.mtAutoTime]}>
                    {timeToStringg(todo.datetime)}
                  </Text>
                  <Text style={[styles.mtAutoTime]}>
                    {timeToString(todo.datetime)}
                  </Text>
                  <Text style={[styles.mtAutoName]}>
                    {todo.item_name}
                  </Text>
                </View>
                

                <Menu onSelect={value => (value == 1) ? handlePress(todo) : deleteTodo(todo.id)}>
                  <MenuTrigger>
                  <SimpleLineIcons name="options-vertical" size={24} color="black" />
                  </MenuTrigger>
                  <MenuOptions>
                  <MenuOption value={1} text='Edit' />
                  <MenuOption value={2}>
                  <Text style={{color: 'red'}}>Delete</Text>
                  </MenuOption>
                  </MenuOptions>
                </Menu>


              </View>
            )}
          />
          </View>
        </View>
        <Toast />
      </View>

    </TouchableWithoutFeedback>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  // rectangle: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingTop: 30,
  // },
  dFlex: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    width: 350,
    borderRadius: 20,
    borderColor: 'black',
    height: 100,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  mtAutoTime: {
    width: 230,
    paddingRight: 15,
    margin: 2,
  },
  mtAutoName: {
    width: 230,
    paddingRight: 15,
    margin: 2,
    fontSize: 18
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




// import { MaterialCommunityIcons } from '@expo/vector-icons';


// // Light theme colors
// const lightColors = {
//   background: '#FFFFFF',
//   primary: '#283747',
//   text: '#d7dbdd',
//   error: '#283747',
// };

// // Dark theme colors
// const darkColors = {
//   background: '#808080',
//   primary: '#283747',
//   text: '#283747',
//   error: '#283747',
// };

// // Dark theme colors
// const sizes = {
//   // global sizes
//   base: 16,
//   font: 14,
//   radius: 6,
//   padding: 25,

//   // font sizes
//   h1: 26,
//   h2: 20,
//   h3: 18,
//   title: 18,
//   header: 16,
//   body: 14,
//   caption: 12,
//   subtitle: 14,
//   small: 10
// };

// export default function TodoList() {
//   const [rawtodos, setRawtodos] = useState();
//   const [todos, setTodos] = useState({});
//   const [items, setItems] = useState({});
//   const [datas, setDatas] = useState();
//     // const [todos, setTodos] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [desc, setDesc] = useState('');
//   const [datetime, setDateTime] = useState(new Date());
//   const [show, setShow] = useState(false)
//   const [mode, setMode] = useState('date')
//   const [id, setId] = useState('');
//   let loading = false;


//   var daysPrior = new Date()
//   daysPrior.setDate(daysPrior.getDate() - 365)
//   daysPrior.setHours(0,0,0,0)
//   var daysAfter = new Date()
//   daysAfter.setDate(daysAfter.getDate() + 365)
//   daysAfter.setHours(23,59,0,0)




//     useFocusEffect(
//     React.useCallback(() => {
//       let isActive = true;

//       const fetchTodos = async () => {
//         try {
//           const { data, error } = await supabaseClient
//             .from('todos')
//             .select('*')
//             .gt('datetime', daysPrior.toISOString())
//             .lt('datetime', daysAfter.toISOString())
//             .order('datetime', { ascending: true });
//           if (isActive) {
//             console.log(data);
//             setRawtodos(data);
//             const reduced = data.reduce((acc, currentItem) => {
//               const {datetime, ...coolItem} = currentItem;
//               if (!acc[timeToString(datetime)]) {
//                 acc[timeToString(datetime)] = [];
//             }
//               acc[timeToString(datetime)].push(coolItem);
//               return acc;
//             }, {});
//             console.log(reduced);
//             setTodos(reduced);
//             setDatas(data);
//           }
//         } catch (error) {
//           console.log(error.message);
//         }
//       };

//       fetchTodos();

//       return () => {
//         isActive = false
//       };
//     }, []));
  
//     const deleteTodo = async id => {
//       const { error } = await supabaseClient.from('todos').delete().eq('id', id);
//       if (error) {
//         console.log('error', error);
//       } 
//       else {
//         setRawtodos(rawtodos.filter(x => x.id !== Number(id)));
//       }
//     };
    
    

//   const renderItem = (item) => {
//     return (
//       <View style={styles.item}>
//         <CheckBox
//           checked={item.completed}
//           onPress={() => toggleCompleted(item.id, item.completed)}
//         />
//         <TouchableOpacity onLongPress={() => handlePress(item, item.id)}>
//         <Text style={styles.task}>{item.item_name}</Text>
//         </TouchableOpacity>
//         <AntDesign name="delete" size={24} color="black" onPress={() => deleteTodo(item.id)} />
//       </View>
//     );
//   };

//   const renderKnobIcon = () => {
//         return (
//             <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
//                 <MaterialCommunityIcons name="ray-vertex" size={30} color="#283747" />
//             </TouchableOpacity>
//         );
//   };


//   const handlePress = async (todo, id) => {
//     setName(todo.item_name)
//     setDesc(todo.description)
//     setId(id)
//     setDateTime(new Date(todo.datetime))
//     setModalVisible(true)
//   };

//   const showDate = () => {
//     setShow(true)
//     setMode('date')
//   }

//   const showTime = () => {
//     setShow(true)
//     setMode('time')
//   }

//   const onChange = (event, selectedDate) => {
//     let currentDate = selectedDate;
//     setShow(false)
//     setDateTime(selectedDate)
//   }

//   const timeFormatter = () => {
//     let hours = datetime.getHours()
//     let ampm = "am"
//     if (hours >= 12) {
//       ampm = "pm"
//       if (hours > 12) {
//         hours -= 12
//       }
//     }
//     let minutes = datetime.getMinutes()
//     if (minutes < 10) {
//       minutes = '0' + minutes.toString()
//     }
//     return hours + ':' + minutes + ampm
//   }

//   const dateFormatter = () => {
//     let day = datetime.getDate()
//     let month = datetime.getMonth()
//     let year = datetime.getFullYear()
//     return day + '/' + month + '/' + year
//   }

//   const handleUpdate = async () => {
//     try {
//       loading = true;
//       const { error } = await supabaseClient
//         .from('todos')
//         .update({ item_name: name, description: desc, datetime: datetime.toISOString() })
//         .eq('id', id)
//       if (error) throw error
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: error.message
//       });
//     } finally {
//       loading = false
//       Toast.show({
//         type: 'success',
//         text1: 'Task Updated!',
//       });
//     }

//   }


//   return (
//     <View style={styles.container}>
//          <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(!modalVisible);
//           }}
//         >
//           <TouchableWithoutFeedback onPress={() => {
//             Keyboard.dismiss();
//           }}>
//             <View style={styles.modalView}>

//               <View style={styles.details}>
//                 <Icon name='info' type='feather' color='#fff' />
//                 <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>
//                   Task Details
//                 </Text>
//               </View>

//               <View style={{ justifyContent: 'center', alignItems: 'center' }}>

//                 <View style={styles.descBox}>
//                   <TextInput
//                     value={name}
//                     maxLength={50}
//                     onChangeText={(itemName => setName(itemName))}
//                     multiline={true}
//                   />
//                 </View>

//                 <View style={{ flexDirection: "row" }}>
//                   <TouchableOpacity style={styles.DTBox} onPress={showDate}>
//                     <Icon name='date-range' type='material' color='gray' />
//                     <Text style={{ fontFamily: "Roboto", padding: 5 }}>
//                       {dateFormatter()}
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.DTBox} onPress={showTime}>
//                     <Icon name='access-time' type='material' color='gray' />
//                     <Text style={{ fontFamily: "Roboto", padding: 5 }}>
//                       {timeFormatter()}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 {show && (
//                   <DateTimePicker
//                     mode={mode}
//                     onChange={onChange}
//                     value={datetime}
//                     minimumDate={Date.now()} />
//                 )}

//                 <View style={styles.descBox}>
//                   <TextInput
//                     value={desc}
//                     multiline={true}
//                     numberOfLines={9}
//                     maxLength={280}
//                     onChangeText={(desc => setDesc(desc))}
//                     textAlignVertical='top'
//                   />
//                 </View>

//                 <Pressable
//                   style={[styles.primaryButton]}
//                   onPress={handleUpdate}
//                 >
//                   <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
//                     SAVE CHANGES
//                   </Text>
//                 </Pressable>

//                 <Pressable
//                   style={[styles.secondaryButton]}
//                   onPress={() => setModalVisible(!modalVisible)}
//                 >
//                   <Text style={{ color: '#ec2929', fontFamily: "Roboto", fontWeight: 'bold' }}>
//                     HIDE
//                   </Text>
//                 </Pressable>

//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>

//         <Header
//           statusBarProps={{ backgroundColor: '#ec2929' }}
//           placement='left'
//           leftComponent={{ icon: 'list', color: '#fff', size: 30 }}
//           centerComponent={{ text: 'To Do List', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
//           containerStyle={{
//             backgroundColor: '#ec2929',
//             alignItems: 'baseline'
//           }}
//         />
//       <Agenda 
//       items={todos} 
//       // loadItemsForMonth={loadItems}
//       renderItem={renderItem}
//       renderEmptyDate={() => {
//         return <View>
//           <Text>
//             Nothing
//           </Text>
//         </View>;
//       }}
//       pastScrollRange={12} 
//       futureScrollRange={12}  
//       renderKnob={renderKnobIcon}
//       hideKnob={false}
//       showClosingKnob={true}
//       disabledByDefault={false}
//       refreshing={false}
//       showScrollIndicator={true}
//       scrollEnabled={true}
//       pagingEnabled={true}
//       //style={{height:400}}
//        />
//     </View>
//   )
// }





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingBottom: 80
//   },
//     item: {
//         backgroundColor: 'white',
//         flex: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginRight: 10,
//         marginTop: 17,
//         flexDirection: 'row',
//         alignItems: "center",
//         justifyContent: 'flex-start'
//     },
//     task: {
//       width: 200,
//     },
//     emptyDate: {
//         height: 15,
//         flex: 1,
//         paddingTop: 30
//     },
//     dateViewStyle: {
//         flexDirection: "row",
//         justifyContent: "center",
//         height: "auto"
//     },
//     dateStyle: {
//         color: "#283747",
//         fontSize: 18,
//         padding: 10,
//         margin: 5,
//         borderRadius: 5
//     },
//     viewStyle: {
//         flexDirection: "row",
//         justifyContent: "center",
//         padding: 5,
//         marginTop: 30,
//         height: 50
//     },
//     textStyle: {
//         //fontSize: 18,
//         margin: 5,
//         color: '#283747',
//         fontSize: sizes.font,
//         fontWeight: "500",
//         color: '#283747',

//     },
//     modalView: {
//       margin: 20,
//       marginTop: "20%",
//       backgroundColor: "#f9f9f9",
//       borderRadius: 20,
//     // paddingTop: 35,
//       paddingBottom: 35,
//       shadowColor: "#000",
//       shadowOffset: {
//       width: 0,
//       height: 2
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5
//     },
//    primaryButton: {
//      backgroundColor: '#ec2929',
//      borderRadius: 10,
//      width: '80%',
//      height: 45,
//      alignItems: 'center',
//      justifyContent: 'center',
//      marginTop: 20
//    },
//   secondaryButton: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     width: '80%',
//     height: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     borderColor: '#ec2929',
//     borderWidth: 1
//   },
//   DTBox: {
//     backgroundColor: "#fff",
//     // width: "35%",
//     borderRadius: 25,
//     height: 55,
//     marginRight: Dimensions.get("window").width * 0.05,
//     marginLeft: Dimensions.get("window").width * 0.05,
//     marginBottom: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: 'row',
//     padding: 10
//   },
//   descBox: {
//     backgroundColor: "#fff",
//     width: "80%",
//     borderRadius: 25,
//     marginBottom: 10,
//     padding: 20,
//   },
//   details: {
//     backgroundColor: "#ec2929",
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'baseline',
//     paddingLeft: 40,
//     paddingBottom: 20,
//     paddingTop: 25,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginBottom: 20
//   }

// });