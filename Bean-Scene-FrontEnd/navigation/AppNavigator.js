import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import MenuScreen from '../screens/MenuScreen'
import TicketScreen from '../screens/TicketScreen'
import AdminScreen from '../screens/AdminScreen'
import KitchenScreen from '../screens/KitchenScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Menu' component={MenuScreen} />
            <Stack.Screen name='Ticket' component={TicketScreen} />
            <Stack.Screen name='Admin' component={AdminScreen} />
            <Stack.Screen name='Kitchen' component={KitchenScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )

}

export default AppNavigator;