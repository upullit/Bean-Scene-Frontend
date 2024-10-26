import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
// import { createItem, getItems, getSingleItem, updateMenuItem, deleteItem } from './crud';

// itteration to cycle or getItems();
const DummyMenu = [
    { id: '1', title: 'Pancakes ', price: 12.00, description: 'Fluffy pancakes served with maple syrup and fresh berries.'},
    { id: '2', title: 'Item 2', price: 15, description: 'Description for Item 2' },
    { id: '3', title: 'Item 3', price: 7, description: 'Description for Item 3' },
    { id: '4', title: 'Item 4', price: 12, description: 'Description for Item 4' },
    { id: '5', title: 'Item 5', price: 9, description: 'Description for Item 5' },
    { id: '6', title: 'Item 6', price: 20, description: 'Description for Item 6' },
    { id: '7', title: 'Item 7', price: 5, description: 'Description for Item 7' },
    { id: '8', title: 'Item 8', price: 25, description: 'Description for Item 8' },
    { id: '9', title: 'Item 9', price: 8, description: 'Description for Item 9' },
    { id: '10', title: 'Item 10', price: 30, description: 'Description for Item 10' },
];

const DOUBLE_TAP_DELAY = 300; // 300ms for double-tap detection

const Item = ({ title, price, onSelect }) => (
    <TouchableOpacity style={styles.item} onPress={onSelect}>
        <Text style={styles.title}>{title} - ${price.toFixed(2)}</Text>
    </TouchableOpacity>
);

const MenuScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [lastTap, setLastTap] = useState(null);
    const [tapTimeout, setTapTimeout] = useState(null);

    const addToOrder = (item, price) => {
        setOrder((prevOrder) => [...prevOrder, { item, price }]);
        setTotalPrice((prevTotal) => prevTotal + price);
    };

    const clearOrder = () => {
        setOrder([]);
        setTotalPrice(0);
    };

    const handleItemPress = (item) => {
        const now = Date.now();

        if (tapTimeout) {
            clearTimeout(tapTimeout); // If a second tap happens, clear the timeout for the single tap
            setTapTimeout(null);
        }

        if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
            // Double tap detected - show item details
            setSelectedItem(item);
            setLastTap(null); // Reset lastTap to prevent further double taps
        } else {
            // Start a timeout for single tap
            const timeoutId = setTimeout(() => {
                // Single tap action - add item to the order
                addToOrder(item.title, item.price);
            }, DOUBLE_TAP_DELAY);

            setTapTimeout(timeoutId); // Store the timeout ID to cancel if double tap occurs
            setLastTap(now); // Update lastTap to track the first tap
        }
    };

    const goBackToList = () => {
        setSelectedItem(null); // Clear selected item to return to list
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.buttonRow}>
                    <Button title="New Ticket" />
                    <Button title="View Tickets" onPress={() => navigation.navigate('Ticket')} />
                    <Button title="Change Table" />
                    <Button title="Cancel Ticket" onPress={clearOrder} />
                </View>
                <View style={styles.order}>
                    <Text style={styles.orderTitle}>Order Details:</Text>
                    {order.length === 0 ? (
                        <Text>No items in order</Text>
                    ) : (
                        order.map((orderItem, index) => (
                            <Text key={index} style={styles.orderItem}>
                                {orderItem.item} - ${orderItem.price.toFixed(2)}
                            </Text>
                        ))
                    )}
                </View>
                <View style={styles.totalContainer}>
                <Text style={styles.totalPrice}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                <Button title="Go to order screen" onPress={() => navigation.navigate('Order')} />
                <View style={styles.buttonRow}>
                    <Button title="Cash" />
                    <Button title="Card" />
                    <Button title="Split" />
                    <Button title="Refund" />
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.buttonRow}>
                    <Button title="Beverages" />
                    <Button title="Breakfast" />
                    <Button title="Lunch" />
                    <Button title="Dinner" />
                    <Button title="Cafe/Dessert" />
                </View>

                {selectedItem ? (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsTitle}>{selectedItem.title}</Text>
                        <Text>Price: ${selectedItem.price.toFixed(2)}</Text>
                        <Text>Description: {selectedItem.description}</Text>
                        <Button title="Back" onPress={goBackToList} />
                    </View>
                ) : (
                    <View style={styles.flatContainer}>
                        <FlatList
                            data={DummyMenu}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.title}
                                    price={item.price}
                                    onSelect={() => handleItemPress(item)}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        height: '100%',
    },
    column: {
        flex: 1,
        padding: 10,
        height: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    flatContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 600,
        width: '100%',
    },
    order: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 450,
        width: '100%',
        padding: 10,
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        fontSize: 16,
        marginVertical: 5,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 50,
        width: '100%',
        padding: 10,
    },
    detailsContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        padding: 20,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default MenuScreen;