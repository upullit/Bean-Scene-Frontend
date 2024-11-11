import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, FlatList, Switch, TextInput, Alert } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import { updateTicket, deleteTicket , getTickets} from '../crud/ticket';
import CustomButton from '../CustomButton.js';

const KitchenScreen = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tickets, setTickets] = useState([]);
    const [pendingTickets, setPendingTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const ticketsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets();
                setTickets(fetchedTickets);
            } catch (error) {
                Alert.alert('Error fetching tickets:', error);
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    useEffect(() => {
        setPendingTickets(tickets.filter(ticket => ticket.status === 'Pending'));
    }, [tickets]);

    const markAsComplete = async (ticketId) => {
        try {
            await updateTicket(ticketId, { status: 'Completed' });
            const updatedTickets = await getTickets();
            setTickets(updatedTickets);
            Alert.alert('Ticket marked as complete!');
        } catch (error) {
            Alert.alert('Error marking ticket as complete:', error);
            console.error('Error marking ticket as complete:', error);
        }
    };

    const currentTickets = pendingTickets.slice(
        currentPage * ticketsPerPage,
        (currentPage + 1) * ticketsPerPage
    );

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const searchMenu = DummyMenu
        .filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Tickets</Text>
            {loading ? 
                <Text>Loading tickets...</Text> 
                : pendingTickets.length === 0 ? (
                    <Text>No active tickets</Text>
                ) : (
                    <FlatList
                        data={currentTickets}
                        renderItem={({ item, index }) => (
                            <View style={styles.ticketItem}>
                                <Text style={styles.ticketTitle}>
                                    Ticket #{currentPage * ticketsPerPage + index + 1}
                                </Text>
                                {item.items.map((orderItem, itemIndex) => (
                                    <Text style={styles.ticketText} key={itemIndex}>
                                        {orderItem.menuItem.name} - Quantity: {orderItem.quantity}
                                        {orderItem.specialInstructions ? `\n - ${orderItem.specialInstructions}` : ''}
                                    </Text>
                                ))}
                                <Text style={styles.totalPrice}>Total: ${item.totalPrice.toFixed(2)}</Text>
                                <View style={styles.bottomButton}>
                                    <CustomButton title="Complete" onPress={() => markAsComplete(item._id)} />
                                    <CustomButton title="Delete" onPress={() => removeTicket(item._id)} />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={4}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                )}
            <View style={styles.pagination}>
                <CustomButton
                    title="Previous"
                    onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                    disabled={currentPage === 0}
                />
                <Text style={styles.pageIndicator}>
                    {currentPage + 1} / {totalPages}
                </Text>
                <CustomButton
                    title="Next"
                    onPress={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
    },
    menuItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    ticketItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 300,
    },
    ticketTitle: {
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
    },
    ticketText: {
        fontSize: 18,
        padding: 10,
    },
    ticketButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, 
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    pageIndicator: {
        marginHorizontal: 20,
        fontSize: 16,
    },
    menuOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    menuContainer: {
        width: 250,
        height: 400,
        padding: 20,
        backgroundColor: '#F8FAE5',
        borderRadius: 8,
        alignItems: 'left',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 80, 
        marginRight: 40,
        overflow: 'hidden',
    },
    menuText: {
        fontSize: 16,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default KitchenScreen;