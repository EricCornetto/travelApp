import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Icon,  } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Divider } from '@ui-kitten/components';

const BookingList = ({navigation}) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [booking, setBooking] = useState([]);


    const user = auth().currentUser;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false))
    });


    useEffect(() => {
        const subscriber = firestore()
            .collection('booking')
            .where('user_id', '==', user.email)
            .onSnapshot((querySnapshot) => {
                const tmp = [];

                querySnapshot.forEach(documentSnapshot => {
                    tmp.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                })

                setBooking(tmp)
            })
        return () => subscriber();
    }, [])


    return(
        <FlatList refreshing={refreshing} onRefresh={onRefresh}
         data={booking} renderItem={({item}) => (
            <View style={styles.discover_container}>
            <TouchableOpacity>
            <View style={styles.item_container}>
                <ImageBackground imageStyle={styles.item_image} style={styles.item_image} source={{uri: item.image}}> 

                
              

                    <View style={{flexDirection: 'row'}}>
                    <Text style={styles.item_title}>{item.title}</Text>
                    <Text style={{fontWeight: 'bold',  color: '#fff', fontSize: 20, left: 120}}>{item.hotel_name}</Text>
                    </View>
                    <Divider />


                    <View style={{flexDirection: 'row', marginTop: 40}}>
                        <Icon size={50} style={{ marginLeft: 2, bottom: 10}} name="flight-takeoff" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text style={{fontWeight: 'bold', color: '#fff'}}>Departure</Text>
                            <Text style={{fontWeight: 'bold', color: '#fff'}}>{item.flight_departure}</Text>
                        </View>
                        <Icon size={50} style={{ marginLeft: 50, bottom: 10}} name="flight-land" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text style={{fontWeight: 'bold', color: '#fff' }}>Arrive</Text>
                            <Text style={{fontWeight: 'bold', color: '#fff'}}>{item.flight_arrival}</Text>
                        </View>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#3588E7', marginTop: -20 }}>${item.total_price}</Text>

                    </View>

                    <View style={{flexDirection: 'row'}}>
                  
                </View>

                </ImageBackground>
                
                </View>
            
            </TouchableOpacity>

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

const styles = StyleSheet.create({
    sub_header: {
        textAlign: 'justify', 
        marginRight: 200, 
        marginStart: 10
    },
    wishlist: {
        width: 30, 
        height: 30, 
        marginLeft: 160
    },
    item_flag: {
        width: 15, 
        height: 15, 
        marginLeft: 10,
    },
    item_title: {
        marginLeft: 10, 
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff'
    },
    item_image: {
        width: 400, 
        height: 140,
        borderRadius: 10
    },
    item_container: {
        flexDirection: 'row', 
        margin: 5,
    },
    discover_container: {
        backgroundColor: '#FFFFFF',
        marginBottom: 5,
        borderRadius: 20
    },
})


export default BookingList;