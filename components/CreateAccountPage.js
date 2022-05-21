import React, {useState} from 'react';
import { StyleSheet, Text, View,  TextInput,  Dimensions, Button, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { supabaseClient } from '../supabaseClient';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter'

export default function CreateAccountPage({navigation}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const[loading, setLoading] = useState(false)

    async function signUp() {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (password.length <= 6) {
        Alert.alert('Error', 'Password not long enough')
      } else if (password != cpassword) {
        Alert.alert('Error', 'Passwords do not match')
      } else if (reg.test(email) === false) {
        Alert.alert('Error', 'Invalid email')
      } else {
      setLoading(true)
      const { user, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
      },
      {
        data: {
          name: name
        }
      })
  
      if (error) Alert.alert(error.message)
      setLoading(false)
    }
  }
  
    return(
      <KeyboardAvoidingView behavior={'height'} enabled={false} style={styles.container}>
        <View style={styles.rectangle}></View>
  
        <Text style={{ fontSize: 24, color:'white',position:"absolute", top:'10%', fontFamily:'Roboto', fontWeight:'bold'}}>
          welcome to the family!
        </Text>
  
        <Text style={{ fontSize: 18, color:'white',position:"absolute", top:'13%', fontFamily:'Roboto', margin:10}}>
          let us get to know you better
        </Text>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="name"
            onChangeText={(name) => setName(name)}
            autoCapitalize='words'
          />
        </View>
  
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize='none'
          />
        </View>

        <BarPasswordStrengthDisplay
          password={password}
          minLength={6}
          width={280}
        />

        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(cpassword) => setCpassword(cpassword)}
            autoCapitalize='none'
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => signUp()} disabled={loading}>
          <Text style={{color:'white', fontFamily:'Roboto', fontWeight:'bold'}}>
            SIGN UP
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
      marginTop:15,
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
