import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export async function getFavorite() {

    const data = await AsyncStorage.getItem('@DevBlog:favCategory')

    if (data !== null) {

        const response = await api.get(`/categories/${data}?fileds=name&populate=posts,posts.cover`)

        // const { data } = response.data

        return response.data?.data?.attributes?.posts?.data

    } else {
        return []
    }

}

export async function setFavorite(category) {

    await AsyncStorage.setItem('@DevBlog:favCategory', String(category))

    const response = await getFavorite()

    return response;

}
