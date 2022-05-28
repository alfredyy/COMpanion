
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabaseClient } from './supabaseClient';
import { Session } from '@supabase/supabase-js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import HomePage from './components/HomePage';
import TodoList from './components/TodoListPage';
import AddToDoPage from './components/AddToDoPage';
import ShopPage from './components/ShopPage';
import ProfilePage from './components/ProfilePage';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//Navigation consts
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


//function for bottom navigation bar
function HomeTabs() {
  return (
    //<Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        height: 60,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#ec2929'
      }
    }}>
      <Tab.Screen name="Home" component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='home' type='antdesign' color='#fff' size={24} />
            </View>
          )
        }}
      />
      <Tab.Screen name="TodoList" component={TodoList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='list' type='feather' color='#fff' size={24} />
            </View>
          )
        }} />
      <Tab.Screen name="AddToDo" component={AddToDoPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='add-circle-outline' type='material' color='#fff' size={45} />
            </View>
          )
        }} />
      <Tab.Screen name="Shop" component={ShopPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='storefront' type='material' color='#fff' size={24} />
            </View>
          )
        }} />
        <Tab.Screen name="Profile" component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='person' type='octicon' color='#fff' size={24} />
            </View>
          )
        }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabaseClient.auth.session())

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {session == null ? (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
          </>
        ) : (
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

}