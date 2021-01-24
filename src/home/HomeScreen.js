import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from '../home/HomeDetails';
import PlaceDetails from './PlaceDetails';
import BookingHotelAndFlight from './BookingHotelAndFlight';

const StackNavigator = createStackNavigator();

const HomeScreen = () => {

    

    return(
        <StackNavigator.Navigator >
            <StackNavigator.Screen name="Home" component={HomeDetails} options={settings}/>
            <StackNavigator.Screen name="PlaceDetails" component={PlaceDetails} options={settingsPlaces}/>
            <StackNavigator.Screen name="Booking Hotel And Flight" component={BookingHotelAndFlight} options={booking} />
        </StackNavigator.Navigator>
    );
}

const settings =  {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    headerShown: false
}

const settingsPlaces = {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: 'Place Details',
    headerTransparent: true
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

export default HomeScreen;