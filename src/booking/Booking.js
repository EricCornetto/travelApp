import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookingList from './BookingList';

const Booking = () => {
    
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Booking List" component={BookingList} options={settings} />
        </Stack.Navigator>
    );

}

const settings = {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: "Booking",
    headerLeft: null,
}

export default Booking;