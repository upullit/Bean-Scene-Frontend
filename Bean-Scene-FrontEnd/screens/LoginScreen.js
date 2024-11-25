import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useAuth } from '../context/authContext';

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
            <Button title="Login" onPress={handleLogin} />

            {/* Login Confirmation Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Login successful! Welcome back!</Text>
                        <Button
                            title="Go to Home"
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('Home');
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 5 },
    error: { color: 'red', marginBottom: 16 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: { fontSize: 18, marginBottom: 10 },
});

export default LoginScreen;
