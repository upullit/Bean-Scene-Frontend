import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity } from "react-native";
import { deleteItem } from "../crud/menuitems";
import CustomButton from '../CustomButton.js';

const AdminMenuViewScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit confirmation modal

    // Function to show the confirmation modal for deletion
    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    // Function to hide the delete confirmation modal
    const hideDeleteModal = () => {
        setIsDeleteModalVisible(false);
    };

    // Function to show the edit confirmation modal
    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    // Function to hide the edit confirmation modal
    const hideEditModal = () => {
        setIsEditModalVisible(false);
    };

    // Function to hide the error modal
    const hideErrorModal = () => {
        setIsErrorModalVisible(false);
    };

    // Function to hide the success modal
    const hideSuccessModal = () => {
        setIsSuccessModalVisible(false);
        navigation.goBack();  // Go back after success
    };

    const handleDelete = async () => {
        try {
            await deleteItem(item._id);
            setIsDeleteModalVisible(false); // Hide the confirm modal
            setIsSuccessModalVisible(true); // Show success modal
        } catch (error) {
            console.error("Error deleting item:", error);
            setIsDeleteModalVisible(false); // Hide the confirm modal
            setIsErrorModalVisible(true); // Show error modal
        }
    };

    const handleEdit = () => {
        hideEditModal(); // Hide the confirmation modal
        navigation.navigate('AdminMenuEdit', { item }); // Navigate to the edit screen
    };

    return (
        <View style={styles.container}>
            {/* Displaying item details */}
            <Image source={item.image ? { uri: item.image } : require('../Media-TempData/Images/Menu/Breakfast/Acai.jpg')}
                style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}><b>Name: </b>{item.name}</Text>
            <Text style={styles.description}><b>Price: </b>{item.price}</Text>
            <Text style={styles.description}><b>Description: </b>{item.description}</Text>
            <Text style={styles.description}><b>Category: </b>{item.category}</Text>

            <View style={styles.actionButton}>
                {/* Trigger the modal for edit confirmation */}
                <CustomButton title="Edit" onPress={showEditModal} />
                {/* Trigger the modal for deletion */}
                <CustomButton title="Delete" onPress={showDeleteModal} />
            </View>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={isDeleteModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={hideDeleteModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm deletion</Text>
                        <Text style={styles.modalMessage}>Are you sure you want to delete this item?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={hideDeleteModal}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                visible={isSuccessModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={hideSuccessModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Success</Text>
                        <Text style={styles.modalMessage}>Item has been deleted successfully.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideSuccessModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Error Modal */}
            <Modal
                visible={isErrorModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={hideErrorModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Error</Text>
                        <Text style={styles.modalMessage}>An error occurred while deleting the item.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideErrorModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Edit Confirmation Modal */}
            <Modal
                visible={isEditModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={hideEditModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Edit</Text>
                        <Text style={styles.modalMessage}>Edit Item?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={hideEditModal}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                                <Text style={styles.modalButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        gap: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#43766C',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default AdminMenuViewScreen;