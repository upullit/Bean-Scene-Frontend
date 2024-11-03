import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, FlatList, Switch, TextInput } from 'react-native';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import CustomButton from '../CustomButton.js';

//loads menu items for menu management with a switch on each
const Item = ({ title }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.menuItems}>
            <Text style={styles.menuText}>{title}</Text>
            <Switch
                trackColor={{ false: '#ba2d2d', true: '#168226' }}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};


const KitchenScreen = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { tickets = [] } = route.params || {};
    const ticketsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);
    const [menuVisible, setMenuVisible] = useState(false);

    const currentTickets = tickets.slice(
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
                                <CustomButton title="Complete" />
                                <CustomButton title="Delete" />
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
                <CustomButton
                    title="Next"
                    onPress={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                />
                <TouchableOpacity style={styles.buttonMenuMangage} onPress={toggleMenu}>
                    <Text style={styles.buttonText}>Manage Menu</Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={menuVisible}
                    animationType="fade"
                    onRequestClose={toggleMenu}
                >
                    <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu}>
                        <View style={styles.menuContainer} onTouchStart={(e) => e.stopPropagation()}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search menu items..."
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                            />
                            <FlatList
                                data={searchMenu}
                                renderItem={({ item }) => (
                                    <Item
                                        title={item.title}
                                    />
                                )}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
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
    closeText: {
        color: '#007AFF',
        marginTop: 10,
    },
    buttonMenuMangage: {
        position: 'absolute',
        bottom: 20,  
        right: 20, 
        backgroundColor: '#43766C',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#F8FAE5',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default KitchenScreen;