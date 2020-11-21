import React from 'react';
import { View } from 'react-native';
import { Text, Button, Card, Layout } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const HomeDetails = ({navigation}) => {

    var user = auth().currentUser;

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3588E7',}}>
            <Text style={{color: '#FFFFFF'}}>Home Page, Hello {user.displayName}</Text>
            <Button onPress={() => console.log("pressed")}>Click me</Button>
        </View>
    );
}

export default HomeDetails;