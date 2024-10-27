import React from "react";
import { Button, View, StyleSheet, Image, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const AdminMenuEditScreen = ({ route, }) => {

    const { item } = route.params; // Destructure the item from route parameters


    return (
        <View style={styles.container} >
            <View style={styles.column}>
                <Text>Dish Name</Text>
                <TextInput
                    style={styles.searchBar}
                    placeholder={item.title}
                />
                <Text>Price</Text>
                <TextInput
                    style={styles.searchBar}
                    placeholder={item.Price}
                />
                <Text>Description</Text>
                <TextInput
                    style={styles.searchBar}
                    placeholder={item.description}
                />
                <Button title="Save">Save</Button>
            </View>
            <View style={styles.column}>
            <Text>Category</Text>
                <Picker
                    placeholder={item.category}
                    style={styles.picker}
                >
                    <Picker.Item label="Breakfast" value="" />
                    <Picker.Item label="Lunch" value="" />
                    <Picker.Item label="Dinner" value="" />
                    <Picker.Item label="Beverage" value="" />
                </Picker>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
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
        padding: 10,
        height: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});
export default AdminMenuEditScreen;