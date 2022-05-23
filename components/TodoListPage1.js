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
        marginTop: 16,
        width: 100,
        borderColor: '#000',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 5
    }
})