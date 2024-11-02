import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Image } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu

//displays each menu item
const Item = ({ title, price, image, onSelect, onAddToOrder }) => (
    <View style={styles.menuItem}>
        <View style={styles.itemContent}>
            <View>
                <Text style={styles.dishTitle}>{title} - ${price.toFixed(2)}</Text>
            </View>
            <View>
                <Button title="View Details" onPress={onSelect} />
                <Button title="Add to Order" onPress={onAddToOrder} />
            </View>
            <Image source={image} style={styles.listImage} />
        </View>
    </View>
);

const ServerOrderScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState(''); // To store the custom comment
    const [filteredMenu, setFilteredMenu] = useState(DummyMenu); // State for filtered menu items
    const [tickets, setTickets] = useState([]);

    //adds selected item to order preview
    const addToOrder = (item, price, comment) => {
        setOrder((prevOrder) => [...prevOrder, { item, price, comment }]);
        setTotalPrice((prevTotal) => prevTotal + price);
        setComment(''); // Clear the input field after adding to the order
    };

    //clears everything in current order preview
    const clearOrder = () => {
        setOrder([]);
        setTotalPrice(0);
    };

    //turns order into ticket - wip
    const createNewTicket = () => {
        if (order.length > 0) {
            setTickets((prevTickets) => [...prevTickets, order]); // Add current order to tickets
            clearOrder(); // Clear the current order to start a new one
        }
    };

    //returns back to menu list
    const goBackToList = () => {
        setSelectedItem(null); // remove selected item to return to list
    };

    //filters menu based on category
    const filterMenu = (category) => {
        const filtered = DummyMenu.filter(item => item.category === category);
        setFilteredMenu(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                {/* ticket management */}
                <View style={styles.buttonRow}>
                    <Button title="New Ticket" />
                    <Button title="View Tickets" onPress={() => navigation.navigate('Ticket', { tickets })} />
                    <Button title="Change Table" />
                    <Button title="Clear Order - remove later" onPress={clearOrder} />
                </View>
                {/* shows menu list and details view */}
                <View style={styles.orderContainer}>
                    <Text style={styles.orderTitle}>Order Details:</Text>
                    {order.length === 0 ? (
                        <Text>No items in order</Text>
                    ) : (
                        order.map((orderItem, index) => (
                            <View key={index}>
                                <View style={styles.orderItemRow}>
                                    <Text style={styles.orderItem}>
                                        {orderItem.item} - ${orderItem.price.toFixed(2)}
                                    </Text>
                                    <View style={styles.actionButtons}>
                                        {/* edit select item function will be called here */}
                                        <Button title="Edit" />
                                        {/* delete item function will be called here */}
                                        <Button title="Delete" />
                                    </View>
                                </View>
                                {/* adds order comment below item */}
                                <Text>
                                    {orderItem.comment ? (
                                        <Text style={styles.orderComment}> - {orderItem.comment}</Text>
                                    ) : null}</Text>
                            </View>
                        ))
                    )}
                </View>
                <View style={styles.totalContainer}>
                    {/* total price is show with 2dcp */}
                    <Text style={styles.totalPrice}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                {/* processes "payment" and creates ticket */}
                <View style={styles.buttonRow}>
                    <Button title="Cash" onPress={createNewTicket} />
                    <Button title="Card" onPress={createNewTicket} />
                    <Button title="Split" onPress={createNewTicket} />
                    <Button title="Refund" />
                </View>
            </View>
            <View style={styles.column}>
                {/*menu filter*/}
                <View style={styles.buttonRow}>
                    <Button title="Beverages" onPress={() => filterMenu('Drinks')} />
                    <Button title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                    <Button title="Lunch" onPress={() => filterMenu('Lunch')} />
                    <Button title="Dinner" onPress={() => filterMenu('Dinner')} />
                    <Button title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
                </View>
                {/* shows menu list and details view */}
                {selectedItem ? (
                    <View style={styles.detailsContainer}>
                        <Image source={selectedItem.image} style={styles.detailImage} />
                        <Text style={styles.detailsTitle}>{selectedItem.title}</Text>
                        <Text style={styles.detailsText}>Price: ${selectedItem.price.toFixed(2)}</Text>
                        <Text style={styles.detailsText}>Description: {selectedItem.description}</Text>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment or special request"
                            value={comment}
                            onChangeText={setComment}
                        />
                        <View style={styles.buttonRow}>
                            {/* navigates back to list */}
                            <Button title="Back" onPress={goBackToList} />
                            <Button
                                title="Add to Order"
                                onPress={() => addToOrder(selectedItem.title, selectedItem.price, comment)} // Pass the comment to the order
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
    orderComment: {
        fontSize: 18,
    },
    orderItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
    },
    orderItem: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    dishTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    orderContainer: {
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
    commentInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    listImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    detailImage: {
        width: 200,
        height: 120,
        marginRight: 10,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
    },
});


export default ServerOrderScreen;