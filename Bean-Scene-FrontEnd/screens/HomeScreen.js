import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useAuth } from '../context/authContext';
import CustomModal from '../CustomModal';

const HomeScreen = ({ navigation }) => {
    const { user, logout } = useAuth();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    // Lock the app orientation
    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            } catch (err) {
                console.warn("Orientation lock not supported:", err.message);
            }
        };
        lockOrientation();

        return () => {
            ScreenOrientation.unlockAsync(); // Reset orientation on unmount
        };
    }, []);

    useEffect(() => {
        console.log('User object in HomeScreen:', user); // Check what is being passed
    }, [user]);


    const handleLogout = async () => {
        await logout(); // Clear the user state
        setLogoutModalVisible(false); // Close the logout modal
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Bean Scene Ordering App</Text>
                <Text style={styles.text}>
                    Welcome, {user ? `${user.name} Role: ${user.role}` : 'Guest'}
                </Text>

                {/* Role-based navigation buttons */}
                {user?.role === 'Server' && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ServerOrder')}>
                            <Text style={styles.buttonText}>Server Ordering</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ticket')}>
                            <Text style={styles.buttonText}>Tickets</Text>
                        </TouchableOpacity>
                    </>
                )}

                {user?.role === 'Manager' && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ServerOrder')}>
                            <Text style={styles.buttonText}>Server Ordering</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ticket')}>
                            <Text style={styles.buttonText}>Tickets</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
                            <Text style={styles.buttonText}>Admin</Text>
                        </TouchableOpacity>
                        </>
                )}

                {user?.role === 'Chef' && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Kitchen')}>
                        <Text style={styles.buttonText}>Kitchen Ticket</Text>
                    </TouchableOpacity>
                )}

                {/* Accessible to all staff */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomerMenu')}>
                    <Text style={styles.buttonText}>Customer Menu</Text>
                </TouchableOpacity>                
                {!user && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                )}
                {!user && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStaff')}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                )}
                {/* Logout button */}
                {user && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setLogoutModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                )}

                {/* Logout Confirmation Modal */}
                <Modal
                    transparent={true}
                    visible={logoutModalVisible}
                    animationType="slide"
                    onRequestClose={() => setLogoutModalVisible(false)}>
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setLogoutModalVisible(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.confirmButton]}
                                    onPress={handleLogout}>
                                    <Text style={styles.buttonText}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        marginLeft: 200,
        marginRight: 200,
        marginBottom: 200,
    },
    title: {
        fontSize: 32,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#76453B',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#251605',
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        width: 400,
        backgroundColor: '#F8FAE5',
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5,
      },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#d9534f',
    },
    confirmButton: {
        backgroundColor: '#5cb85c',
    },
});

export default HomeScreen;
