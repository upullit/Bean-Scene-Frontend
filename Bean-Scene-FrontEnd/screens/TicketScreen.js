import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const TicketsScreen = ({ route }) => {
    const { tickets = [] } = route.params || {}; //gets ticket data from ordering screens
    const ticketsPerPage = 8; //defines amount of tickets visable on each page
    const [currentPage, setCurrentPage] = useState(0); //page management
    const totalPages = Math.ceil(tickets.length / ticketsPerPage); //page total

    //show current page number
    const currentTickets = tickets.slice(
        currentPage * ticketsPerPage,
        (currentPage + 1) * ticketsPerPage
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Tickets</Text>
            {/* shows all current tickets with its menu items and their comments*/}
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
                            <View style={styles.ticketButton}>
                                {/* complete ticket function will be called here */}
                                <Button title="Complete" />
                                {/* delete ticket function will be called here */}
                                <Button title="Delete" />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
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