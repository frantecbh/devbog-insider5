
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes';

export default function App() {
    return (
        <>
            <Routes />
            <StatusBar backgroundColor='#232630' barStyle='light-content' />
        </>
    );
}


