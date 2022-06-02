import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'


import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { CagetoryItem } from '../../components/CategoryItem'
import { setFavorite, getFavorite } from '../../services/favoriete'
import { FavoritePost } from '../../components/FavoritePost'


export function Home() {

    const navigation = useNavigation()

    const [categories, setCategories] = useState([])
    const [favCategory, setFavCategory] = useState([])

    useEffect(() => {

        async function loadData() {

            const result = await api.get('/categories?populate=icon')
            const { data } = result.data
            setCategories(data)
        }
        loadData()

    }, [])

    useEffect(() => {

        async function myFavorite() {
            const response = await getFavorite()
            setFavCategory(response)
        }

        myFavorite()

    }, [])


    async function handleFavorite(id) {

        const response = await setFavorite(id)

        setFavCategory(response)
        // alert('categoria favoritada')
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>DevBlog</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Feather name='search' size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal={true}
                contentContainerStyle={{ padding: 12 }}
                showsHorizontalScrollIndicator={false}
                style={styles.category}
                data={categories}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <CagetoryItem
                    data={item.attributes}
                    favorite={() => handleFavorite(item.id)}
                />}
            />

            <View style={styles.main}>

                {
                    favCategory.length !== 0 && (
                        <FlatList
                            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
                            contentContainerStyle={{ paddingEnd: 18 }}
                            data={favCategory}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <FavoritePost data={item} />}
                        />
                    )
                }

                <Text style={[styles.title,
                { marginTop: favCategory.length > 0 ? 14 : 46 }]}>Conteúdos em alta</Text>
            </View>



        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232630'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24

    },
    name: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    category: {
        maxHeight: 115,
        backgroundColor: '#efefef',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9

    },
    main: {
        backgroundColor: '#fff',
        marginTop: -30,

        flex: 1

    },
    title: {
        fontSize: 21,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontWeight: 'bold',
        color: '#162133'


    }

});