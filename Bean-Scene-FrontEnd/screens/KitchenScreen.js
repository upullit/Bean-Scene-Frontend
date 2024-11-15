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
                                <Text style={styles.tableNumber}>Table: {item.tableNumber}</Text>
                                {item.items.map((orderItem, itemIndex) => (
                                    <Text style={styles.ticketText} key={itemIndex}>
                                    {orderItem.quantity} x {orderItem.menuItem.name}
                                        {orderItem.specialInstructions ? `\n - ${orderItem.specialInstructions}` : ''}
                                    </Text>
                                ))}
                                <View style={styles.ticketButton}>
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
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    columnWrapper: {
        justifyContent: 'flex-start',
    },
    ticketItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 400,
        minHeight: 300,
        maxHeight: 350,
        flexDirection: 'column', // Arrange children vertically
        justifyContent: 'space-between', // Push button to the bottom
    },
    ticketTitle: {
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
    },
    ticketText: {
        fontSize: 20,
        padding: 5,
    },
    ticketButton: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'center',
        gap: 15,
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
});

export default KitchenScreen;