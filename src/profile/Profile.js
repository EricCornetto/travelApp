import React, {useState} from 'react';
import { Layout, Text, Button} from '@ui-kitten/components';
import { View,  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileDetails from './ProfileDetails';

const StackNavigator = createStackNavigator();

const Profile = () => {

    return(
        <StackNavigator.Navigator>     
            <StackNavigator.Screen name="Profile Details" component={ProfileDetails} options={settings} />
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
    title: "Profile"
}

export default Profile;