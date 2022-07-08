import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, StatusBar, Modal, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseClient } from '../supabaseClient';
import 'react-native-url-polyfill/auto'
import { ImageDirectory } from '../images';
import Toast from 'react-native-toast-message';
import moment from 'moment';

export default function HomePage({ navigation }) {
  const [id, setID] = useState(null)
  const [selectedCompanion, setSelectedCompanion] = useState('')
  const [currency, setCurrency] = useState(0)
  const [randomNo, setRandomNo] = useState(Math.floor(Math.random() * 14) + 1)
  const [position, setPosition] = useState(Math.floor(Math.random() * 3) + 1)
  const [modalVisible, setModalVisible] = useState(false);
  const [lastFed, setLastFed] = useState(new Date())
  const [health, setHealth] = useState(100)
  const [inventory, setInventory] = useState({ "bacon": 0, "bread": 0, "chicken": 0, "egg": 0, "meatball": 0, "salmon": 0, "steak": 0, "sushi": 0 })
  const [mood, setMood] = useState('happy')

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const { data, error } = await supabaseClient
            .from('profiles')
            .select('id, currency, selected_companion, last_fed')
          if (isActive) {
            console.log('Profile: ', data);
            setID(data[0].id)
            setSelectedCompanion(data[0].selected_companion);
            setCurrency(data[0].currency)
            healthCalculator(new Date(data[0].last_fed))
            setLastFed(new Date(data[0].last_fed))
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
      setPosition(Math.floor(Math.random() * 3) + 1);
      fetchInventory();

      

      return () => {
        isActive = false
      };
    }, []));

  const fetchInventory = async () => {
    const { data, error } = await supabaseClient
      .from('inventory')
      .select()
    if (error) {
      console.log(error.message);
    } else {
      setInventory(data[0])
    }
  };


  const healthCalculator = async (datetimeObj) => {
    var today = new Date();
    var diffMs = (today - datetimeObj); // difference in milliseconds
    var diffMins = Math.floor((diffMs / 1000) / 60) // difference in minutes
    var calculated = 100 - Math.floor(diffMins / 30) //Health drops by 1 point every 30 mins
    setHealth(Math.min(Math.max(calculated, 0),100)) 

    //Ensures that if health fall belows 0, last_fed is updated to exactly 100 * 31 minutes prior to current time,
    // so that when companion is fed, the health will increase.
    if (calculated < 0) {
      const { data, error } = await supabaseClient
        .from('profiles')
        .update({ last_fed: moment().subtract(100 * 30, 'm') })
        .eq('id', id)
      if (error) {
        console.log(error);
      }
    }

    if (calculated < 30) {
      setMood('angry')
      setRandomNo('angry')
    } else if (calculated >= 30) {
      setMood('happy')
      setRandomNo(Math.floor(Math.random() * 14) + 1);
    }
    console.log(mood)
  }

  const feed = async (item) => {
    if (selectedCompanion == '') {
      Toast.show({
        type: 'error',
        text1: "You have not selected a companion",
        text2: 'Adopt one at the shop! Your first companion is free!'
      });
    } else {
      var newDateObj;
      switch (item) {
        case 'bread':
          await supabaseClient
            .rpc('incrementbread', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 10, 'm'))
          break;
        case 'bacon':
          await supabaseClient
            .rpc('incrementbacon', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 10, 'm'))
          break;
        case 'egg':
          await supabaseClient
            .rpc('incrementegg', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 10, 'm'))
          break;
        case 'meatball':
          await supabaseClient
            .rpc('incrementmeatball', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 15, 'm'))
          break;
        case 'sushi':
          await supabaseClient
            .rpc('incrementsushi', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 20, 'm'))
          break;
        case 'salmon':
          await supabaseClient
            .rpc('incrementsalmon', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 30, 'm'))
          break;
        case 'steak':
          await supabaseClient
            .rpc('incrementsteak', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 40, 'm'))
          break;
        case 'chicken':
          await supabaseClient
            .rpc('incrementchicken', { x: -1, row_id: id })
          newDateObj = moment.min(moment(), moment(lastFed).add(30 * 50, 'm'))
          break;
      }
      const { data, error } = await supabaseClient
        .from('profiles')
        .update({ last_fed: newDateObj })
        .eq('id', id)
      if (error) {
        console.log(error);
      } else {
        console.log(data)
        setLastFed(new Date(data[0].last_fed))
        healthCalculator(new Date(data[0].last_fed));
        fetchInventory()
      }
    }
  }

  // const numberRandomizer = () => {
  //   setRandomNo(Math.floor(Math.random() * 14) + 1);
  // }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={styles.modalView}>

          <View style={{ alignItems: 'center' }}>
            <View style={styles.cardContainerHeader}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold', fontSize: 24 }}>
                Food Inventory
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>


            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Bread
              </Text>
              <Image source={require('../assets/food/bread.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.bread}
              </Text>
              <TouchableOpacity style={inventory.bread == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('bread')} disabled={(inventory.bread == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Bacon
              </Text>
              <Image source={require('../assets/food/bacon.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.bacon}
              </Text>
              <TouchableOpacity style={inventory.bacon == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('bacon')} disabled={(inventory.bacon == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Egg
              </Text>
              <Image source={require('../assets/food/egg.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.egg}
              </Text>
              <TouchableOpacity style={inventory.egg == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('egg')} disabled={(inventory.egg == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Meatball
              </Text>
              <Image source={require('../assets/food/meatball.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.meatball}
              </Text>
              <TouchableOpacity style={inventory.meatball == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('meatball')} disabled={(inventory.meatball == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Sushi
              </Text>
              <Image source={require('../assets/food/sushi.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.sushi}
              </Text>
              <TouchableOpacity style={inventory.sushi == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('sushi')} disabled={(inventory.sushi == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Salmon
              </Text>
              <Image source={require('../assets/food/salmon.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.salmon}
              </Text>
              <TouchableOpacity style={inventory.salmon == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('salmon')} disabled={(inventory.salmon == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Steak
              </Text>
              <Image source={require('../assets/food/steak.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.steak}
              </Text>
              <TouchableOpacity style={inventory.steak == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('steak')} disabled={(inventory.steak == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Roasted Chicken
              </Text>
              <Image source={require('../assets/food/roastedchicken.png')} style={styles.food} />
              <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                Owned: {inventory.chicken}
              </Text>
              <TouchableOpacity style={inventory.chicken == 0 ? styles.buttonLocked : styles.button} onPress={() => feed('chicken')} disabled={(inventory.chicken == 0 ? true : false)}>
                <Text style={{ color: 'white', fontFamily: "Roboto", fontWeight: 'bold' }}>
                  FEED
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: '#fff', fontFamily: "Roboto", fontWeight: 'bold' }}>
                CLOSE
              </Text>
            </Pressable>
          </View>

        </ScrollView>
      </Modal>

      <StatusBar translucent backgroundColor='transparent' />

      <ScrollView style={{ flex: 1 }} horizontal>
        <ImageBackground source={require('../assets/backgrounds/roomday.png')} style={{ height: '100%', width: 800 }}>


          <View style={styles.companionImage[position]}>
          <Image
            source={selectedCompanion != '' ? ImageDirectory[mood][Math.floor(Math.random() * 4) + 1] : ImageDirectory['']} />
          <Image
            source={selectedCompanion != '' ? ImageDirectory[selectedCompanion][randomNo] : ImageDirectory['']} />
          </View>

          {/* <Image
            source={selectedCompanion != '' ? ImageDirectory[mood][mood == 'tired' ? 1 : Math.floor(Math.random() * 4) + 1] : ImageDirectory['']}
            style={selectedCompanion != '' ? styles.companionMood[position] : styles.companionImage[position]} />
          <Image
            source={selectedCompanion != '' ? ImageDirectory[selectedCompanion][randomNo] : ImageDirectory['']}
            // source={ImageDirectory['']} //FOR TESTING PURPOSES -> NEW USERS WHEN THEY DONT HAVE A SELECTED COMPANION
            style={styles.companionImage[position]} /> */}


        </ImageBackground>
      </ScrollView>

      <View style={styles.box}>
        <View style={styles.boxItem}>
          <Image style={styles.boxIcon} source={require('../assets/coin.png')} />
          <Text style={{ color: "white", fontWeight: 'bold', fontSize: 20, fontFamily: 'Roboto' }}>
            {currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
        <View style={styles.boxItem}>
          <Image style={styles.boxIcon} source={require('../assets/heart.png')} />
          <Text style={{ color: "white", fontWeight: 'bold', fontSize: 20, fontFamily: 'Roboto' }}>
            {health}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.roundButton}>
          <Image style={styles.feedMenuIcon} source={require('../assets/food/bread.png')} />
          {/* <Icon name='food-apple-outline' type='material-community' color='#fff' size={30} /> */}
        </TouchableOpacity>
      </View>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000000',
    position: 'absolute',
  },
  button: {
    backgroundColor: '#ec2929',
    borderRadius: 10,
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  buttonLocked: {
    backgroundColor: '#ec2929',
    opacity: 0.2,
    borderRadius: 10,
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  homeCardContainer: {
    padding: 20,
    backgroundColor: '#ec2929',
    borderRadius: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  companionImage: {
    '1': {
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 100,
      left: 100
    },
    '2': {
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 265,
      left: 100
    },
    '3': {
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 100,
      right: 200
    }
  },
  box: {
    flexDirection: 'column',
    position: 'absolute',
    top: 35,
    right: 10,
    padding: 1,
    backgroundColor: '#3f2832',
    borderColor: '#b86f50',
    borderWidth: 3,
    width: 170,
    borderRadius: 3
  },
  boxItem: {
    flexDirection: 'row',
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 50,
  },
  boxIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  modalView: {
    margin: 20,
    marginTop: "20%",
    marginBottom: '20%',
    backgroundColor: '#3f2832',
    borderColor: '#b86f50',
    borderRadius: 3,
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  cardContainer: {
    borderRadius: 3,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    borderColor: '#743f39',
    borderWidth: 5,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5
  },
  cardContainerHeader: {
    borderRadius: 3,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    borderColor: '#743f39',
    borderWidth: 5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5
  },
  food: {
    width: 50,
    height: 50,
    margin: 4
  },
  roundButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#3f2832',
    borderColor: '#b86f50',
    borderWidth: 3,
  },
  feedMenuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
