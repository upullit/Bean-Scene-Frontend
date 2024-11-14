import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, ScrollView } from 'react-native';
import DownloadPDFButton from '../DownloadPDFButton';

const MenuScreen = () => {
    const [menuItemsByCategory, setMenuItemsByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/menuitems'); // Adjust URL if deployed
                const data = await response.json();

                // Group items by category
                const groupedItems = data.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                }, {});

                setMenuItemsByCategory(groupedItems);
                setLoading(false);
            } catch (error) {
                setError(true); // Show error modal
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Bean Scene Menu</Text>
            <DownloadPDFButton />

            {/* Render menu items by category */}
            {Object.keys(menuItemsByCategory).map((category) => (
                <View key={category}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    <FlatList
                        data={menuItemsByCategory[category]}
                        keyExtractor={(item) => item._id} // Assuming MongoDB ID as unique key
                        renderItem={({ item }) => (
                            <View style={styles.menuItem}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        )}
                    />
                </View>
            ))}

            {/* Error Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={error}
                onRequestClose={() => setError(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Failed to load menu items. Please try again later.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setError(false)}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF4E4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    menuItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        color: '#76453B',
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#43766C',
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MenuScreen;
