import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const TicketsScreen = ({ route }) => {
    const { tickets = [] } = route.params || {};
    const ticketsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);

    const currentTickets = tickets.slice(
        currentPage * ticketsPerPage,
        (currentPage + 1) * ticketsPerPage
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Tickets</Text>
            {tickets.length === 0 ? (
                <Text>No active tickets</Text>
            ) : (
                <FlatList
                    data={currentTickets}
                    renderItem={({ item, index }) => (
                        <View style={styles.ticketItem}>
                            <Text style={styles.ticketTitle}>
                                Ticket #{currentPage * ticketsPerPage + index + 1}
                            </Text>
                            {item.map((orderItem, itemIndex) => (
                                <Text style={styles.ticketText} key={itemIndex}>
                                    {orderItem.item}
                                    {orderItem.comment ? `\n - ${orderItem.comment}` : ''}
                                </Text>
                            ))}
                            <View style={styles.bottomButton}>
                                <Button title="Complete" />
                                <Button title="Delete" />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
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
    bottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, // Space between text and buttons
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    pageIndicator: {
        marginHorizontal: 20,
        fontSize: 16,
    },
});

export default TicketsScreen;