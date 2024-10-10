import React from 'react'
import { View, Text, Button } from 'react-native'

const OrderScreen= ({ navigation }) => {
    return (
        <View>
            <Text>Hi this is the bean scene menu ordering app</Text>
            <Button title="Go to Home Screen" onPress={() =>navigation.navigate('Home')}/>
        </View>
    )
}

export default OrderScreen;