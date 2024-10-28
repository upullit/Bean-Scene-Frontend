import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { updateTicket, deleteTicket , getTickets} from '../crud/ticket';

const TicketsScreen = () => {
    const [tickets, setTickets] = useState([]);
    const [pendingTickets, setPendingTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const ticketsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    // Fetch tickets on mount
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets(); // Fetch all tickets
                setTickets(fetchedTickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);


    // Sync pendingTickets whenever tickets change
    useEffect(() => {
        setPendingTickets(tickets.filter(ticket => ticket.status === 'Pending'));
    }, [tickets]);

    // Function to mark ticket as complete
    const markAsComplete = async (ticketId) => {
        try {
            await updateTicket(ticketId, { status: 'Completed' });
            const updatedTickets = await getTickets(); // Fetch the updated list of tickets
            setTickets(updatedTickets); // Update the state with the latest tickets
        } catch (error) {
            console.error('Error marking ticket as complete:', error);
        }
    };

    // Function to delete a ticket
    const removeTicket = async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };
    
    const currentTickets = pendingTickets.slice(
        currentPage * ticketsPerPage,
        (currentPage + 1) * ticketsPerPage
    );
    const totalPages = Math.ceil(pendingTickets.length / ticketsPerPage);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Tickets</Text>
            {loading ? 
             {/* shows all pending tickets with its menu items and their comments*/}
            (
                <Text>Loading tickets...</Text>
            ) : pendingTickets.length === 0 ? (
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
                                <Button title="Complete" onPress={() => markAsComplete(item._id)} />
                                <Button title="Delete" onPress={() => removeTicket(item._id)} />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={4}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
            {/* page navigation */}
            <View style={styles.pagination}>
                <Button
                    title="Previous"
                    onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                    disabled={currentPage === 0}
                />
                <Text style={styles.pageIndicator}>
                    {currentPage + 1} / {totalPages}
                </Text>
                <Button
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
});

export default TicketsScreen;