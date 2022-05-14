import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


export default function LoginPage({navigation}) {
  
    const [ehmail, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
  
    return (
  
      <KeyboardAvoidingView behavior={'height'} enabled={false} style={styles.container}>
      
        <View style={styles.rectangleLogin}></View>
  
        <Text style={{ fontSize: 32, color:'white',position:"absolute", top:'18%', fontFamily:'Roboto', fontWeight:'bold'}}>
          COMpanion
        </Text>
  
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
      
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'white', fontFamily:"Roboto", fontWeight:'bold'}}>
            LOGIN
          </Text>
        </TouchableOpacity>
  
        <Text style={{fontFamily:"Roboto"}}>No account? Create one here!</Text>
  
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateAccountPage")}>
          <Text style={{color:'white', fontFamily:"Roboto", fontWeight:'bold'}}>
            CREATE AN ACCOUNT
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
   rectangleLogin: {
    height: 400,
    width: Dimensions.get("window").width,
    backgroundColor: "#f9f9f9",
    borderRadius: 50,
    top:'25%',
    position: "absolute"
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
