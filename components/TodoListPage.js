import {Dimensions, View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ToastAndroid } from 'react-native';
import {Button, Input, ListItem, CheckBox, Text, Header} from 'react-native-elements';
import React, {useEffect, useRef, useState} from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const componentMounted = useRef(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const {data, error} = await supabaseClient
        .from('todos')
        .select('*')
        .order('id', {ascending: false});
      if (error) {
        console.log('error', error);
      } else {
        console.log('Todos: ', data);
        setTodos(data);
      }
    };
    if (componentMounted.current) {
      fetchTodos();
    }

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const toggleCompleted = async (id, completed) => {
    const {data, error} = await supabaseClient
      .from('todos')
      .update({completed: !completed})
      .eq('id', id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }
  };

  const deleteTodo = async id => {
    const {error} = await supabaseClient.from('todos').delete().eq('id', id);
    if (error) {
      console.log('error', error);
    } else {
      setTodos(todos.filter(x => x.id !== Number(id)));
    }
  };

    const handlePress = async id => {
    const {data, error} = await supabaseClient
      .from('todos')
      .select('description')
      .eq('id', id)
    if (error) {
      console.log(error);
    } else {
      ToastAndroid.showWithGravity(`${data[0].description}`, ToastAndroid.LONG, ToastAndroid.TOP);
  }
};

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
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
    <View style={styles.rectangle}>
    <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={item => `${item.id}`}
          renderItem={({item: todo}) => (
            
              
                <View style={[styles.dFlex]}>
                  <CheckBox
                    checked={todo.completed}
                    onPress={() => toggleCompleted(todo.id, todo.completed)}
                  />
                  
                  <TouchableOpacity onLongPress={() => handlePress(todo.id)}>
                    <Text style={[styles.mtAuto]}>
                      {todo.item_name}
                     </Text>
                     </TouchableOpacity>
                      <AntDesign name="delete" size={24} color="black" onPress={() => deleteTodo(todo.id)} />
                 
                </View>
            
            
          )}
        />

        </View>
      
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
    width: Dimensions.get("window").width,
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
    alignItems: 'center'
  },
  mtAuto: {
   width: 230,
   paddingRight: 15
  }
});