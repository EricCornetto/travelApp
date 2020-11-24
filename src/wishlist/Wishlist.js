import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WishlistDetails from './WishlistDetails';

const Wishlist = () => {
    
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Wishlist Details" component={WishlistDetails} options={settings} />
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

export default Wishlist;