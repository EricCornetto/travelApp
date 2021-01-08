import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, RefreshControl, ImageBackground, Alert, } from 'react-native';
import { Layout, Text,  Button, Divider  } from '@ui-kitten/components'
import { Rating, Icon, Overlay,   } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PlaceDetails = ({route,navigation}) => {

    const {item} = route.params
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [wishlist, setWishlist] = useState(false);
    const [isFlightBook, setIsFlightBook] = useState(false);
    const [isHotelBook, setIsHotelBook] = useState(false);
    const [visible, setVisible] = useState(false);


    const toggleOverlay = () => {
        setVisible(!visible);
    };


    const onRefresh = useCallback(() => {
        setRefreshing(true)
        updateState;
        wait(2000).then(() => setRefreshing(false))
    })

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .doc(item.country.toLowerCase())
        .onSnapshot(documentSnapshot => {
            setWishlist(documentSnapshot.data().wishlist)
        });

        return () => subscriber();
    },[])

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .doc(item.country.toLowerCase())
        .onSnapshot(documentSnapshot => {
            setIsFlightBook(documentSnapshot.data().flight_book)
        });

        return() => subscriber();
    }, [])

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .doc(item.country.toLowerCase())
        .onSnapshot(documentSnapshot => {
            setIsHotelBook(documentSnapshot.data().hotel_book)
        });

        return() => subscriber();
    }, [])



    function updateWishList(){
        firestore()
            .collection('places')
            .doc(item.country.toLowerCase())
            .update({
                wishlist: !wishlist
            }).then(() => {
                console.log('Updated')
            })

    }

    console.log(item.country);

    function updateFlightBook() {
        firestore()
        .collection('places')
        .doc(item.country.toLowerCase())
        .update({
            flight_book: !isFlightBook
        })
    }

    function updateHotelBook() {
        firestore()
        .collection('places')
        .doc(item.country.toLowerCase())
        .update({
            hotel_book: !isHotelBook
        })
    }

    return(
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
        <Layout style={styles.layout}>
           <View style={{flex: 1,borderRadius: 100, }}>
                <Image style={styles.imagebackground} source={{uri: item.photo}} /> 
           </View>

            

            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.header}>{item.title}</Text>
                    <Image style={styles.flag} source={{uri: item.flag}} />
                </View>

                <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                    <Icon name="location-outline" type="ionicon" color='#3588E7' />
                    <Text style={{color: '#3588E7'}}>{item.title}, {item.country}</Text>
                </View>

                <View style={styles.rating_container}>
                    <Rating imageSize={20} startingValue={item.rating} />
                    <Text style={{marginLeft: 8, color: 'gray'}}>({item.rating})</Text>
                    
                  
                    
                </View>
            

                
                
                <Text style={styles.content}>{item.content}</Text>
         
                
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Button onPress={updateWishList} activeOpacity={0.6} style={{marginRight: 5, backgroundColor: 'white', width: 60 , borderRadius: 10, borderColor: '#3588E7'}} accessoryRight={(props) =>(
                        <Icon  {...props} color='#3588E7' name={wishlist ? "heart" : "heart-outline"} type="ionicon" />
                    )} ></Button>
                   <Button onPress={toggleOverlay} activeOpacity={0.6} style={{backgroundColor: '#3588E7', width: 320, borderColor: '#3588E7', borderRadius: 10}} accessoryRight={(props) => (
                       <Icon color='#FFFFFF' {...props} name="arrow-forward-outline" type="ionicon" />
                   )} >Book Trip Now</Button>
                </View>
                    
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={{borderRadius: 100}}>
                    <ScrollView>
                    <ImageBackground style={{width: 300, height: 200}} source={{uri: item.photo}}></ImageBackground>
                    <View style={{flexDirection: 'row',}}>
                        <Icon size={50} style={{marginTop: 10, marginLeft: 2, bottom: 10}} name="flight-takeoff" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text>Departure</Text>
                            <Text>{item.departure}</Text>
                        </View>
                        <Icon size={50} style={{marginTop: 10, marginLeft: 50, bottom: 10}} name="flight-land" />
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Text>Arrive</Text>
                            <Text>{item.arrival}</Text>
                        </View>
                    </View>

                    <Divider />

                    <Text style={{margin: 5, marginLeft: 20}}>Flight time: 2h. 15., same day arrival</Text>

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
                                <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 15, color: '#3588E7' }}>{item.flight_price}</Text>
                                <Text>/ per person</Text>
                            </View>
                            
                        </View>

                   <Button onPress={updateFlightBook} activeOpacity={0.6} style={{backgroundColor: '#3588E7', }}>{isFlightBook ? "BOOKED" : "BOOK THIS FLIGHT"}</Button>
                    </View>

                    <Divider />

                    <View style={{marginTop: 10, }}>
                        <ImageBackground style={{width: 300, height: 200}} source={{uri: item.hotel_photo}} />
                    </View>
                    
                    <Text style={{margin: 10, fontWeight: 'bold', fontSize: 20}}>{item.hotel}</Text>

                    <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                        <Icon name="location-outline" type="ionicon" color='#3588E7' />
                        <Text style={{color: '#3588E7'}}>{item.title}, {item.country}</Text>
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
                    
                    <Button onPress={updateHotelBook} activeOpacity={0.6} style={{backgroundColor: '#3588E7', borderColor: '#3588E7' }}>{isHotelBook ? "BOOKED" : "BOOK THIS HOTEL"}</Button>
                    
                    <Divider />


                    </ScrollView>
                </Overlay>
                

            </View>

            
        </Layout>

               </ScrollView>
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout)
    });
}

const styles = StyleSheet.create({
    flag: {
        width: 50, 
        height: 25 ,
        margin: 10
    },
    rating_container: {
        marginRight: 270,
        flexDirection: 'row'
    },
    layout: {
        flex: 1,
    },
    imagebackground: {
        width: 415, 
        height: 400, 
        borderBottomRightRadius: 100, 
        borderBottomLeftRadius: 100
        
    },
    container: {
        justifyContent: 'center',
        margin: 10,  
        flex: 1,
        marginTop: 30
    },
    header: {
        fontWeight: 'bold',
        fontSize: 31,
        marginTop: 2
    },
    content: {
        textAlign: 'justify',
        marginTop: 10
    },
    avatar: {
        width: 30, 
        height: 30, 
        marginLeft: 240, 
        top: -5
    }
})

export default PlaceDetails;