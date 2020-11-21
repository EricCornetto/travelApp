import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../profile/Profile';
import HomeScreen from './HomeScreen';
import Settings from '../settings/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {

    function Logout(){
        
        Alert.alert(
            "Are you leaving?",
            "Are you sure want to log out?",
            [
                {
                    text: "Yes",
                    onPress: () => auth().signOut().then(() => {
                        console.log('user signed out');
                        navigation.push('Signin');
                    })
                },
                {
                    text: "Cancel",
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false}
        )

        return null;
    }
    
   
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
    );
}

export default Home;