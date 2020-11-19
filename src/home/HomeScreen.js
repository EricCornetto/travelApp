import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from '../home/HomeDetails';

const StackNavigator = createStackNavigator();

const HomeScreen = () => {
    return(
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="Home" component={HomeDetails} options={settings} />
        </StackNavigator.Navigator>
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
    
}

export default HomeScreen;