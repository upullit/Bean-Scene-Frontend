import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import DownloadPDFButton from '../DownloadPDFButton';

const MenuScreen = () => {
    const [menuItemsByCategory, setMenuItemsByCategory] = useState({});
    const [loading, setLoading] = useState(true);

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
                Alert.alert('Error', 'Failed to load menu items');
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
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
        </View>
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
});

export default MenuScreen;
