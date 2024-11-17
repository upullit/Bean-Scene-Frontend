import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bean Scene Menu</Text>
            </View>

            {/* Wrapper div for the scrollable content */}
            <View style={styles.scrollableContent}>
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

            {/* Fixed position for the download button */}
            <DownloadPDFButton style={styles.downloadButton} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF4E4',
        position: 'relative', // To ensure the download button stays in position
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        flex: 1,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 16,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        color: '#76453B',
        marginTop: 4,
    },
    header: {
        flexDirection: 'row', // Arrange title and button in a row
        justifyContent: 'space-between', // Space out items: title in the center and button to the right
        alignItems: 'center', // Vertically align items
        marginBottom: 16,
    },
    scrollableContent: {
        maxHeight: 'calc(100vh - 200px)', // Adjust max height to fit screen size and make it scrollable
        overflowY: 'auto', // Enable vertical scrolling
        paddingHorizontal: 250,
    },
    downloadButton: {
        position: 'absolute',
        bottom: 20, // Adjust this value to position the button
        right: 20,  // Keeps it in the bottom right corner
        zIndex: 999, // Ensure it stays above other content
    },
});

export default MenuScreen;