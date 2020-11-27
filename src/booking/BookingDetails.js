import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements';

const BookingDetails = () => {

    const [hotelBook,setHotelBook] = useState([]);
    const [flightBook,setFlightBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false))
    });

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .where('flight_book','==',true)
        .onSnapshot((querySnapshot) => {
            const place = [];

            querySnapshot.forEach(documentSnapshot => {
                place.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });

            setFlightBook(place);
            setLoading(false)
        })

        return () => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .where('hotel_book','==',true)
        .onSnapshot((querySnapshot) => {
            const place = [];

            querySnapshot.forEach(documentSnapshot => {
                place.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });

            setHotelBook(place)
            setLoading(false)
        })

        return () => subscriber();
    }, [])

    return(
        <FlatList refreshing={refreshing} onRefresh={onRefresh}
         data={hotelBook} ListHeaderComponent={
             <>
             <View>
                 <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>Flight</Text>

                 {
                     flightBook.map((item) => (
                        <View style={{flexDirection: 'row', margin: 10}}>
                        <Image style={{width: 200, height: 100}} source={{uri: item.photo}} />
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontWeight: 'bold', margin: 10}}>{item.title} Flight</Text>
                            <View style={{flexDirection: 'row',}}>
                                <Icon color='#3588E7' name="location-outline" type="ionicon" />
                                <Text style={{color: '#3588E7'}}>{item.country}, {item.title}</Text>
                            </View>
                                <Text style={{fontWeight: 'bold', fontSize: 21, marginLeft: 10}}>{item.flight_price}</Text>
                            </View>
                         </View>                       
                     ))
                 }
            
            <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>Hotel</Text>
                 
             </View>
             </>
         } renderItem={({item}) => (
            <View style={{flexDirection: 'row', margin: 10}}>
                <Image style={{width: 200, height: 100}} source={{uri: item.hotel_photo}} />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontWeight: 'bold', margin: 10}}>{item.hotel} Hotel</Text>
                    <View style={{flexDirection: 'row',}}>
                        <Icon color='#3588E7' name="location-outline" type="ionicon" />
                        <Text style={{color: '#3588E7'}}>{item.country}, {item.title}</Text>
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 21, marginLeft: 10}}>{item.hotel_price}</Text>
                </View>
            </View>
        )}>

        </FlatList>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout);
    });
}


export default BookingDetails;