import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = ({ navigation }) => {
    //holds app at landscape
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    useEffect(() => {
        lockOrientation(); 
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    return (
        <View>
            {/* temporary navigation buttons */}
            <View style={styles.container}>
            <Text style={styles.title}>Bean Scene Ordering App</Text>
                <Text style={styles.text}>Hi, this is the Bean Scene menu ordering app</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ServerOrder')}>
                    <Text style={styles.buttonText}>Server Ordering</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ticket')}>
                    <Text style={styles.buttonText}>Tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
                    <Text style={styles.buttonText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Kitchen')}>
                    <Text style={styles.buttonText}>Kitchen Ticket</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomerOrder')}>
                    <Text style={styles.buttonText}>Customer Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 200,
        marginBottom: 2000,
    },
    title: {
        fontSize: 32,
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF', 
        padding: 15, 
        marginVertical: 10, 
        borderRadius: 5, 
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 20, 
        textAlign: 'center', 
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20, 
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default HomeScreen;