import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
        <View styles={styles.container}>
            <Text>Hi this is the bean scene menu ordering app</Text>
            <Button styles={styles.button} title="Ordering" onPress={() => navigation.navigate('Menu')} />
            <Button styles={styles.button}  title="Tickets" onPress={() => navigation.navigate('Ticket')} />
            <Button styles={styles.button} title="Admin" onPress={() => navigation.navigate('Admin')}/>    
            <Button title="Cooks" onPress={() => navigation.navigate('Kitchen')}/>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        margin: 300,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        paddingHorizontal: 20,
        width: '80%',
        fontSize: 16,
    },
});