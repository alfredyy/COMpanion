import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { supabaseClient } from '../supabaseClient';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter'
import { Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';

export default function CreateAccountPage({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  let loading = false

  async function signUp() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (name.length == 0 || email.length == 0 || password.length == 0 || cpassword.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Fields!',
      });
    } else if (reg.test(email) === false) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email!',
      });
    } else if (password.length <= 6) {
      Toast.show({
        type: 'error',
        text1: 'Password Not Long Enough!',
      });
    } else if (password != cpassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords Do Not Match!',
      });
    } else {
      try {
        loading = true
        const { error } = await supabaseClient.auth.signUp({
          email: email,
          password: password,
        },
          {
            data: {
              name: name
            }
          })

        if (error) throw error;
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      } finally {
        loading = false
      }
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Icon name='smiley' type='octicon' color='#fff' size={50} />

      <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold', margin: 10 }}>
        welcome to the family!
      </Text>

      <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Roboto', marginBottom: 20 }}>
        let us get to know you better
      </Text>

      <View style={styles.rectangle}>

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
          width={Dimensions.get("window").width * 0.75}
          barColor='#f9f9f9'
        />

        <View style={styles.inputFieldLast}>
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(cpassword) => setCpassword(cpassword)}
            autoCapitalize='none'
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => signUp()} disabled={loading}>
          <Text style={{ color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec2929',
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('window').height
  },
  inputField: {
    backgroundColor: "#ffffff",
    width: "80%",
    borderRadius: 25,
    height: 55,
    marginTop: 30,
    justifyContent: "center",
    padding: 20
  },
  inputFieldLast: {
    backgroundColor: "#ffffff",
    width: "80%",
    borderRadius: 25,
    height: 55,
    marginTop: 15,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 55,
    fontFamily: "Roboto",
    width: '100%'
  },
  rectangle: {
    height: 440,
    width: Dimensions.get("window").width,
    backgroundColor: "#f9f9f9",
    borderRadius: 50,
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#ec2929',
    borderRadius: 10,
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});
