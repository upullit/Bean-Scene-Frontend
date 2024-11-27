import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { deleteItem } from "../crud/menuitems";
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal';

const AdminMenuViewScreen = ({ route, navigation }) => {
    const { item } = route.params;

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

    // Atm if item is in a current ticket it will break ticket view
    // will do a search if it exists in a ticket before deleting in 1.1
    // Handle the deletion of the item
    const handleDelete = async () => {
        try {
            // Ensure that the item._id is passed as the correct ID
            await deleteItem(item._id);
            setModalContent({
                title: 'Deleted',
                message: 'Item has been deleted successfully.',
                confirmAction: () => navigation.navigate('Home')
            });
            setModalVisible(true);
        } catch (error) {
            setModalContent({
                title: 'Error',
                message: error.message,
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
            <Text style={styles.description}>Name: {item.name}</Text>
            <Text style={styles.description}>Price: {item.price}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.description}>Category: {item.category}</Text>
            <Text style={styles.description}>
                Ingredients: {item.ingredients.join(', ')}
            </Text>
            <View style={styles.tagsContainer}>
                {item.isVegan && <Text style={[styles.tag, styles.veganTag]}>Vegan</Text>}
                {item.isVegetarian && <Text style={[styles.tag, styles.vegetarianTag]}>Vegetarian</Text>}
            </View>
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
        fontSize: 20,
        marginVertical: 10,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    veganTag: {
        backgroundColor: '#DFF2BF',
        color: '#4F8A10', 
    },
    vegetarianTag: {
        backgroundColor: '#FFECB3',
        color: '#FFA000', 
    },
});

export default AdminMenuViewScreen;
