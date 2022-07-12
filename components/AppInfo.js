import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Linking, Image } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import Toast from 'react-native-toast-message';

export default function AppInfo({ navigation }) {

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <Header
                    statusBarProps={{ backgroundColor: '#ec2929' }}
                    placement='left'
                    leftComponent={{ icon: 'info', color: '#fff', size: 30, type: 'feather' }}
                    centerComponent={{ text: 'App Info', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 } }}
                    containerStyle={{
                        backgroundColor: '#ec2929',
                        alignItems: 'baseline'
                    }}
                />

                <Card containerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.mainTitles}>
                        About
                    </Text>

                    <Card.Divider />

                    <Text style={styles.paragraph}>
                        COMpanion is a mobile app designed to help users keep track of their tasks, and have an incentive to do so in a gamified manner.
                    </Text>
                </Card>

                <Card>
                    <Text style={styles.mainTitles}>
                        User Manual
                    </Text>

                    <Card.Divider />

                    <Text style={styles.subTitles}>
                        How to Add Task
                    </Text>

                    <Text style={styles.paragraph}>
                        1. Tap on the "Add Task" button located on the bottom of your screen.
                    </Text>

                    <View style={{
                        marginTop: 10,
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#ec2929',
                        borderWidth: 2,
                        alignSelf: 'center'
                    }}>
                        <Icon name='add' type='material' color='#ec2929' size={30} />
                    </View>

                    <Text style={styles.paragraph}>
                        2. Give your task a name, date and time. Notes are optional, but useful to give yourself some information on the task.
                    </Text>

                    <Card.Divider />

                    <Text style={styles.subTitles}>
                        How to Locate Task
                    </Text>

                    <Text style={styles.paragraph}>
                        1. Tap on the "To-Do List" button located on the bottom of your screen.
                    </Text>

                    <Icon name='list' type='feather' color='#ec2929' size={30} marginTop={10} />

                    <Text style={styles.paragraph}>
                        2. Use the calendar strip at the top to look at your tasks for the day.
                    </Text>

                    <Text style={styles.paragraph}>
                        3. Still can't find your task? No worries! Use the "Search" function at the top right corner, and search using keywords!
                    </Text>

                    <Icon name='search' type='ionicons' color='#ec2929' size={30} marginTop={10} marginBottom={20} />

                    <Card.Divider />

                    <Text style={styles.subTitles}>
                        How to Edit Task / Look at Notes / Remove Task
                    </Text>

                    <Text style={styles.paragraph}>
                        1. In your To-Do List, locate the task you want to edit/ remove. Press on the menu button located on the side of the task.
                    </Text>

                    <Icon name='options-vertical' type='simple-line-icon' color='#ec2929' size={30} marginTop={10} />

                    <Text style={styles.paragraph}>
                        2. You will be given the options to edit or remove task.
                    </Text>

                    <Card.Divider />

                    <Text style={styles.subTitles}>
                        How to Get COMpanions
                    </Text>

                    <Text style={styles.paragraph}>
                        1. Tap on the "Shop" button located on the bottom of your screen.
                    </Text>

                    <Icon name='storefront' type='material' color='#ec2929' size={30} marginTop={10} />

                    <Text style={styles.paragraph}>
                        2. Each COMpanion requires 160 coins to adopt. Your first COMpanion is free! Simply press on "Adopt".
                    </Text>

                    <Card.Divider />

                    <Text style={styles.subTitles}>
                        How to Feed COMpanion
                    </Text>

                    <Text style={styles.paragraph}>
                        1. Purchase Food in the Shop.
                    </Text>

                    <Text style={styles.paragraph}>
                        2. Locate the "Food Inventory" at the Home Page.
                    </Text>

                    <View>
                        <TouchableOpacity
                            style={styles.roundButton}>
                            <Image style={styles.feedMenuIcon} source={require('../assets/food/bread.png')} />
                        </TouchableOpacity>
                    </View>
                </Card>

                <Card>
                    <Text style={styles.mainTitles}>
                        Acknowledgement Links
                    </Text>

                    <Card.Divider />

                    <Text style={styles.titles} onPress={() => Linking.openURL('https://ghostpixxells.itch.io/pixelfood')}>
                        Pixel Foods by ghostpixxells
                    </Text>

                    <Text style={styles.titles} onPress={() => Linking.openURL('https://pipoya.itch.io/free-popup-emotes-pack')}>
                        Popup Emotes by Pipoya
                    </Text>

                    <Text style={styles.titles} onPress={() => Linking.openURL('https://lisadikaprio.itch.io/living-room-background-500x500')}>
                        Living Room Background by LisadiKaprio
                    </Text>

                    <Text style={styles.titles} onPress={() => Linking.openURL('https://www.pngfind.com/mpng/whbwJb_collection-of-atsume-draw-neko-atsume-cats-hd/')}>
                        Cat Sprite
                    </Text>
                </Card>


                <Toast />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    mainTitles: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 20,
        color: '#3a3b3c',
        alignSelf: 'center'
    },
    subTitles: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 18,
        color: '#3a3b3c',
        marginHorizontal: 50,
        textAlign: 'center'
    },
    titles: {
        marginTop: 20,
        fontSize: 16,
        marginHorizontal: 50
    },
    paragraph: {
        marginTop: 10,
        fontSize: 16,
        marginHorizontal: 50,
        textAlign: 'justify'
    },
    roundButton: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#3f2832',
        borderColor: '#b86f50',
        borderWidth: 3,
        alignSelf: 'center'
    },
});
