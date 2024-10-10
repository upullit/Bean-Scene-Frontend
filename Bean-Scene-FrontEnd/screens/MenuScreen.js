import React from 'react'
import { View, Text, Button } from 'react-native'

const MenuScreen= ({ navigation }) => {
    return (
        <View>
            <Text>Hi this is the bean scene menu ordering app</Text>
            <Button title="Go to order screen" onPress={() =>navigation.navigate('Order')}/>
        </View>
    )
}

export default MenuScreen;