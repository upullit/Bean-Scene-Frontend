import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const DummyMenu = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Item 8' },
    { id: '9', title: 'Item 9' },
    { id: '10', title: 'Item 10' },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.buttonRow}>
                    <Button title="New Ticket" />
                    <Button title="View Tickets" onPress={() => navigation.navigate('Ticket')}/>
                    <Button title="Change Table" />
                    <Button title="Cancel Ticket" />
                </View>
                <View style={styles.order}>

                </View>
                <Text>Hi, this is the Bean Scene menu ordering app</Text>
                <Button title="Go to order screen" onPress={() => navigation.navigate('Order')} />
                <View style={styles.buttonRow}>
                    <Button title="Cash" />
                    <Button title="Card" />
                    <Button title="Split" />
                    <Button title="Refund" />
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.buttonRow}>
                    <Button title="Beverages" />
                    <Button title="Breakfast" />
                    <Button title="Lunch" />
                    <Button title="Dinner" />
                    <Button title="Cafe/Dessert" />
                </View>
                <View style={styles.flatContainer}>
                    <FlatList
                        data={DummyMenu}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </View>
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
    column: {
        flex: 1, 
        padding: 10,
        height: '100%', 
    },
    buttonRow: {
        flexDirection: 'row', 
        marginTop: 10,
        width: '100%', 
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold',
    },
    item: {
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    flatContainer: {
        borderWidth: 2,         
        borderColor: 'black',   
        borderRadius: 5,        
        overflow: 'hidden',
        height: 600,            
        width: '100%',          
    },
    order: {
        borderWidth: 2,         
        borderColor: 'black',   
        borderRadius: 5,        
        overflow: 'hidden',
        height: 400,            
        width: '100%',          
    },
});

export default MenuScreen;