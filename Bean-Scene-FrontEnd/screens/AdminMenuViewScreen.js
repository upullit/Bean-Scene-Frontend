import React from "react";
import { Button, View, StyleSheet, Image, Text, Alert } from "react-native";
import { deleteItem } from "../crud/menuitems";
import CustomButton from '../CustomButton.js';

const AdminMenuViewScreen = ({ route, navigation }) => {
    const { item } = route.params;

    // Seperated alert from handle delete as alert does not work with async function

    const deleteMenuItem = () => {
        console.log("Delete button pressed, showing alert");
        Alert.alert(
            "Confirm deletion",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: handleDelete,
                },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async () => {
        try {
            await deleteItem(item._id);
            Alert.alert("Deleted", "Item has been deleted successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Error", "An error occurred while deleting the item");
        }
    };


    return (
        <View style={styles.container}>
            {/* takes the selected item and displays it
            ingredients need to be added */}
            <Image source={item.image ? { uri: item.image }
                : require('../Media-TempData/Images/Menu/Breakfast/Acai.jpg')}
            style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}><b>Name: </b>{item.name}</Text>
            <Text style={styles.description}><b>Price: </b>{item.price}</Text>
            <Text style={styles.description}><b>Description: </b>{item.description}</Text>
            <Text style={styles.description}><b>Category: </b>{item.category}</Text>
            <View style={styles.actionButton}>
                {/* takes item data to edit page */}
                <CustomButton title="Edit" onPress={() => navigation.navigate('AdminMenuEdit', { item })} /> 
                <CustomButton title="Delete" onPress={deleteMenuItem}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginVertical: 10,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
export default AdminMenuViewScreen;