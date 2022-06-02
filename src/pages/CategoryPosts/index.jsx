import React from 'react'
import { View, Text, StyleSheet } from 'react-native'



export function CatetoryPosts() {
    return (
        <View style={styles.container}>
            <Text>Posts de uma Catrgoria</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
