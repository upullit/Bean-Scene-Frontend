import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Ensure this import is correct

const AdminScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter the DummyMenu based on the search query
    const searchMenu = DummyMenu
        .filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Full Menu</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search menu items..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <View style={styles.buttonRow}>
                <Button title="Beverages" onPress={() => filterMenu('Drinks')} />
                <Button title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                <Button title="Lunch" onPress={() => filterMenu('Lunch')} />
                <Button title="Dinner" onPress={() => filterMenu('Dinner')} />
                <Button title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
            </View>
            <FlatList
                data={searchMenu} // Use the filtered menu
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('AdminMenuView', { item })} // Pass the item data
                    >
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={4} // Display in a grid format
                columnWrapperStyle={styles.columnWrapper} // Add some styling for columns
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
        width: 250, // Adjust image size as needed
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
        justifyContent: 'space-between', // Adjust spacing between columns
    },
});

export default AdminScreen;