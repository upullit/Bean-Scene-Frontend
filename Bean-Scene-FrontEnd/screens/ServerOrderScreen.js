import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, Modal, TouchableOpacity } from 'react-native';
import { getMenuItems } from '../crud/menuitems';
import { createTicket } from '../crud/ticket';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal';

//displays each menu item
const Item = ({ title, price, image, onSelect, onAddToOrder }) => (
    <View style={styles.menuItem}>
        <View style={styles.itemContent}>
            <View>
                <Text style={styles.dishTitle}>{title} - ${price.toFixed(2)}</Text>
            </View>
            <View>
                <CustomButton title="View Details" onPress={onSelect} />
                <CustomButton title="Add to Order" onPress={onAddToOrder} />
            </View>
        </View>
    </View>
);

const ServerOrderScreen = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comment, setComment] = useState(''); // To store the custom comment
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);  // State for filtered menu items
    const [tickets, setTickets] = useState([]);
    const [tableNumber, setTableNumber] = useState(''); // State for table number
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);

    // Modal states
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: null });

    // Fetch the menu items from database calling the function
    useEffect(() => {
        const fetchMenuItems = async () => {
            const items = await getMenuItems(); // Fetch items using API function
            setMenuItems(items); // Set fetched items to state
            setFilteredMenu(items);
        };
        fetchMenuItems();
    }, []);

    // Function to filter the menu by category
    const filterMenu = (category) => {
        const filtered = menuItems.filter(item => item.category === category);
        setFilteredMenu(filtered);
    };

    const toggleTableModal = () => {
        setIsTableModalVisible(!isTableModalVisible);
    };

    // Function to show all items
    const showAllItems = () => {
        setFilteredMenu(menuItems); // Reset filteredMenu to the original menuItems
    };

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
        setTableNumber('');
    };

    //turns order into ticket
    const createNewTicket = async (paymentMethod) => {
        if (!tableNumber) {
            setModalContent({
                title: 'Error',
                message: 'Please select a table number.',
            });
            setModalVisible(true);
            return;
        }

        if (order.length > 0) {
            // Prepare the new ticket object with required fields
            const newTicket = {
                items: order.map((orderItem) => ({
                    menuItem: orderItem.menuItemId, // Ensure this is a valid MenuItem ID
                    quantity: orderItem.quantity || 1, // Default quantity to 1 if not specified
                    specialInstructions: orderItem.comment || '' // Add any special instructions or default to an empty string
                })),
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                CustomerId: "60b8b22d7b9e4b00156a5c3b", // Replace with a valid Customer ID if needed
                tableNumber: tableNumber
            };

            try {
                // Call the createTicket function to save the ticket to the database
                const savedTicket = await createTicket(newTicket);
                // Update local state with the new ticket
                setTickets((prevTickets) => [...prevTickets, savedTicket]);
                // Clear the order for a new entry
                clearOrder();
                setModalContent({
                    title: "Ticket created successfully",
                    message: "Your ticket has been created successfully."
                });
                setModalVisible(true);
                console.log('Ticket created successfully:', savedTicket);
            } catch (error) {
                setModalContent({
                    title: 'Error',
                    message: 'Failed to create ticket.',
                });
                setModalVisible(true);
                console.error('Error creating ticket:', error);
            }
        } else {
            setModalContent({
                title: 'Error',
                message: 'No items in order to create a ticket.',
            });
            setModalVisible(true);
        }
    };

    // Function to delete an item from the order
    const deleteItem = (index) => {
        const updatedOrder = [...order]; // Create a copy of the current order
        const removedItem = updatedOrder.splice(index, 1)[0]; // Remove the item at the specified index
        setOrder(updatedOrder); // Update the order state with the new array
        setTotalPrice((prevTotal) => prevTotal - removedItem.price); // Adjust the total price
    };

    //returns back to menu list
    const goBackToList = () => {
        setSelectedItem(null); // remove selected item to return to list
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                {/* ticket management */}
                <View style={styles.buttonRow}>
                    <CustomButton title="Clear Order" onPress={() => clearOrder()} />
                    <CustomButton title="View Tickets" onPress={() => navigation.navigate('Ticket', { tickets })} />
                    <Modal
                        visible={isTableModalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={toggleTableModal}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Enter Table Number</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Table (e.g., A1)"
                                    value={tableNumber}
                                    onChangeText={setTableNumber}
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity onPress={toggleTableModal} style={styles.cancelButton}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={() => {
                                            toggleTableModal();
                                            if (!tableNumber.trim()) {
                                                // Add validation or alert if table number is empty
                                                alert('Table number cannot be empty.');
                                                return;
                                            }
                                        }}>
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <CustomButton title="Enter Table Number" onPress={toggleTableModal} />
                </View>
                {/* shows menu list and details view */}
                <View style={styles.orderContainer}>
                    <Text style={styles.orderTitle}>Order Details:</Text>
                    {tableNumber ? (
                        <Text style={styles.tableNumber}>Table: {tableNumber}</Text>
                    ) : null}
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
                                        {/* delete item function will be called here */}
                                        <CustomButton title="Delete" onPress={() => deleteItem(index)} />
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
                    <CustomButton title="Cash" onPress={() => createNewTicket('Cash')} />
                    <CustomButton title="Card" onPress={() => createNewTicket('Card')} />
                    <CustomButton title="Split" onPress={() => createNewTicket('Split')} />
                    <CustomButton title="Refund" />
                </View>
            </View>
            <View style={styles.column}>
                {/*menu filter*/}
                <View style={styles.buttonRow}>
                    <CustomButton
                        title="All Items"
                        onPress={() => {
                            goBackToList();
                            showAllItems();
                        }} />
                    <CustomButton
                        title="Beverages"
                        onPress={() => {
                            goBackToList();
                            filterMenu('Drinks');
                        }} />
                    <CustomButton
                        title="Breakfast"
                        onPress={() => {
                            goBackToList();
                            filterMenu('Breakfast');
                        }} />
                    <CustomButton
                        title="Lunch"
                        onPress={() => {
                            goBackToList();
                            filterMenu('Lunch');
                        }} />
                    <CustomButton
                        title="Dinner"
                        onPress={() => {
                            goBackToList();
                            filterMenu('Dinner');
                        }} />
                    <CustomButton
                        title="Cafe/Dessert"
                        onPress={() => {
                            goBackToList();
                            filterMenu('Dessert' || 'Cafe');
                        }} />
                </View>
                {/* shows menu list and details view */}
                {selectedItem ? (
                    <View style={styles.detailsContainer}>
                        <Image source={selectedItem.imageUrl} style={styles.detailImage} />
                        <Text style={styles.detailsTitle}>{selectedItem.name}</Text>
                        <Text style={styles.detailsText}><b>Price: </b>${selectedItem.price.toFixed(2)}</Text>
                        <Text style={styles.detailsText}><b>Description: </b>{selectedItem.description}</Text>
                        <Text style={styles.detailsText}>
                            <b>Ingredients:</b> {selectedItem.ingredients.join(', ')}
                        </Text>
                        <View style={styles.tagsContainer}>
                            {selectedItem.isVegan && <Text style={[styles.tag, styles.veganTag]}>Vegan</Text>}
                            {selectedItem.isVegetarian && <Text style={[styles.tag, styles.vegetarianTag]}>Vegetarian</Text>}
                        </View>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment or special request"
                            value={comment}
                            onChangeText={setComment}
                        />
                        <View style={styles.buttonRow2}>
                            <CustomButton title="Back" onPress={goBackToList} />
                            <CustomButton
                                title="Add to Order"
                                onPress={() => {
                                    addToOrder(selectedItem, comment);
                                    goBackToList();
                                }} />
                        </View>
                    </View>
                ) : (
                    <View style={styles.flatContainer}>
                        <FlatList
                            data={filteredMenu}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.name}
                                    price={item.price}
                                    image={{ uri: item.imageUrl }}
                                    onSelect={() => setSelectedItem(item)}
                                    onAddToOrder={() => addToOrder(item, comment)}
                                />
                            )}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                )}
            </View>
            {/* Custom Modal for alerts */}
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={() => setModalVisible(false)}
            />
        </View >
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
        width: '100%',
        gap: 15,
        justifyContent: 'center',
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#B19470 ',
        borderRadius: 5,
        backgroundColor: '#F8FAE5',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatContainer: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        overflow: 'hidden',
        maxHeight: 580,
        width: '100%',
    },
    orderContainer: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        overflow: 'hidden',
        height: 470,
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
        borderColor: 'grey',
        borderRadius: 5,
        overflow: 'hidden',
        height: 50,
        width: '100%',
        padding: 10,
    },
    detailsContainer: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        overflow: 'hidden',
        height: 580,
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
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    detailImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#F8FAE5',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 250,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        width: 120,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B19470',
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#76453B',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#76453B',
        padding: 10,
        borderRadius: 5,
    },
    confirmButton: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#43766C',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 16,
    },
    tableNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        padding: 15,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    veganTag: {
        backgroundColor: '#DFF2BF',
        color: '#4F8A10',
    },
    vegetarianTag: {
        backgroundColor: '#FFECB3',
        color: '#FFA000',
    },
    buttonRow2: {
        flexDirection: 'row',
        width: '100%',
        gap: 15,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
});

export default ServerOrderScreen;