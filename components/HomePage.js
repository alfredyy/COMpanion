import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'

export default function HomePage({ navigation }) {
  const daynight = (new Date().getHours() < 12 ? 'Good Morning!' : 'Hello!');
  const [selectedCompanion, setSelectedCompanion] = useState('')
  const [companionImage, setCompanionImage] = useState(require('../assets/white.png')) //PLACEHOLDER FOR NOW

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const { data, error } = await supabaseClient
            .from('profiles')
            .select('selected_companion')
          if (isActive) {
            console.log('Selected: ', data);
            setSelectedCompanion(data[0].selected_companion);
            // setCompanionImage(require('../assets/mack/mack3.png')) //FIGURE OUT HOW TO GET IMAGE FROM ASSETS 
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();

      return () => {
        isActive = false
      };
    }, []));

  return (

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <Header
          statusBarProps={{ backgroundColor: '#ec2929' }}
          placement='left'
          leftComponent={{ icon: 'home', color: '#fff', size: 30, type: 'antdesign' }}
          centerComponent={{ text: 'Home', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: '#ec2929',
            alignItems: 'baseline'
          }}
        />
        <Card containerStyle={styles.homeCardContainer}>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              backgroundColor: "#ec2929"
            }}
          >
            <Icon name='smiley' type='octicon' color='#fff' size={50} />
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 24, fontFamily: 'Roboto' }}>
              {daynight}
            </Text>
            <Text style={{ color: "white" }}>
              What would you like to do today?
            </Text>
          </View>
        </Card>
        <Image source={companionImage} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#ec2929',
    borderRadius: 10,
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  homeCardContainer: {
    padding: 20,
    backgroundColor: '#ec2929',
    borderRadius: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});
