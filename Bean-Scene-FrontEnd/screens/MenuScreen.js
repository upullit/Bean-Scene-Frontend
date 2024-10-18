import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput, Image } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu';


const DOUBLE_TAP_DELAY = 300; // 300ms for double-tap detection

const Item = ({ title, price, image, onSelect }) => (
    <TouchableOpacity style={styles.item} onPress={onSelect}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title} - ${price.toFixed(2)}</Text>
    </TouchableOpacity>
);

const MenuScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [lastTap, setLastTap] = useState(null);
    const [tapTimeout, setTapTimeout] = useState(null);
    const [comment, setComment] = useState(''); // To store the custom comment
    const [filteredMenu, setFilteredMenu] = useState(DummyMenu); // State for filtered menu items

    const addToOrder = (item, price, comment) => {
        setOrder((prevOrder) => [...prevOrder, { item, price, comment }]);
        setTotalPrice((prevTotal) => prevTotal + price); 
        setComment(''); // Clear the input field after adding to the order
    };

    const clearOrder = () => {
        setOrder([]);
        setTotalPrice(0);
    };

    const handleItemPress = (item) => {
        const now = Date.now();

        if (tapTimeout) {
            clearTimeout(tapTimeout); // Clear the timeout for the single tap
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

    const filterMenu = (category) => {
        const filtered = DummyMenu.filter(item => item.category === category);
        setFilteredMenu(filtered);
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
                            <View key={index}>
                                <Text style={styles.orderItem}>
                                    {orderItem.item} - ${orderItem.price.toFixed(2)}
                                </Text>
                                {orderItem.comment ? (
                                    <Text style={styles.orderComment}> - {orderItem.comment}</Text> // Display the comment
                                ) : null}
                            </View>
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
                    <Button title="Beverages" onPress={() => filterMenu('Drinks')} />
                    <Button title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                    <Button title="Lunch" onPress={() => filterMenu('Lunch')} />
                    <Button title="Dinner" onPress={() => filterMenu('Dinner')} />
                    <Button title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
                </View>

                {selectedItem ? (
                    <View style={styles.detailsContainer}>
                        <Image source={selectedItem.image} style={styles.detailImage} />
                        <Text style={styles.detailsTitle}>{selectedItem.title}</Text>
                        <Text style={styles.detailsText}>Price: ${selectedItem.price.toFixed(2)}</Text>
                        <Text style={styles.detailsText}>Description: {selectedItem.description}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Add a comment or special request"
                            value={comment}
                            onChangeText={setComment}
                        />
                        <View style={styles.buttonRow}>
                            <Button title="Back" onPress={goBackToList} />
                            <Button
                                title="Add to Order"
                                onPress={() => addToOrder(selectedItem.title, selectedItem.price, comment)} // Pass the comment
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.flatContainer}>
                        <FlatList
                            data={filteredMenu}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
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
        padding: 20,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 600,
        width: '100%',
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    detailsText: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    image: {
        width: 50, // Adjust the width as needed
        height: 50, // Adjust the height as needed
        marginRight: 10, // Space between the image and text
        borderRadius: 5, // Optional: round the image corners
    },
    detailImage: {
        width: 200, // Adjust the width as needed
        height: 120, // Adjust the height as needed
        marginRight: 10, // Space between the image and text
        borderRadius: 5, // Optional: round the image corners
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default MenuScreen;