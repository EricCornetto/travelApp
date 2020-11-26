import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WishlistDetails from './WishlistDetails';
import PlaceDetails from '../home/PlaceDetails';

const Wishlist = () => {
    
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Wishlist Details" component={WishlistDetails} options={settings} />
            <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={settingsPlaces}/>
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

export default Wishlist;