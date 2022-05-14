import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function CreateAccountPage({navigation}) {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [cpassword, setCpassword] = useState(null)
  
    return(
      <KeyboardAvoidingView behavior={'height'} enabled={false} style={styles.container}>
        <View style={styles.rectangle}></View>
  
        <Text style={{ fontSize: 24, color:'white',position:"absolute", top:'10%', fontFamily:'Roboto', fontWeight:'bold'}}>
          welcome to the family!
        </Text>
  
        <Text style={{ fontSize: 18, color:'white',position:"absolute", top:'15%', fontFamily:'Roboto', margin:10}}>
          let us get to know you better
        </Text>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="name"
            onChangeText={(newName) => setName(newName)}
          />
        </View>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
        </View>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(newPassword) => setPassword(newPassword)}
          />
        </View>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(newCpassword) => setPassword(newCpassword)}
          />
        </View>
  
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'white', fontFamily:"Roboto", fontWeight:'bold'}}>
            CONFIRM
          </Text>
        </TouchableOpacity>
  
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ec2929',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:"Roboto"
    },
    inputField: {
      backgroundColor: "#ffffff",
      width:"80%",
      borderRadius:25,
      height:55,
      marginBottom:20,
      justifyContent:"center",
      padding:20
   },
   inputText: {
      height:55,
      fontFamily:"Roboto"
   },
   rectangle: {
    height: 440,
    width: Dimensions.get("window").width,
    backgroundColor: "#f9f9f9",
    borderRadius: 50,
    position:'absolute',
    zIndex:-15
   },
   button: {
     backgroundColor: '#ec2929',
     borderRadius: 10,
     width:'80%',
     height: 45,
     marginBottom: 20,
     alignItems:'center',
     justifyContent:'center',
     marginTop:20
   }
  });
