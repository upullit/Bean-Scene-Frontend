import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMenuItems } from '../crud/menuitems.js';
import CustomButton from '../CustomButton.js';

const AdminScreen = ({ navigation }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Refresh menu items every time the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchMenuItems();
        }, [])
    );

    // Fetch the menu items from the backend
    const fetchMenuItems = async () => {
        try {
            const items = await getMenuItems();
            console.log('Fetched Menu Items:', items); // Log fetched items to verify
            setMenuItems(items);
            setFilteredMenuItems(items);
        } catch (error) {
            Alert.alert('Error fetching menu items:', error);
            console.error('Error fetching menu items:', error);
        }
    };

    const filterMenu = (category) => {
        setSelectedCategory(category); // Set the category
    };

    // Function to show all items
    const showAllItems = () => {
        setSelectedCategory(null); // Reset the selected category
        setSearchQuery(''); // Clear the search query if you want to reset all filters
    };

    // Filter the menu based on the selected category and search query
    const filteredAndSearchedMenu = menuItems
    .filter(item => {
        // Filter by category if selected
        if (selectedCategory && item.category !== selectedCategory) {
            return false;
        }
        // Filter by search query
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
        // Create a collator for case and accent-insensitive sorting
        const collator = new Intl.Collator('en', { sensitivity: 'base' });
        return collator.compare(a.name, b.name);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Menu</Text>
            <View style={styles.buttonRow}>
                {/* Search Bar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <CustomButton title="New Item" style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('AdminNewItem')} />
            </View>

            {/* Menu filter */}
            <View style={styles.buttonRow}>
                <CustomButton title="All Items" onPress={showAllItems} />
                <CustomButton title="Beverages" onPress={() => filterMenu('Drinks')} />
                <CustomButton title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                <CustomButton title="Lunch" onPress={() => filterMenu('Lunch')} />
                <CustomButton title="Dinner" onPress={() => filterMenu('Dinner')} />
                <CustomButton title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
            </View>

            <View style={styles.flatContainer}>
                <FlatList
                    data={filteredAndSearchedMenu} // Use filteredAndSearchedMenu instead of searchMenu
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate('AdminMenuView', { item })} // Pass item data and refreshMenu function
                        >
                            <Image source={item.imageUrl ? { uri: item.imageUrl } : require('../Images/Temp.jpg')} style={styles.image} />
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => (item._id ? item._id.toString() : Math.random().toString())} // _id might be undefined fallback to random value
                    numColumns={4} // Displays items in a grid format
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        flex: 1,
    },
    item: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: 250,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    flatContainer: {
        borderWidth: 0.5,
        borderColor: '#F8FAE5',
        overflow: 'hidden',
        maxHeight: 500,
        width: '100%',
    },
});

export default AdminScreen;