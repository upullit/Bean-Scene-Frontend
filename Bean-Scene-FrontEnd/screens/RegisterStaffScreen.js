import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useAuth } from '../context/authContext';
import CustomButton from '../CustomButton';

const RegisterStaffScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { login } = useAuth();

    const registerStaff = async () => {
        try {
            const response = await fetch('https://api.finch.dev.thickets.onl/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role, name }),
            });

            const data = await response.json();

            if (response.ok) {
                // Automatically log in the user after successful registration
                await login(username, password);
                setModalVisible(true); // Show confirmation modal
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error registering new Staff Member');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register New Staff Member</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} 
                onChangeText={setUsername} id="Username" name="Username"/>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry 
                value={password} onChangeText={setPassword} id="Password" name="Password" />
            <Text style={styles.label}>Select Role:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={role}
                    onValueChange={(itemValue) => setRole(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Role" value="" />
                    <Picker.Item label="Manager" value="Manager" />
                    <Picker.Item label="Chef" value="Chef" />
                    <Picker.Item label="Server" value="Server" />
                </Picker>
            </View>
            <TextInput style={styles.input} placeholder="Name" 
                value={name} onChangeText={setName} id="Name" name="Name" />
            <CustomButton title="Register" onPress={registerStaff} />
            {message ? <Text style={styles.message}>{message}</Text> : null}

            {/* Confirmation Modal */}
            <Modal transparent={true} visible={modalVisible} animationType="slide" 
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Registration successful! Welcome, {name}!
                        </Text>
                        <CustomButton
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
    container: { 
        flex: 1, 
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 200,
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
        borderRadius: 4 
    },
    message: { 
        marginTop: 16, 
        color: 'red' 
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray',
        marginBottom: 16,
    },
    picker: { 
        height: 50, 
        width: '100%' 
    },
    message: { 
        marginTop: 16, 
        color: 'red' 
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default RegisterStaffScreen;
