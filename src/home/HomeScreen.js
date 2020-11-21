import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from '../home/HomeDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button,  } from '@ui-kitten/components';
import { Image } from 'react-native';

const StackNavigator = createStackNavigator();

const HomeScreen = ({navigation}) => {


    return(
        <StackNavigator.Navigator >
            <StackNavigator.Screen name="Home" component={HomeDetails} options={settings}/>
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
    headerTransparent: true,
    headerLeft: null
}

export default HomeScreen;