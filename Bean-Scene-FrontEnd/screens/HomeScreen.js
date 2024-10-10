import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Hi this is the bean scene menu ordering app</Text>
            <Button title="Go to menu" onPress={() =>navigation.navigate('Menu')}/>
        </View>
    )
}

export default HomeScreen;