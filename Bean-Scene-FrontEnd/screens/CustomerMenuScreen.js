import React from "react";
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import CustomButton from '../CustomButton.js';

const categorizedMenu = {
    Breakfast: DummyMenu.filter(item => item.category === 'Breakfast'),
    Lunch: DummyMenu.filter(item => item.category === 'Lunch'),
    Dinner: DummyMenu.filter(item => item.category === 'Dinner'),
    Desserts: DummyMenu.filter(item => item.category === 'Dessert'),
    Drinks: DummyMenu.filter(item => item.category === 'Drink'),
};

const MenuItem = ({ item }) => (
    <View style={styles.menuItem}>
        <View style={styles.details}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
    </View>
);

const Category = ({ title, items }) => (
    <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <FlatList
            data={items}
            renderItem={({ item }) => <MenuItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.menuList}
            scrollEnabled={false}
        />
    </View>
);

const exportMenuToPDF = async () => {
    //PDF export logic here
};

const CustomerMenuScreen = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for keyboard
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Offset for keyboard
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Menu</Text>
                <View style={styles.gridContainer}>
                    {Object.entries(categorizedMenu).map(([category, items]) => (
                        <Category key={category} title={category} items={items} />
                    ))}
                </View>
                <CustomButton title="Export Menu to PDF" onPress={exportMenuToPDF} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF4E4',
    },
    scrollContainer: {
        padding: 50,
        paddingBottom: 100,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryContainer: {
        width: '48%', 
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#FAF4E4',
        borderRadius: 5,
    },
    categoryTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    menuList: {
        padding: 2,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    details: {
        flex: 1,
        paddingRight: 10,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDescription: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#76453B',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', 
        marginBottom: 20, 
    },
});

export default CustomerMenuScreen;