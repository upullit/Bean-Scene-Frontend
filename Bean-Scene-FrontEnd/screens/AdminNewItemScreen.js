import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import { createItem } from '../crud/menuitems.js';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal.js'; // Import CustomModal

const AdminNewItemScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [category, setCategory] = useState("");
    const [dietTags, setDietTags] = useState({
        vegan: false,
        vege: false,
    });
    const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
    const [modalContent, setModalContent] = useState({ title: '', message: '' }); // Modal content

    // Toggle diet tags
    const toggleDietTag = (tag) => {
        setDietTags((prevTags) => ({
            ...prevTags,
            [tag]: !prevTags[tag],
        }));
    };

    // Form submission handler
    const handleSubmit = async () => {
        const ingredientsArray = ingredients.split(',').map((item) => item.trim()); // Convert ingredients to an array
        const newItem = {
            name,
            price: parseFloat(price),
            description,
            ingredients: ingredientsArray,
            available: true,
            category,
            tags: Object.keys(dietTags).filter((tag) => dietTags[tag]), // Only selected tags
        };

        try {
            await createItem(newItem); // Call the createItem API function
            setModalContent({
                title: 'Success',
                message: 'Menu item created successfully',
            });
            setModalVisible(true); // Show success modal
        } catch (error) {
            setModalContent({
                title: 'Error',
                message: 'Failed to create menu item',
            });
            setModalVisible(true); // Show error modal
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>New Dish</Text>
            <View style={styles.column}>
                <Text style={styles.subheading}>Dish Name</Text>
                <TextInput
                    style={styles.textInputShort}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.subheading}>Price</Text>
                <TextInput
                    style={styles.textInputShort}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                <Text style={styles.subheading}>Description</Text>
                <TextInput
                    style={styles.textInputLong}
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.subheading}>Ingredients (comma-separated)</Text>
                <TextInput
                    style={styles.textInputLong}
                    value={ingredients}
                    onChangeText={setIngredients}
                />
            </View>
            <View style={styles.column}>
                <Text style={styles.subheading}>Category</Text>
                <Picker
                    selectedValue={category}
                    onValueChange={setCategory}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Category" value="" />
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Cafe/Dessert" value="Cafe/Dessert" />
                    <Picker.Item label="Beverage" value="Beverage" />
                </Picker>
                <Text style={styles.subheading}>Diet Tags</Text>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={dietTags.vegan ? 'checked' : 'unchecked'}
                        onPress={() => toggleDietTag('vegan')}
                    />
                    <Text style={styles.checkboxText}>Vegan</Text>
                </View>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={dietTags.vege ? 'checked' : 'unchecked'}
                        onPress={() => toggleDietTag('vege')}
                    />
                    <Text style={styles.checkboxText}>Vege</Text>
                </View>
                <CustomButton title="Save" onPress={handleSubmit} />
            </View>

            {/* Modal for success or error messages */}
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={() => {
                    setModalVisible(false);
                    if (modalContent.title === 'Success') {
                        navigation.goBack(); // Navigate back on success
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInputShort: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textInputLong: {
        height: 110,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
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
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxText: {
        fontSize: 18,
    },
    subheading: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default AdminNewItemScreen;