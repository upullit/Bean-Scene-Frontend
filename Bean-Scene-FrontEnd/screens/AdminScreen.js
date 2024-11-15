import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import { getMenuItems } from '../crud/menuitems.js';
import CustomButton from '../CustomComponents/CustomButton.js';

const AdminScreen = ({ navigation }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch menu items when the component mounts
    useEffect(() => {
        async function fetchMenuItems() {
            try {
                const items = await getMenuItems();
                console.log('Fetched Menu Items:', items); // Log fetched items to verify
                setMenuItems(items);
                setFilteredMenuItems(items);
            } catch (error) {
                Alert.alert('Error fetching menu items:', error);
                console.error('Error fetching menu items:', error);
            }
        }
        fetchMenuItems();
    }, []);

    const filterMenu = (category) => {
        const filteredItems = menuItems.filter(item => item.category === category);
        setFilteredMenuItems(filteredItems);
    };

    // Filter the Menu based on the search query
    const searchMenu = menuItems
        .filter(item =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Text style={styles.title}>Manage Menu</Text>
                {/*Search Bar - the search is a bit weird sometimes*/}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <CustomButton title="New Item" onPress={() => navigation.navigate('AdminNewItem')}/>
            </View>
            {/*Menu filter
            doesnt properly work atm
            */}
            <View style={styles.buttonRow}>
                <CustomButton title="Beverages" onPress={() => filterMenu('Drinks')} />
                <CustomButton title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                <CustomButton title="Lunch" onPress={() => filterMenu('Lunch')} />
                <CustomButton title="Dinner" onPress={() => filterMenu('Dinner')} />
                <CustomButton title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
            </View>
            <FlatList
                data={searchMenu} // currently using menu filter for search
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('AdminMenuView', { item })} // takes item data to view page
                    >
                        <Image source={item.image ? { uri: item.image }
                            : require('../Media-TempData/Images/Menu/Breakfast/Acai.jpg')}
                            style={styles.image} />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => (item._id ? item._id.toString()
                    // _id might be undefined fallback to random value if does not exist
                    : Math.random().toString())}
                numColumns={4} // displays items in a grid format
                columnWrapperStyle={styles.columnWrapper}
            />
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
        marginTop: 10,
        width: '100%',
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
});

export default AdminScreen;