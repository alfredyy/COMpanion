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


//   start here

//   const [items, setItems] = useState([])

//   const timeToString = (time) => {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   };

//   const loadItems = (day) => {
  
//       setTimeout(() => {
//         for (let i = -15; i < 85; i++) {
//           const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//           const strTime = timeToString(time);
  
//           if (!items[strTime]) {
//             items[strTime] = [];
//             const numItems = Math.floor(Math.random() * 3 + 1);
//             for (let j = 0; j < numItems; j++) {
//               items[strTime].push({
//                 name: 'Item for ' + strTime + ' #' + j,
//                 height: Math.max(50, Math.floor(Math.random() * 150)),
//                 day: strTime
//               });
//             }
//           }
//         }
        
//         const newItems = {};
//         Object.keys(items).forEach(key => {
//           newItems[key] = items[key];
//         });
//         setItems(newItems);
//       }, 1000);
//     }

//     const renderItem = (item) => {

//       return (<TouchableOpacity>
//         <Card.Content>
//           <View style={{ 
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//             <Text>{item.name}</Text>
//           </View>
//         </Card.Content>
//       </TouchableOpacity>)
//     }

//   return (
//     <View style={{flex: 1}}>
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

//          {/* <Agenda
//            items={items}
//            loadItemsForMonth={loadItems}
//            selected={new Date()}
//            //renderItem={renderItem}
//         /> */}

//      </View>

//    );
//  }

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



//import React, { Component } from 'react';
//import { Alert, StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
//import { Header } from 'react-native-elements';
//import { Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { AntDesign } from '@expo/vector-icons';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForceUpdate } from '@chakra-ui/react';
import { render } from 'react-dom';



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


// export default class AgendaScreen extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             items: {
//               '2022-06-02': [{ name: 'item 1 - any js object' }],
//               '2022-06-03': [{ name: 'item 2 - any js object', height: 80 }],
//               '2022-06-04': [],
//               '2022-06-05': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
//             },

//             // data: {
//                 '2022-06-02': [{ name: 'item 1 - any js object' }],
//                 '2022-06-03': [{ name: 'item 2 - any js object', height: 80 }],
//                 '2022-06-04': [],
//                 '2022-06-05': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
//             // }

//         };
//     }

    // importData = async () => {
    //     try {
    //         const data = [];
    //         let keys = await AsyncStorage.getAllKeys();
    //         for (let inKey of keys) {
    //             let obj = await AsyncStorage.getItem(inKey);
    //             obj = JSON.parse(obj);

    //             const DATE = this.formatDate(obj.date);

    //             const newAgendaObject = {
    //                 [DATE]: [{
    //                     id: DATE,
    //                     name: obj.title,
    //                     height: 100

    //                 }],
    //             }


    //             data.push(newAgendaObject);
    //         }
    //         console.log(data)
    //         return data;

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }




//     render() {


//        // console.log(this.state.items);

//         return (

//             <View style={{ flex: 1 }}>
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

//                 <Agenda
//                     // The list of items that have to be displayed in agenda. If you want to render item as empty date
//                     // the value of date key has to be an empty array []. If there exists no value for date key it is
//                     // considered that the date in question is not yet loaded
//                     items={this.state.items}
//                     /*  items={{
//                           '2021-01-19': [{ name: 'item 1 - any js object' }],
//                           '2021-01-19': [{ name: 'item 2 - any js object', height: 80 }],
//                           '2021-01-20': [],
//                           '2021-01-19': [{ name: 'item 3 - any js object' }]
//                       }} */
//                     markingType={'custom'}

//                     // Callback that gets called when items for a certain month should be loaded (month became visible)
//                     //  loadItemsForMonth={(month) => { console.log('trigger items loading') }}
//                     loadItemsForMonth={this.loadItems.bind(this)}

//                     // Callback that fires when the calendar is opened or closed
//                     onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
//                     // Callback that gets called on day press
//                     // onDayPress={(day) => { console.log('day pressed') }}
//                     // Callback that gets called when day changes while scrolling agenda list
//                     onDayChange={(day) => { console.log('day changed') }}
//                     // Initially selected day
//                     // selected={'2021-01-19'}
//                     // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//                     minDate={'2020-01-01'}
//                     // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//                     // maxDate={'2022-05-30'}
//                     // Max amount of months allowed to scroll to the past. Default = 50
//                     pastScrollRange={12}
//                     // Max amount of months allowed to scroll to the future. Default = 50
//                     futureScrollRange={12}
//                     // Specify how each item should be rendered in agenda
//                     //  renderItem={(item, firstItemInDay) => { return (<View />); }}
//                     renderItem={this.renderItem.bind(this)}
//                     // displayLoadingIndicator={true}
//                     // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
//                     //  renderDay={(day, item) => { return (<View />); }}
//                     // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
//                     /* onDayPress={(day) => {
//                          getSelectedDayEvents(day.dateString);
//                          //to change the month and year on top of agenda
//                          setDate(moment(day.dateString).format("MMMM YYYY"));
//                          //set the date in case onRefresh is executed
//                          setDateToRefresh(day.dateString);
//                      }
//                      }*/
//                     // Specify how empty date content with no items should be rendered
//                     //renderEmptyDate={() => { return (<View />); }}
//                     renderEmptyDate={this.renderEmptyDate.bind(this)}

