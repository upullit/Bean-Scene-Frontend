import React, { useState } from "react";
import { Button, View, StyleSheet, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import CustomButton from '../CustomButton.js';

const AdminNewItemScreen = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSave = () => {
        // Show confirmation modal
        setModalVisible(true);
    };

    const confirmSave = () => {
        // Add logic for saving the item
        setModalVisible(false);
        console.log("Item saved successfully!");
        // Add any additional navigation or success handling here
    };

    return (
        <View style={styles.container}>
            <Text>New Dish</Text>
            <View style={styles.column}>
                <Text style={styles.subheading}>Dish Name</Text>
                <TextInput style={styles.textInputShort} />
                <Text style={styles.subheading}>Price</Text>
                <TextInput style={styles.textInputShort} />
                <Text style={styles.subheading}>Description</Text>
                <TextInput style={styles.textInputLong} />
                <Text style={styles.subheading}>Ingredients</Text>
                <TextInput style={styles.textInputLong} />
            </View>
            <View style={styles.column}>
                <Text style={styles.subheading}>Upload Image</Text>
                <View style={styles.insertImage}></View>
                <Text style={styles.subheading}>Diet Tags</Text>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                    />
                    <Text style={styles.checkboxText}>GF</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                    />
                    <Text style={styles.checkboxText}>Vegan</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                    />
                    <Text style={styles.checkboxText}>Vege</Text>
                </View>
                <Text style={styles.subheading}>Category</Text>
                <Picker style={styles.picker}>
                    <Picker.Item label="Breakfast" value="" />
                    <Picker.Item label="Lunch" value="" />
                    <Picker.Item label="Dinner" value="" />
                    <Picker.Item label="Cafe/Dessert" value="" />
                    <Picker.Item label="Beverage" value="" />
                </Picker>
                <CustomButton title="Save" onPress={handleSave}>Save</CustomButton>
            </View>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to save this item?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmSave}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // Existing styles remain here
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center"
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center"
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "#43766C",
        borderRadius: 5,
        alignItems: "center"
    },
    modalButtonText: {
        color: "white",
        fontSize: 16
    }
});

export default AdminNewItemScreen;