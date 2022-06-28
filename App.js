
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabaseClient } from './supabaseClient';
import { Session } from '@supabase/supabase-js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import Account from './components/Account'
import AddToDoPage from './components/AddToDoPage';
import AppInfo from './components/AppInfo';
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPassword from './components/ForgotPassword'
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

import ShopPage from './components/ShopPage';
import Statistics from './components/Statistics';
import TodoList from './components/TodoListPage';

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
            <View
              style={{
                position: 'absolute',
                bottom: 10, // space from bottombar
                height: 58,
                width: 58,
                borderRadius: 58,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ec2929',
                borderWidth: 5
              }}>
              <Icon name='add' type='material' color='#ec2929' size={45} />
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
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="AppInfo" component={AppInfo} />
            <Stack.Screen name="Statistics" component={Statistics} />
            {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

}