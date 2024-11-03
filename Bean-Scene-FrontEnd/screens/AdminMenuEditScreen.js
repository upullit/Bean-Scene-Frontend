import React from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from 'react-native-paper';
import CustomButton from '../CustomButton.js';


const AdminMenuEditScreen = ({ route }) => {
    const { item } = route.params;
    const [checked, setChecked] = React.useState(false);

    return (
        //menu edit form
        <View style={styles.container} >
            <Text>Edit Dish</Text>
            {/*ingridents to be added*/}
            <View style={styles.column}>
                <Text style={styles.subheading}>Dish Name</Text>
                <TextInput
                    style={styles.textInputShort}
                    placeholder={item.title}
                />
                <Text style={styles.subheading}>Price</Text>
                <TextInput
                    style={styles.textInputShort}
                    placeholder={item.Price}
                />
                <Text style={styles.subheading}>Description</Text>
                <TextInput
                    style={styles.textInputLong}
                    placeholder={item.description}
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