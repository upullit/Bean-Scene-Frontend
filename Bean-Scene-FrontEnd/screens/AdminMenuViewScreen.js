import React from "react";
import { Button, View, StyleSheet, Image, Text } from "react-native";

const AdminMenuViewScreen = ({ route, navigation }) => {

    const { item } = route.params; // Destructure the item from route parameters


    return (
        <View style={styles.container}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>Price: {item.price}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.description}>Category: {item.category}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('AdminMenuEdit', { item })}>Edit</Button>
            <Button title="Delete">Delete</Button>
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
});
export default AdminMenuViewScreen;