import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Layout, Button, Icon} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../profile/Profile';
import HomeScreen from './HomeScreen';
import Settings from '../settings/Settings'

const Drawer = createDrawerNavigator();

const Home = ({route, navigation}) => {

   const {user_email} = route.params;

    function Logout(){
        auth().signOut()
        .then(()=>{
            console.log('user signed out!');
            navigation.push('Signin');
    
        })

        return null;
    }
    
   
    return (
        <Drawer.Navigator screenOptions={({route}) => ({
            drawerIcon: ({focused, color, size}) => {
                let iconName;

                if(route.name === 'Home') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'md-person-circle' : 'md-person-circle-outline';
                } else if (route.name === 'Logout') {
                    iconName = focused ? 'md-exit' : 'md-exit-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />
            },
        })} drawerContentOptions={{activeTintColor: '#3588E7', inactiveTintColor: 'gray'}}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    );
}

export default Home;