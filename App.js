
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
  
}