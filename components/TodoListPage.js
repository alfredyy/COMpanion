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
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 165,
    paddingRight: 165,
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

  },
  list: {
    marginTop: 20
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
