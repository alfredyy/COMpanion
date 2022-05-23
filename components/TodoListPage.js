import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState} from 'react';
import TodoItem from './TodoListPage1';


export default function TodoList() {
  const[todos, setTodos] = useState([
    { text: 'dummytask1', key: '1' },
    { text: 'dummytask2', key: '2' },
    { text: 'dummytask3', key: '3' }
  ]);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>

      <View style={styles.header}>
            <Text style={styles.title}>To Do List</Text>
      </View>

     

        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} />
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
    backgroundColor: '#ec2929',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },

  list: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    marginBottom: 100,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  header: {
    justifyContent: 'center',
    marginTop: 30,
    paddingLeft: 100,
    paddingRight: 100,
    flex: 0.13,
    backgroundColor: 'white',
    borderRadius: 13,
 },
 title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
 
 }
});
