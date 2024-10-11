import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = ({ navigation }) => {
    // Function to lock the orientation to landscape
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    useEffect(() => {
        lockOrientation(); // Lock the screen to landscape when the component is mounted
        
        // Optional: return to default orientation when unmounted
        return () => {
            ScreenOrientation.unlockAsync(); // Unlock the orientation on cleanup
        };
    }, []);

    return (
        <View>
            <Text>Hi this is the bean scene menu ordering app</Text>
            <Button title="Go to menu" onPress={() => navigation.navigate('Menu')} />
        </View>
    );
};

export default HomeScreen;