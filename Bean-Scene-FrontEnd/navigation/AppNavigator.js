import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ServerOrderScreen from '../screens/ServerOrderScreen'
import TicketScreen from '../screens/TicketScreen'
import AdminScreen from '../screens/AdminScreen'
import KitchenScreen from '../screens/KitchenScreen'
import AdminMenuViewScreen from '../screens/AdminMenuViewScreen'
import AdminMenuEditScreen from '../screens/AdminMenuEditScreen'
import CustomerOrderScreen from '../screens/CustomerOrderScreen'
import CustomerCheckoutScreen from '../screens/CustomerCheckoutScreen'
import CustomerMenuScreen from '../screens/CustomerMenuScreen'
import AdminNewItemScreen from '../screens/AdminNewItemScreen'
import LoginScreen from '../screens/LoginScreen';
import RegisterStaffScreen from '../screens/RegisterStaffScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer theme={{ colors: { background: '#F8FAE5' } }}>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#43766C',
                    },
                    headerTintColor: '#F8FAE5',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='ServerOrder' component={ServerOrderScreen} />
                <Stack.Screen name='Ticket' component={TicketScreen} />
                <Stack.Screen name='Admin' component={AdminScreen} />
                <Stack.Screen name='Kitchen' component={KitchenScreen} />
                <Stack.Screen name='AdminMenuView' component={AdminMenuViewScreen} />
                <Stack.Screen name='AdminMenuEdit' component={AdminMenuEditScreen} />
                <Stack.Screen name='CustomerOrder' component={CustomerOrderScreen} />
                <Stack.Screen name='CustomerCheckout' component={CustomerCheckoutScreen} />
                <Stack.Screen name='CustomerMenu' component={CustomerMenuScreen} />
                <Stack.Screen name='AdminNewItem' component={AdminNewItemScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name="RegisterStaff" component={RegisterStaffScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator;