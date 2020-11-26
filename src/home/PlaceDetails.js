import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Layout, Text, Avatar,  } from '@ui-kitten/components'
import { Rating, Card, Button, Icon  } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const PlaceDetails = ({route,navigation}) => {

    const {item} = route.params
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();
    const [wishlist, setWishlist] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        updateState;
        wait(2000).then(() => setRefreshing(false))
    })

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .doc(item.title.toLowerCase())
        .onSnapshot(documentSnapshot => {
            setWishlist(documentSnapshot.data().wishlist)
        });

        return () => subscriber();
    },[])

    function updateWishList(){
        firestore()
            .collection('places')
            .doc(item.title.toLowerCase())
            .update({
                wishlist: !wishlist
            }).then(() => {
                console.log('Updated')
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
                <View style={styles.rating_container}>
                    <Rating imageSize={20} startingValue={item.rating} />
                    <TouchableOpacity onPress={updateWishList}>
                    <Avatar style={styles.avatar} 
                            source={{uri: wishlist ? 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fheart.png?alt=media&token=368f4e5b-5139-4b54-b6c1-53d8f30d822c' 
                            : 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fheart-outline.png?alt=media&token=b2e167b5-a284-4f5f-851b-1ddf6f606f1d'  }}
                            />
                    </TouchableOpacity>
                    
                </View>
                <Text style={{fontWeight: 'bold', marginBottom: 10}}>{item.visitors} Visitors</Text>

                <Text style={styles.content}>{item.content}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Card>
                    <Card.Title style={{fontSize: 40, color: '#3588E7'}}>Hotel</Card.Title>
                    <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}} >{item.hotel_price}</Text>
                    <Text style={{textAlign: 'center'}}>1 Person</Text>
                    <Text style={{textAlign: 'center', marginBottom: 10}}>5 Days</Text>
                    <Button icon={
                        <Icon name="hotel" color="white" />
                    } title="BOOK NOW" />
                </Card>
                <Card>
                    <Card.Title style={{fontSize: 40, color: '#3588E7'}}>Flight</Card.Title>
                    <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}} >{item.flight_price}</Text>
                    <Text style={{textAlign: 'center',}}>Economic Class</Text>
                    <Text style={{textAlign: 'center', marginBottom: 10}}>Departure</Text>
                    <Button icon={
                        <Icon name="flight" color="white" />
                    } title="BOOK NOW" />
                </Card>
               
                </View>

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
        textAlign: 'justify'
    },
    avatar: {
        width: 30, 
        height: 30, 
        marginLeft: 240, 
        top: -5
    }
})

export default PlaceDetails;