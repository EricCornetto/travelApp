import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileDetails from './ProfileDetails';

const StackNavigator = createStackNavigator();

const Profile = () => {

    return(
        <StackNavigator.Navigator initialRouteName="Profile Details">     
            <StackNavigator.Screen name="Profile Details" component={ProfileDetails} options={profile_settings} />
        </StackNavigator.Navigator>
    );
}

const profile_settings =  {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: "Profile",
    headerLeft: null
}

const settings = {
    headerStyle: {
        backgroundColor: "#3588E7",
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
        fontWeight: 'bold'
    },
    title: "Profile",

}

export default Profile;