import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from '../home/HomeDetails';
import PlaceDetails from './PlaceDetails';


const StackNavigator = createStackNavigator();

const HomeScreen = () => {

    

    return(
        <StackNavigator.Navigator >
            <StackNavigator.Screen name="Home" component={HomeDetails} options={settings}/>
            <StackNavigator.Screen name="PlaceDetails" component={PlaceDetails} options={settingsPlaces}/>

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

export default HomeScreen;