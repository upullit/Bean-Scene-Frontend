import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal';
import { updateMenuItem } from '../crud/menuitems.js';

const AdminMenuEditScreen = ({ route, navigation }) => {
    const { item } = route.params;

    // State for form fields
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price.toString());
    const [description, setDescription] = useState(item.description || '');
    const [ingredients, setIngredients] = useState(item.ingredients.join(', '));
    const [category, setCategory] = useState(item.category);
    const [isVegan, setIsVegan] = useState(item.isVegan);
    const [isVegetarian, setIsVegetarian] = useState(item.isVegetarian);
    const [imageUrl, setImageUrl] = useState(item.imageUrl);
    const [available, setAvailable] = useState(item.available);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    // Form submission handler
    const handleSave = async () => {
        const updatedItem = {
            name,
            price: parseFloat(price), // Convert price to a number
            description,
            ingredients: ingredients.split(',').map(ing => ing.trim()), // Convert to array
            category,
            isVegan,
            isVegetarian,
            available,
            imageUrl,
        };

        try {
            await updateMenuItem(item._id, updatedItem); // Call API to update
            setModalContent({
                title: 'Success',
                message: 'Dish updated successfully!',
            });
        } catch (error) {
            setModalContent({
                title: 'Error',
                message: 'Failed to update dish. Please try again.',
            });
        }
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Dish</Text>
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
                    keyboardType="numeric"
                    onChangeText={setPrice}
                />
                <Text style={styles.subheading}>Description</Text>
                <TextInput
                    style={styles.textInputLong}
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.subheading}>Ingredients</Text>
                <TextInput
                    style={styles.textInputLong}
                    value={ingredients}
                    onChangeText={setIngredients}
                />
            </View>

            <View style={styles.column}>
                <Text style={styles.subheading}>Image</Text>
                <TextInput
                    style={styles.textInputShort}
                    value={imageUrl}
                    onChangeText={setImageUrl}
                />

                <Text style={styles.subheading}>Category</Text>
                <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(value) => setCategory(value)}
                >
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Cafe/Dessert" value="Cafe/Dessert" />
                    <Picker.Item label="Beverage" value="Beverage" />
                </Picker>
                <Text style={styles.subheading}>Diet Tags</Text>
                <View style={styles.checkbox}>
                    <Checkbox
                        status={isVegan ? 'checked' : 'unchecked'}
                        onPress={() => setIsVegan(!isVegan)}
                    />
                    <Text style={styles.checkboxText}>Vegan</Text>
                </View>

                <View style={styles.checkbox}>
                    <Checkbox
                        status={isVegetarian ? 'checked' : 'unchecked'}
                        onPress={() => setIsVegetarian(!isVegetarian)}
                    />
                    <Text style={styles.checkboxText}>Vegetarian</Text>
                </View>
                <CustomButton title="Save" onPress={() => {
                    handleSave();
                    navigation.navigate('Home');
                }} />
            </View>

            {/* Custom Modal for displaying success or error message */}
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={() => setModalVisible(false)}
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
});
export default AdminMenuEditScreen;