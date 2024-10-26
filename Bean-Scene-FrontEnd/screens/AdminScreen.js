import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu'; // Ensure this import is correct

const AdminScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Full Menu</Text>
            <FlatList
                data={DummyMenu} // Use the entire DummyMenu array
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
    },
    columnWrapper: {
        justifyContent: 'space-between', // Adjust spacing between columns
    },
});

export default AdminScreen;