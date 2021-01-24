import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WishlistDetails from './WishlistDetails';
import BookingHotelAndFlight from '../booking/BookingHotelAndFlight';

const Wishlist = () => {
    
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Wishlist Details" component={WishlistDetails} options={settings} />
            <Stack.Screen name="Booking Hotel And Flight" component={BookingHotelAndFlight} options={booking} />
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
    title: "Wishlist",
    headerLeft: null,
}

const booking = {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: 'Booking Hotel And Flight',
}

export default Wishlist;