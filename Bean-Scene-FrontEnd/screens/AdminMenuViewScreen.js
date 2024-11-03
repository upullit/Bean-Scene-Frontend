import React from "react";
import { Button, View, StyleSheet, Image, Text } from "react-native";
import CustomButton from '../CustomButton.js';

const AdminMenuViewScreen = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            {/* takes the selected item and displays it
            ingredients need to be added */}
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>Price: {item.price}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.description}>Category: {item.category}</Text>
            <View style={styles.actionButton}>
                {/* takes item data to edit page */}
                <CustomButton title="Edit" onPress={() => navigation.navigate('AdminMenuEdit', { item })} /> 
                <CustomButton title="Delete" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginVertical: 10,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
export default AdminMenuViewScreen;