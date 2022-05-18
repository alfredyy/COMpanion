
import React, {useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabaseClient } from './supabaseClient';
import { Session } from '@supabase/supabase-js'

import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import HomePage from './components/HomePage'

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
            {session == null ? (
            <>
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
            </>
            ) : (
              <Stack.Screen name="Home" component={HomePage} />
            )}
        </Stack.Navigator>
    </NavigationContainer>
  );
  
}