//                     // Specify how agenda knob should look like
//                     // renderKnob={() => { return (<View />); }}
//                     renderKnob={this.renderKnobIcon.bind(this)}
//                     // Specify what should be rendered instead of ActivityIndicator
//                     //    renderEmptyData={() => { return (<View />); }}
//                     // Specify your item comparison function for increased performance
//                     rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
//                     // Hide knob button. Default = false
//                     hideKnob={false}
//                     // By default, agenda dates are marked if they have at least one item, but you can override this if needed

//                     markedDates={{
//                         '2022-01-16': { selected: true, marked: true, startingDay: true },
//                         '2022-01-17': { marked: true },
//                         '2022-01-18': { disabled: true }
//                     }}
//                     firstDay={1}
//                     // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
//                     disabledByDefault={false}
//                     // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
//                     onRefresh={() => console.log('refreshing...')}
//                     // Set this true while waiting for new data from a refresh
//                     refreshing={false}
//                     // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
//                     //  refreshControl={null}
//                     // Agenda theme
//                     showScrollIndicator={true}
//                     scrollEnabled={true}

//                     pagingEnabled={true}

//                     theme={{
//                         agendaKnobColor: '#283747',
//                         agendaDayTextColor: '#283747',
//                         agendaDayNumColor: '#283747',
//                         agendaTodayColor: '#283747',
//                         agendaKnobColor: '#283747',
//                         indicatorColor: '#283747',
//                         textSectionTitleColor: '#283747',
//                         dotColor: '#283747',
//                         selectedDayBackgroundColor: '#283747',
//                         arrowColor: '#283747',
//                         textDayFontSize: 12,
//                         textMonthFontSize: 20,
//                         textDayHeaderFontSize: 14,
//                         textDayHeaderFontWeight: 'bold'

//                     }}
//                     // Agenda container style

//                     style={{

//                         //height: 20

//                     }}
//                 />


//             </View>

//         );
//     }





//     loadItems(day) {
//         setTimeout(() => {


        

//             for (let i = -15; i < 85; i++) {
//                 const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//                 const strTime = this.timeToString(time);

              

//                 if (!this.state.items[strTime]) {
//                     this.state.items[strTime] = [];
//                     // const numItems = Math.floor(Math.random() * 3 + 1);
//                     // for (let j = 0; j < numItems; j++) {
//                     //     this.state.items[strTime].push({
//                     //         name: 'item for ' + strTime + ' #' + j,
//                     //         height: Math.max(50, Math.floor(Math.random() * 150))
//                     //     });
//                     // }
//                 }
//             }
//             const newItems = {};
//             Object.keys(this.state.items).forEach(key => {
//                 newItems[key] = this.state.items[key];

//             });
//             this.setState({
//                 items: newItems
//             });
//         }, 1000);
//     }


   


//     timeToString(time) {
//         const date = new Date(time);
//         return date.toISOString().split('T')[0];
//     }




//     renderItem(item) {
//         return (
//             <TouchableOpacity style={[styles.item, { height: item.height }]} onPress={() => Alert.alert(item.name)}>
//                 <Text style={styles.textStyle} >{item.name}</Text>
//             </TouchableOpacity>
//         );
//     }


//     renderEmptyDate() {
//         return (
//             <TouchableOpacity style={[styles.item, {}]}>
//                 <MaterialCommunityIcons name="exclamation-thick" size={15} color="#283747" />
//                 <Text style={styles.textStyle}>Wow, Look! Nothing!</Text>
//             </TouchableOpacity>
//         );
//     }




//     renderKnobIcon() {
//         return (
//             <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
//                 <MaterialCommunityIcons name="ray-vertex" size={30} color="#283747" />
//             </TouchableOpacity>
//         );
//     }



// }


export default function TodoList() {
  const [rawtodos, setRawtodos] = useState();
  const [todos, setTodos] = useState({});
  const [items, setItems] = useState({});
  const [datas, setDatas] = useState();


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
              acc[timeToString(datetime)] = [coolItem];
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
        <Text style={styles.task}>{item.item_name}</Text>
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


  // const loadItems = () => {
  //   datas.forEach((element) => {
  //     const strTime = timeToString(element.datetime);
  //     if (!items[strTime]) {
  //       items[strTime] = [];
  //       datas.forEach((datalist) => {
  //         items[strTime].push({
  //           name: datalist.item_name,
  //         });
  //       });
  //     }
  //   });
  //   const newItems = {};
  //   Object.keys(items).forEach((key) => {
  //     newItems[key] = items[key];
  //   });
  //   setItems(newItems);
  //   };


  return (
    <View style={styles.container}>
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
      //loadItemsForMonth={loadItems}
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

    }

});