import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { deleteItem } from "../crud/menuitems";
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal';

const AdminMenuViewScreen = ({ route, navigation }) => {
    const { item, refreshMenu } = route.params;  // Get the refreshMenu function

    // State for modal visibility and content
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        confirmAction: null,
    });

    // Confirmation modal for deletion
    const showDeleteConfirmation = () => {
        setModalContent({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this item?",
            confirmAction: handleDelete,
        });
        setModalVisible(true);
    };

    // Handle the deletion of the item
    const handleDelete = async () => {
        try {
            await deleteItem(item._id); // Call the delete API function
            refreshMenu();  // Call refreshMenu to refresh the menu in AdminScreen
            setModalContent({
                title: 'Deleted',
                message: 'Item has been deleted successfully.',
                confirmAction: () => navigation.goBack(),
            });
            setModalVisible(true); // Show success modal
        } catch (error) {
            console.error("Error deleting item:", error);
            setModalContent({
                title: 'Error',
                message: 'An error occurred while deleting the item.',
                confirmAction: () => setModalVisible(false),
            });
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={item.imageUrl ? { uri: item.imageUrl } : require('../Images/Temp.jpg')}
                style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}><b>Name: </b>{item.name}</Text>
            <Text style={styles.description}><b>Price: </b>{item.price}</Text>
            <Text style={styles.description}><b>Description: </b>{item.description}</Text>
            <Text style={styles.description}><b>Category: </b>{item.category}</Text>
            <View style={styles.actionButton}>
                <CustomButton title="Edit" onPress={() => navigation.navigate('AdminMenuEdit', { item })} />
                <CustomButton title="Delete" onPress={showDeleteConfirmation} />
            </View>

            {/* Custom modal for confirmation and feedback */}
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={() => {
                    setModalVisible(false);
                    modalContent.confirmAction && modalContent.confirmAction();
                }}
                onCancel={() => setModalVisible(false)}
            />
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
