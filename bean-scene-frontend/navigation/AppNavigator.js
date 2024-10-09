import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import MenuScreen from '../screens/MenuScreen'
import OrderScreen from '../screens/OrderScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Menu' component={MenuScreen} />
            <Stack.Screen name='Order' component={OrderScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default AppNavigator;