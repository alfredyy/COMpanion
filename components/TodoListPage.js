import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useState} from 'react';


export default function App() {
  const[todos, setTodos] = useState([
    { text: 'dummytask1', key: '1' },
    { text: 'dummytask2', key: '2' },
    { text: 'dummytask3', key: '3' }
  ]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
            <Text style={styles.title}>To Do List</Text>
        </View>

      <View style={styles.content}>
        {/*to form*/}

        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Text>{item.text}</Text>
            )}
          />
        </View>

      </View>
  
    </View>
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
  content: {
    padding: 10,
    backgroundColor: 'coral'
  },
  list: {
    marginTop: 20
  },
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColour: 'grey',
},
title: {
    textAlign: 'right',
    colour: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
}
});
