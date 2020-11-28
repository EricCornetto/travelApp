import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookingList from './BookingList';
import BookingDetails from './BookingDetails';

const Booking = () => {
    
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Booking List" component={BookingList} options={settings} />
            <Stack.Screen name="Booking Details" component={BookingDetails} options={detailsSetting} />
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

const detailsSetting = {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: "Booking Details",
}

export default Booking;