import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { updateTicket, deleteTicket, getTickets } from '../crud/ticket';
import CustomButton from '../CustomButton.js';
import CustomModal from '../CustomModal.js';

const KitchenScreen = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tickets, setTickets] = useState([]);
    const [pendingTickets, setPendingTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const ticketsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: null });

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
                {/* Previous Button */}
                <TouchableOpacity
                    onPress={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                    disabled={currentPage === 0}
                    style={[
                        styles.button,
                        currentPage === 0 && styles.disabledButton,
                    ]}
                >
                    <Text style={[styles.buttonText, currentPage === 0 && styles.disabledText]}>
                        Previous
                    </Text>
                </TouchableOpacity>

                {/* Page Indicator */}
                <Text style={styles.pageIndicator}>
                    {currentPage + 1} / {totalPages}
                </Text>

                {/* Next Button */}
                <TouchableOpacity
                    onPress={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    style={[
                        styles.button,
                        currentPage === totalPages - 1 && styles.disabledButton,
                    ]}
                >
                    <Text style={[styles.buttonText, currentPage === totalPages - 1 && styles.disabledText]}>
                        Next
                    </Text>
                </TouchableOpacity>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
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
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: '#43766C',
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#DDD',
    },
    disabledText: {
        color: '#999',
    },
});

export default KitchenScreen;