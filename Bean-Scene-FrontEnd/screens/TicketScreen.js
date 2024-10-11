import React from "react";
import { View, Text, Button } from 'react-native'

const TicketScreen = ({ navigation }) => {
    return (
        <View>
            <Button title="Go to menu" onPress={() => navigation.navigate('Menu')} />
            <View>
                
            </View>
        </View>
    );
};

export default TicketScreen;