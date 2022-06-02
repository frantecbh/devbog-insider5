import React from 'react';



import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home';
import { Detail } from '../pages/Detail';
import { CatetoryPosts } from '../pages/CategoryPosts';
import { Search } from '../pages/Search';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator>
            <Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name='Detail'
                component={Detail}
                options={{
                    title: 'Detalhes',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }

                }}
            />
            <Screen
                name='Category'
                component={CatetoryPosts}
                options={{
                    title: 'Category',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }

                }}

            />
            <Screen
                name='Search'
                component={Search}
                options={{
                    title: 'Procurando algo?',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }

                }}
            />
        </Navigator>
    );
}