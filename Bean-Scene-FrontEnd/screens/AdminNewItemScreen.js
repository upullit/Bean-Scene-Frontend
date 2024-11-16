import React from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import {createItem } from '../crud/menuitems.js'
import CustomButton from '../CustomButton.js';


const AdminNewItemScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [category, setCategory] = useState("");
    const [dietTags, setDietTags] = useState({
        gf: false,
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
        // Format data
        const newItem = {
            name,
            price: parseFloat(price),
            description,
            ingredients,
            category,
            tags: Object.keys(dietTags).filter(tag => dietTags[tag]), // Only selected tags
        };

        try {
            await createItem(newItem); // Call the createItem API function
            setModalContent({
                title: 'Success',
                message: 'Menu item created successfully',
            });
            setModalVisible(true); // Show success message
            navigation.goBack(); // Navigate back after successful creation
        } catch (error) {
            setModalContent({
                title: 'Error',
                message: 'Failed to create menu item',
            });
            setModalVisible(true); // Show error message
            console.error(error);
        }
    };

    return (
        //menu edit form
        <View style={styles.container} >
            <Text>New Dish</Text>
            {/*ingridents to be added*/}
            <View style={styles.column}>
                <Text style={styles.subheading}>Dish Name</Text>
                <TextInput
                    style={styles.textInputShort}
                />
                <Text style={styles.subheading}>Price</Text>
                <TextInput
                    style={styles.textInputShort}
                />
                <Text style={styles.subheading}>Description</Text>
                <TextInput
                    style={styles.textInputLong}
                />
                <Text style={styles.subheading}>Ingredients</Text>
                <TextInput
                    style={styles.textInputLong}
                />
            </View>
            <View style={styles.column}>
                {/*image insert and diet tags to be added*/}
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
                    placeholder={item.category}
                    style={styles.picker}
                >
                    <Picker.Item label="Breakfast" value="" />
                    <Picker.Item label="Lunch" value="" />
                    <Picker.Item label="Dinner" value="" />
                    <Picker.Item label="Cafe/Dessert" value="" />
                    <Picker.Item label="Beverage" value="" />
                </Picker>
                <CustomButton title="Save">Save</CustomButton>
            </View>
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
export default AdminNewItemScreen;