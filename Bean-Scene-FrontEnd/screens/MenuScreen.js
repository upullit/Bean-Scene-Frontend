import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput, Image } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu';


const Item = ({ title, price, image, onSelect, onAddToOrder }) => (
    <View style={styles.item}>
        <Image source={image} style={styles.image} />
        <View style={styles.itemContent}>
            <Text style={styles.title}>{title} - ${price.toFixed(2)}</Text>
            <View style={styles.buttonRowRight}>
                <Button title="View Details" onPress={onSelect} />
                <Button title="Add to Order" onPress={onAddToOrder} />
            </View>
        </View>
    </View>
);

const MenuScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
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
    const createNewTicket = () => {
        if (order.length > 0) {
            setTickets((prevTickets) => [...prevTickets, order]); // Add current order to tickets
            clearOrder(); // Clear the current order to start a new one
        }
    };
    const [tickets, setTickets] = useState([]);


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
                    <Button title="New Ticket"/>
                    <Button title="View Tickets" onPress={() => navigation.navigate('Ticket', { tickets })} />
                    <Button title="Change Table" />
                    <Button title="Clear Order - remove later" onPress={clearOrder} />
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
                <View style={styles.buttonRow}>
                    <Button title="Cash" onPress={createNewTicket}/>
                    <Button title="Card" onPress={createNewTicket}/>
                    <Button title="Split" onPress={createNewTicket} />
                    <Button title="Refund"/>
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
                                    onSelect={() => setSelectedItem(item)} // Show details when "View Details" is pressed
                                    onAddToOrder={() => addToOrder(item.title, item.price)} // Add item to order when "Add to Order" is pressed
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
        flexDirection: 'row', // Horizontal layout for image and item details
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    itemContent: {
        flex: 1, // Takes up the remaining space next to the image
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between title/price and buttons
        alignItems: 'center',
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