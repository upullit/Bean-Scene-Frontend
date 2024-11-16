import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { updateTicket, deleteTicket, getTickets } from '../crud/ticket';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal.js';

const TicketsScreen = () => {
    const [tickets, setTickets] = useState([]);
    const [pendingTickets, setPendingTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const ticketsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: null });

    // Fetch tickets on mount
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets(); // Fetch all tickets
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


    // Sync pendingTickets whenever tickets change
    useEffect(() => {
        setPendingTickets(tickets.filter(ticket => ticket.status === 'Pending'));
    }, [tickets]);

    const showModal = (title, message, onConfirm) => {
        setModalContent({ title, message, onConfirm });
        setModalVisible(true);
    };

    // Function to mark ticket as complete
    const markAsComplete = async (ticketId) => {
        showModal(
            'Mark as Complete',
            'Are you sure you want to mark this ticket as complete?',
            async () => {
                try {
                    await updateTicket(ticketId, { status: 'Completed' });
                    const updatedTickets = await getTickets(); // Fetch updated tickets
                    setTickets(updatedTickets); // Update the state
                    setModalVisible(false); // Close the modal
                } catch (error) {
                    console.error('Error marking ticket as complete:', error);
                }
            }
        );
    };

    const removeTicket = async (ticketId) => {
        showModal(
            'Delete Ticket',
            'Are you sure you want to delete this ticket?',
            async () => {
                try {
                    await deleteTicket(ticketId);
                    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== ticketId));
                    setModalVisible(false); // Close the modal
                } catch (error) {
                    console.error('Error deleting ticket:', error);
                }
            }
        );
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
                /* shows all pending tickets with its menu items and their comments*/
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
                                <Text style={styles.tableNumber}>Table: {item.tableNumber}</Text>
                                {item.items.map((orderItem, itemIndex) => (
                                    <Text style={styles.ticketText} key={itemIndex}>
                                        {orderItem.quantity} x {orderItem.menuItem.name}
                                        {orderItem.specialInstructions ? `\n - ${orderItem.specialInstructions}` : ''}
                                    </Text>
                                ))}
                                <Text style={styles.totalPrice}>Total: ${item.totalPrice.toFixed(2)}</Text>
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
            <CustomModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={modalContent.onConfirm}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    totalPrice: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
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

export default TicketsScreen;