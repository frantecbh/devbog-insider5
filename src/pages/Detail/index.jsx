import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Link, Image, TouchableOpacity, ScrollView, Share, Modal } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '../../services/api'

import { Feather, Entypo } from '@expo/vector-icons'
import LinkWeb from '../../components/LinkWeb'



export function Detail() {

    const route = useRoute()
    const id = route.params.id

    const [post, setPost] = useState({})
    const [links, setLinks] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    const [openLink, setOpenLink] = useState({})

    const navigation = useNavigation()


    useEffect(() => {

        async function getPost() {


            const response = await api.get(`/posts/${id}?populate=cover,category,Opcoes`)

            setPost(response.data.data)

            setLinks(response.data?.data?.attributes?.Opcoes)

        }

        getPost()

    }, [])

    useLayoutEffect(() => {

        navigation.setOptions({

            headerRight: () => (
                <TouchableOpacity onPress={handleShare}>
                    <Entypo name="share" size={25} color="#fff" />
                </TouchableOpacity>
            )

        })

    }, [navigation])

    async function handleShare() {
        try {

            const result = await Share.share({
                message: `
                    Confere este post: ${post?.attributes?.title}

                    ${post?.attributes?.description}

                    Eu encontrei no DevBlog
                `
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("ACTYVET TYPE")
                } else {
                    console.log("COMPARTILHADO COM SUCESSO")
                }

            } else if (result.action === Share.dismissedAction) {
                console.log("Modal Fechado")
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    function handleOnpenLink(link) {
        setModalVisible(true)
        setOpenLink(link)
    }



    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.cover} resizeMode='cover' source={{ uri: `http://192.168.0.15:1337${post?.attributes?.cover?.data?.attributes?.url}` }} />

            <Text style={styles.title}>{post?.attributes?.title}</Text>

            <ScrollView style={styles.content} showsHorizontalScrollIndicator={false}>


                <Text style={styles.description}>{post?.attributes?.description}</Text>


                {
                    links.length > 0 && (
                        <Text style={styles.subtitle}>Links</Text>
                    )

                }
                {
                    links.map(link => (
                        <TouchableOpacity
                            key={link.id}
                            style={styles.linkButon}
                            onPress={() => handleOnpenLink(link)}
                        >
                            <Feather name='link' color='#1e4687' size={14} />
                            <Text style={styles.linkText}>{link.name}</Text>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
            <Modal animationType='fade' visible={modalVisible} transparent={true}>
                <LinkWeb link={openLink?.url} titulo={openLink?.name} closeModal={() => setModalVisible(false)} />
            </Modal>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    cover: {
        width: '100%',
        height: 230
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 18,

        paddingHorizontal: 12
    },
    content: {
        paddingHorizontal: 12
    },
    description: {
        lineHeight: 20
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: 14,
        fontSize: 18,
        marginBottom: 6
    },
    linkButon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    linkText: {
        color: '#1e4687',
        marginLeft: 6,
        fontSize: 16


    }
});
