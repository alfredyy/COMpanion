import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import { supabaseClient } from '../supabaseClient';
import Toast from 'react-native-toast-message';

export default function LoginPage({ navigation }) {
  let loading = false
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleLogin() {
    if (email.length == 0 || password.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Fields'
      });
    } else {
      try {
        loading = true
        const { user, error } = await supabaseClient.auth.signIn({
          email: email,
          password: password,
        })
        if (error) throw error;
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error.message
        });
      } finally {
        loading = false
      }
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View>
        <Image style={styles.logo} source={require('../assets/logo2.png')} />
      </View>

      <View style={styles.rectangleLogin}>

        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            onChangeText={(newEmail) => setEmail(newEmail)}
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(newPassword) => setPassword(newPassword)}
            autoCapitalize='none'
          />
        </View>

        <View style={{ alignSelf: 'flex-end', marginRight: 40 }}>
          <Text onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot Password?
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: "Roboto" }}>No account? Create one here!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
            CREATE AN ACCOUNT
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
    height: Dimensions.get('window').height,
  },
  inputField: {
    backgroundColor: "#ffffff",
    width: "80%",
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 55,
    fontFamily: "Roboto",
    width: '100%'
  },
  rectangleLogin: {
    width: Dimensions.get("window").width,
    backgroundColor: "#f9f9f9",
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
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
  },
  logo: {
    width: 300,
    resizeMode: 'contain',
    marginBottom: -20
  }
});
