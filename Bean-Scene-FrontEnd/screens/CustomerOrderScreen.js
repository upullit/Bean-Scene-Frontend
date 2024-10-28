import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Image } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import { getMenuItems } from '../crud/menuitems.js';
import { createTicket } from '../crud/ticket.js';

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

const CustomerOrderScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState(''); // so store the comment
    const [menuItems, setMenuItems] = useState([]);
    // const [filteredMenu, setFilteredMenu] = useState(DummyMenu); // state for filtered menu items
    const [tickets, setTickets] = useState([]);

    // Fetch the menu items from database calling the function
    useEffect(() => {
        const fetchMenuItems = async () => {
            const items = await getMenuItems(); // Fetch items using API function
            setMenuItems(items); // Set fetched items to state
        };
        fetchMenuItems();
    }, []);

    //adds selected item to order preview
    const addToOrder = (item, comment) => {
        const price = Number(item.price);
        const title = item.name;
        setOrder((prevOrder) => [...prevOrder, { menuItemId: item._id, title, comment, price }]);
        setTotalPrice((prevTotal) => prevTotal + price);
        setComment(''); // Clear the input field after adding to the order
    };

    //clears everything in current order preview
    const clearOrder = () => {
        setOrder([]);
        setTotalPrice(0);
    };

    //turns order into ticket
    const createNewTicket = async (paymentMethod) => {
        if (order.length > 0) {
            // Prepare the new ticket object with required fieldsw
            const newTicket = {
                items: order.map((orderItem) => ({
                    menuItem: orderItem.menuItemId, // Ensure this is a valid MenuItem ID
                    quantity: orderItem.quantity || 1, // Default quantity to 1 if not specified
                    specialInstructions: orderItem.comment || '' // Add any special instructions or default to an empty string
                })),
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                CustomerId: "60b8b22d7b9e4b00156a5c3b" // Replace with a valid Customer ID if needed
            };
    
            try {
                // Call the createTicket function to save the ticket to the database
                const savedTicket = await createTicket(newTicket);
                // Update local state with the new ticket
                setTickets((prevTickets) => [...prevTickets, savedTicket]);
                // Clear the order for a new entry
                clearOrder();
                console.log('Ticket created successfully:', savedTicket);
            } catch (error) {
                console.error('Error creating ticket:', error);
            }
        } else {
            console.warn('No items in order to create a ticket.');
        }
    };


    //returns back to menu list
    const goBackToList = () => {
        setSelectedItem(null); // remove selected item to return to list
    };

    // //filters menu based on category
    // const filterMenu = (category) => {
    //     const filtered = DummyMenu.filter(item => item.category === category);
    //     setFilteredMenu(filtered);
    // };

    return (
        <View style={styles.container}>
            <View style={styles.orderColumn}>
                <View style={styles.orderContainer}>
                    <Text style={styles.orderTitle}>Order Details:</Text>
                    {/*if there are no items in order preview empty order text is shown*/}
                    {order.length === 0 ? (
                        <Text>No items in order</Text>
                    ) : (
                        order.map((orderItem, index) => (
                            <View key={index}>
                                <View style={styles.orderItemRow}>
                                    <Text style={styles.orderItem}>
                                    {orderItem.title} - ${Number(orderItem.price).toFixed(2)}
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
                <View style={styles.button}>
                    {/* navigates to checkout page and passes the order items and total price */}
                    <Button title="Checkout" onPress={() => navigation.navigate('CustomerCheckout', { order, totalPrice })} />
                </View>
            </View>
            <View style={styles.menuColumn}>
                {/* menu filter */}
                <View style={styles.buttonRow}>
                    <Button title="Beverages" onPress={() => filterMenu('Drinks')} />
                    <Button title="Breakfast" onPress={() => filterMenu('Breakfast')} />
                    <Button title="Lunch" onPress={() => filterMenu('Lunch')} />
                    <Button title="Dinner" onPress={() => filterMenu('Dinner')} />
                    <Button title="Cafe/Dessert" onPress={() => filterMenu('Dessert' || 'Cafe')} />
                </View>
                {/* shows a more customer friendly menu list and details view */}
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
                                onPress={() => addToOrder(selectedItem.title, selectedItem.price, comment)} // Pass the comment and item details
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.flatContainer}>
                        <FlatList
                            data={menuItems}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.name}
                                    price={item.price}
                                    image={item.image}
                                    onSelect={() => setSelectedItem(item)} // Show details when "View Details" is pressed
                                    onAddToOrder={() => addToOrder(item, comment)} // Add item to order when "Add to Order" is pressed
                                />
                            )}
                            keyExtractor={item => item._id}
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
    menuColumn: {
        flex: 1.5,
        padding: 10,
        height: '100%',
    },
    orderColumn: {
        flex: 1,
        padding: 10,
        height: '100%',
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
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
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
        height: 150,
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
        height: 1200,
        width: '100%',
    },
    orderContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 550,
        width: '100%',
        padding: 10,
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: 'bold',
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
        width: 140,
        height: 140,
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


export default CustomerOrderScreen;