import {View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Button, Input, ListItem, CheckBox, Text} from 'react-native-elements';
import React, {useEffect, useRef, useState} from 'react';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'

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


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>
    <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={item => `${item.id}`}
          renderItem={({item: todo}) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <View style={[styles.dFlex]}>
                  <CheckBox
                    checked={todo.completed}
                    onPress={() => toggleCompleted(todo.id, todo.completed)}
                  />
                  <Text h4 style={[styles.mtAuto]}>
                    {todo.item_name}
                  </Text>
                  <Button title="Delete" onPress={() => deleteTodo(todo.id)} />
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
    </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  mtAuto: {
    margin: 'auto',
  },
  dFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});