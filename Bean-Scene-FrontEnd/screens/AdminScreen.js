import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import CustomButton from '../CustomButton.js';

const AdminScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter the Menu based on the search query
    const searchMenu = DummyMenu
        .filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));

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
                <CustomButton title="New Item" onPress={() => navigation.navigate('AdminNewItemScreen')}/>
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
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
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