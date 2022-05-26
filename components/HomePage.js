import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';

export default function HomePage({ navigation }) {
  const daynight = (new Date().getHours < 12 ? 'Good Morning!' : 'Hello!');

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
        <Card containerStyle={ styles.homeCardContainer }>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              backgroundColor: "#ec2929"
            }}
          >
            <Icon name='smiley' type='octicon' color='#fff' size={50} />
            <Text style={{ color: "white", fontWeight:'bold', fontSize:24, fontFamily:'Roboto' }}>
              {daynight}
            </Text>
            <Text style={{ color: "white" }}>
              What would you like to do today?
            </Text>
          </View>
        </Card>
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
    justifyContent:'center',
    alignItems:'center'
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});
