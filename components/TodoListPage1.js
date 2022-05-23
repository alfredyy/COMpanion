import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TodoItem({item}) {
    return (
        <View>
            <Text style={styles.item}>{item.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        width: 360,
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})