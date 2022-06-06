
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'


import { useNavigation } from '@react-navigation/native'

export function CagetoryItem({ data, favorite }) {

    const navigation = useNavigation()

    function handleNavigate() {
        navigation.navigate('Category', { id: data.id, title: data.name })
    }

    return (
        <TouchableOpacity
            onPress={handleNavigate}
            onLongPress={favorite}
            style={styles.container}
            activeOpacity={0.9}
        >

            <Image
                style={styles.icon}
                source={{ uri: `http://192.168.0.15:1337${data?.icon?.data?.attributes?.url}` }} />
            <Text style={styles.name}>{data.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFF',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    icon: {
        height: 40,
        width: 40
    }

})