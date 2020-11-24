import React from 'react';
import Profile from '../profile/Profile';
import HomeScreen from './HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Booking from '../booking/Booking';
import Wishlist from '../wishlist/Wishlist';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();


const Home = () => { 
   
    return (
        <Tab.Navigator
         tabBar={props => <BottomTabBar {...props} />} >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Booking" component={Booking} />
            <Tab.Screen name="Wishlist" component={Wishlist} />
            
        </Tab.Navigator>
    );
}

const homeIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

const bookingIcon = (props) => (
    <Icon {...props} name="briefcase-outline" />
);

const wishlistIcon = (props) => (
    <Icon {...props} name="heart-outline" />
);

const profileIcon = (props) => (
    <Icon {...props} name="person-outline" />
);


const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation 
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab icon={homeIcon} title="Home" />
        <BottomNavigationTab icon={profileIcon} title="Profile" />
        <BottomNavigationTab icon={bookingIcon} title="Booking" />
        <BottomNavigationTab icon={wishlistIcon} title="Wishlist" />
        
    </BottomNavigation>
);

export default Home;