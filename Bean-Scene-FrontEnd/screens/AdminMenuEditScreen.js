import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal';  // Import your custom modal component

const AdminMenuEditScreen = ({ route }) => {
    const { item } = route.params;
    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
    const [modalContent, setModalContent] = useState({ title: '', message: '' }); // Modal content

    // Form submission handler
    const handleSave = () => {
        // Update logic here, e.g., send edited item to the server or update local state
        setModalContent({
            title: 'Success',
            message: 'Dish updated successfully!',
        });
        setModalVisible(true); // Show success modal
    };

    return (
        <View style={styles.container}>
            <Text>Edit Dish</Text>
            <View style={styles.column}>
                <Text style={styles.subheading}>Dish Name</Text>
                <TextInput
                    style={styles.textInputShort}
                    defaultValue={item.title}
                />
                <Text style={styles.subheading}>Price</Text>
                <TextInput
                    style={styles.textInputShort}
                    defaultValue={item.Price}
                    keyboardType="numeric"
                />
                <Text style={styles.subheading}>Description</Text>
                <TextInput
                    style={styles.textInputLong}
                    defaultValue={item.description}
                />
                <Text style={styles.subheading}>Ingredients</Text>
                <TextInput
                    style={styles.textInputLong}
                />
            </View>

            <View style={styles.column}>
                <Text style={styles.subheading}>Upload Image</Text>
                <View style={styles.insertImage}></View>

                <Text style={styles.subheading}>Diet Tags</Text>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.checkboxText}>GF</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.checkboxText}>Vegan</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.checkboxText}>Vege</Text>
                </View>

                <Text style={styles.subheading}>Category</Text>
                <Picker
                    selectedValue={item.category}
                    style={styles.picker}
                >
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Cafe/Dessert" value="Cafe/Dessert" />
                    <Picker.Item label="Beverage" value="Beverage" />
                </Picker>

                <CustomButton title="Save" onPress={handleSave} />
            </View>

            {/* Custom Modal for displaying success message */}
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={() => setModalVisible(false)} // Close the modal on confirm
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInputShort: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 2,
    },
    textInputLong: {
        height: 110,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 2,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        height: '100%',
    },
    column: {
        flex: 1,
        padding: 30,
        height: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        padding: 8,
        width: '100%',
    },
    checkboxText: {
        fontSize: 18,
    },
    subheading: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 20,
    },
    insertImage: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        height: 180,
        width: '80%',
        padding: 10,
    },
});
export default AdminMenuEditScreen;