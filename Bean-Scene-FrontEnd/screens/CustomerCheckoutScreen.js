import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import CustomButton from '../CustomButton.js';

const CustomerCheckoutScreen = ({ navigation, route }) => {
    const { order, totalPrice } = route.params; //holds order from previous page
    const [checked, setChecked] = React.useState('first');

    {/*
        functions are work in progress
    const [tickets, setTickets] = useState([]);
    const clearOrder = () => { //Clear the current order
        setOrder([]);
        setTotalPrice(0);
    };
    const createNewTicket = () => { //function to add order to tickets
        if (order.length > 0) {
            setTickets((prevTickets) => [...prevTickets, order]); // Add current order to tickets
            clearOrder(); // Clear the current order to start a new one
        }
    };
    */}

    return (
        <View style={styles.container}>
            <View style={styles.orderColumn}>
                <View style={styles.orderContainer}>
                    {/* displays order summary */}
                    <Text style={styles.orderTitle}>Order Summary:</Text>
                    {order.length === 0 ? (
                        <Text>No items in order</Text>
                    ) : (
                        order.map((orderItem, index) => (
                            <View key={index} style={styles.buttonRow}>
                                <Text style={styles.orderItem}>
                                    <b>{orderItem.title}</b> - ${orderItem.price.toFixed(2)}
                                </Text>
                                {orderItem.comment ? (
                                    <Text style={styles.orderComment}> - {orderItem.comment}</Text>
                                ) : null}
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalPrice}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.button}>
                    {/* return to ordering page */}
                    <CustomButton title="Back" onPress={() => navigation.navigate('CustomerOrder')} />
                </View>
            </View>

            <View style={styles.menuColumn}>
                {/* checkout form - radio buttons need to implimented */}
                <View style={styles.flatContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Checkout</Text>
                    </View>

                    <View style={styles.formContaier}>
                        <Text style={styles.subheading}>Order Name:</Text>
                        <TextInput style={styles.input}></TextInput>
                        <Text style={styles.subheading}>Select Payment Method:</Text>
                        <View>
                            <View style={styles.radio}>
                                <RadioButton
                                    value="first"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('first')}
                                />
                                <Text style={styles.radioText}>Online Payment</Text>
                            </View>

                            <View style={styles.radio}>
                                <RadioButton
                                    value="second"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('second')}
                                />
                                <Text style={styles.radioText}>Card</Text>
                            </View>

                            <View style={styles.radio}>
                                <RadioButton
                                    value="third"
                                    status={checked === 'third' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('third')}
                                />
                                <Text style={styles.radioText}>In Store</Text>
                            </View>

                        </View>
                        <Text style={styles.subheading}>Enter Promo or Discount Code:</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>

                    <View style={styles.payButton}>
                        {/* create ticket function will be called here */}
                        <CustomButton title="Pay" />
                    </View>
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
    menuColumn: {
        flex: 1.5,
        padding: 10,
        height: '100%',
    },
    orderColumn: {
        flex: 1,
        padding: 10,
        height: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
    },
    flatContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 650,
        width: '100%',
        padding: 20,
    },
    orderContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 550,
        width: '100%',
        padding: 10,
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        fontSize: 18,
        marginVertical: 5,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
        height: 50,
        width: '100%',
        padding: 10,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        top: 10,
    },
    formContaier: {
        padding: 38,
        marginLeft: 50,
        marginHorizontal: 50,
    },
    subheading: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 20,
    },
    payButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    radio: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
    },
    radioText: {
        fontSize: 18,
    },
});

export default CustomerCheckoutScreen;