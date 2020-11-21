import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsDetails from './SettingsDetails';

const StackNavigator = createStackNavigator();

const Settings = () => {
    return(
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="Setting Details" component={SettingsDetails} options={settings} />
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
    title: "Settings",
    headerLeft: null,
}

export default Settings;