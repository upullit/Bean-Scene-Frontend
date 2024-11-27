import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/authContext';
import CustomButton from '../CustomButton';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        setFeedback('');
        try {
            await login(username, password);
            setModalVisible(true); // Show success modal
        } catch (error) {
            setFeedback('Invalid username or password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {feedback ? <Text style={styles.error}>{feedback}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                id="Username"
                name="Username"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                id="Password"
                name="Password"
            />
            <CustomButton title="Login" onPress={handleLogin} />

            {/* Login Confirmation Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Login successful! Welcome back!</Text>
                        <TouchableOpacity style={styles.button} 
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Home');
                        }}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 300,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 16
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
        padding: 40,
        alignItems: "center",
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#43766C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
