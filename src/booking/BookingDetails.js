import React, {useState,useEffect} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { Icon,  } from 'react-native-elements';

const BookingDetails = ({route,navigation}) => {

    const {item} = route.params;

    return(
        <Layout style={{flex: 1,}}>
            <ImageBackground style={{width: 420, height: 300}} source={{uri: item.photo}} />

            <View style={{flexDirection: 'row', marginTop: 10}}>

                <Icon size={60} name="flight-takeoff" />
                <View style={{flexDirection: 'column', marginRight: 100}}>
                    <Text style={{fontSize: 20}}>Departure</Text>
                    <Text style={{fontSize: 18}}>{item.departure}</Text>
                </View>

                <Icon size={60} name="flight-land" />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Arrive</Text>
                    <Text style={{fontSize: 18}}>{item.arrival}</Text>
                </View>
                

            
            </View>

            <Divider style={{margin: 10}}  />

            <Text>Flight time: 2h, 15min., same day arrival</Text>
            
        </Layout>
    );
}

export default BookingDetails;