
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Feather } from '@expo/vector-icons'

import { WebView } from 'react-native-webview'

export default function LinkWeb({ link, titulo, closeModal }) {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Feather name='x' size={25} color='#fff' />
                <Text style={styles.name}>{titulo}</Text>
            </TouchableOpacity>

            <WebView source={{ uri: link }} />

        </>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 10,
        backgroundColor: '#232640',
        marginTop: 57,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold'
    }


})