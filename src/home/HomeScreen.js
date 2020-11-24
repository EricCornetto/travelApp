import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from '../home/HomeDetails';
import { Icon, Avatar  } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../profile/Profile';


var user = auth().currentUser;

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
    headerShown: false
}

export default HomeScreen;