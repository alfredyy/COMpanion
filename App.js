
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import { supabaseClient } from './supabaseClient';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabaseClient.auth.session())

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return(
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
  
}