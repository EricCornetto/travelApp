import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text,  Button, Divider, Input  } from '@ui-kitten/components'
import { Icon, Overlay,   } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const BookingHotelAndFlight = ({ route,navigation }) => {

    const {item} = route.params

    const [hotel, setHotel] = useState({});
    const [flight, setFlight] = useState({});
    const [visible, setVisible] = useState(false);
    const [cardNumber, setCardNumber] = useState();
    const [exp, setExp] = useState();
    const [cvv, setCvv] = useState();
    const [cardHolder, setCardHolder] = useState();

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const user = auth().currentUser;

    const confirmPayment = () => {
        firestore()
            .collection('booking')
            .add({
                user_id: user.email,
                place_id: item.key,
                title: item.title,
                total_price: parseInt(hotel.price.substring(1)) + parseInt(flight.price.substring(1)),
                flight_departure: flight.departure,
                flight_arrival: flight.arrival,
                flight_name: flight.name,
                hotel_name: hotel.name,
                image: item.photo,
                cardNumber: cardNumber,
                exp: exp,
                cvv: cvv,
                cardHolder: cardHolder
            }).then(() => {
                console.log('Payment Successfull');

                Alert.alert(
                    'Confirm Payment',
                    'Your Payment has been Successfully',
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                toggleOverlay();
                            }
                        }
                    ],
                    {cancelable: false}
                )
            })
    }
    

    useEffect(() => {
        const subscriber = firestore()
            .collection('hotel')
            .where('place_id','==', item.key)
            .onSnapshot(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                   setHotel(documentSnapshot.data())
                });

            })
        return () => subscriber();
    },[])

    useEffect(() => {
        const subscriber = firestore()
            .collection('flight')
            .where('place_id','==', item.key)
            .onSnapshot(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                    setFlight(documentSnapshot.data())
                });

            })
        return () => subscriber();
    },[])

   

    return(
        <ScrollView>
                    <ImageBackground style={{width: 420, height: 300}} source={{uri: item.photo}}>
                    <View style={{flexDirection: 'row',}}>
                        <Icon size={50} style={{marginTop: 200, marginLeft: 2, bottom: 10}} name="flight-takeoff" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text style={{marginTop: 200, fontWeight: 'bold', color: '#fff'}}>Departure</Text>
                            <Text style={{fontWeight: 'bold', color: '#fff'}}>{flight.departure}</Text>
                        </View>
                        <Icon size={50} style={{marginTop: 200, marginLeft: 50, bottom: 10}} name="flight-land" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text style={{marginTop: 200, fontWeight: 'bold', color: '#fff' }}>Arrive</Text>
                            <Text style={{fontWeight: 'bold', color: '#fff'}}>{flight.arrival}</Text>
                        </View>
                    </View>
                    <Text style={{margin: 5, marginLeft: 20,fontWeight: 'bold', color: '#fff'}}>Flight time: 2h. 15., same day arrival</Text>
                    </ImageBackground>
                    <Divider />

                    

                    <View style={{backgroundColor: 'white'}}>
                        <View style={{margin: 10,  flexDirection: 'row', margin: 20}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{color: 'gray'}}>Class</Text>
                                <Text style={{fontWeight: 'bold', marginBottom: 10, fontSize: 20}}>Economy</Text>
                                <Text style={{color: 'gray'}}>Passenger</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>2</Text>
                            </View>

                            <Divider />
                            
                            <View style={{flexDirection: 'column', marginLeft: 80}}>
                                <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 15, color: '#3588E7' }}>{flight.price}</Text>
                                <Text>/ per person</Text>
                            </View>
                            
                        </View>

                        <View style={{marginTop: 10, backgroundColor: '#fff' }}>
                        <ImageBackground style={{width: 420, height: 300}} source={{uri: hotel.image}}> 

                        </ImageBackground>


                <Text style={{margin: 10, fontWeight: 'bold', fontSize: 20}}>{hotel.name}</Text>

                    <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                        <Icon name="location-outline" type="ionicon" color='#3588E7' />
                        <Text style={{color: '#3588E7'}}>{item.title}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 40, color: '#3588E7', marginHorizontal: 150}}>{flight.price}</Text>
                     </View>
                    
                    <Text style={{margin: 10, fontWeight: 'bold'}}>Amenities</Text>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Icon style={{marginLeft: 10}} name="kitchen" />
                            <Text style={{marginLeft: 5}}>Kitchen</Text>
                            <Icon style={{marginLeft: 60}} name="tv" />
                            <Text style={{marginLeft: 5}}>Cable TV</Text>
                        </View>

                        <View style={{flexDirection: 'row',marginBottom: 10}}>
                            <Icon style={{marginLeft: 10}} name="air-conditioner" type="material-community" />
                            <Text style={{marginLeft: 5}}>AC</Text>
                            <Icon style={{marginLeft: 90}} name="dishwasher" type="material-community" />
                            <Text style={{marginLeft: 5}}>Washer</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Icon style={{marginLeft: 10}} name="wifi" type="material-community" />
                            <Text style={{marginLeft: 5}}>WIFI</Text>
                            <Icon style={{marginLeft: 80}} name="pool" type="material-community" />
                            <Text style={{marginLeft: 5}}>Swimming Pool</Text>
                        </View>

                    <Divider />

                    <Text style={{margin: 10, fontWeight: 'bold'}}>Sleeping Arrangements</Text>

                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Icon style={{marginLeft: 10}} name="king-bed" />
                            <Text style={{marginLeft: 5}}>1 King Bed</Text>
                            <Icon style={{marginLeft: 40}} name="bed" type="ionicon" />
                            <Text style={{marginLeft: 5}}>1 Queen Bed</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Icon style={{marginLeft: 10}} name="sofa" type="material-community" />
                            <Text style={{marginLeft: 5}}>1 Sofa Bed</Text>
                    </View>

                    
                    
                    <Button onPress={toggleOverlay} activeOpacity={0.6} style={{backgroundColor: '#3588E7', borderColor: '#3588E7' }}>BOOKING HOTEL AND FLIGHT</Button>
                    
                    <Divider />

                    </View>

                    <Divider />
                   
                    </View>

                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: 300, height: 50, backgroundColor: '#3588E7', marginBottom: 20}}>
                                <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#fff', margin: 10}}>Payment Method</Text>
                            </View>

                            <Input style={{width: 250}} label={
                                <Text>CARD NUMBER</Text>
                            } onChangeText={value => setCardNumber(value)} placeholder="123 456 789" />
                            
                            <View style={{flexDirection: 'row'}}>
                                <Input style={{margin: 10, width: 170}} label={
                                    <Text>EXPIRATION DATE</Text>
                                } onChangeText={value => setExp(value)} placeholder="11 / 23" />
                                <Input style={{margin: 10}} label={
                                    <Text>CVV</Text>
                                } onChangeText={value => setCvv(value)} secureTextEntry={true} placeholder="000" />
                            </View>

                            <Input style={{width: 250}} label={
                                <Text>CARD HOLDER'S NAME</Text>
                            } onChangeText={value => setCardHolder(value)} placeholder="John Doe" />
                            <TouchableOpacity onPress={confirmPayment} >
                            <View style={{width: 300, height: 50, backgroundColor: '#2DCC70', marginTop: 20}}>
                                <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#fff', margin: 10}}>Confirm Payment</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                    </ScrollView>
    );
}

export default BookingHotelAndFlight;