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
    const [isFlightBook, setIsFlightBook] = useState(false);
    const [isHotelBook, setIsHotelBook] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isWishlist, setIsWishlist] = useState(false)
    const [wishlistData, setWishlistData] = useState({});

    const user = auth().currentUser;


    const toggleOverlay = () => {
        setVisible(!visible);
    };


    const onRefresh = useCallback(() => {
        setRefreshing(true)
        updateState;
        wait(2000).then(() => setRefreshing(false))
    })

    console.log(item.key)

    useEffect(() => {
        const subscriber = firestore()
            .collection('wishlist')
            .where('place_id','==', item.key)
            .where('user_id','==', user.email)
            .onSnapshot((querySnapshot) => {
                

               if(querySnapshot['docs'] == '') {
                   setIsWishlist(false)
               } else {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.id)
                    setWishlistData(documentSnapshot.id)
               });

                   setIsWishlist(true)
                   
               }

               
               
            })
        
        return () => subscriber();
    }, [])




    const updateWishList = useCallback(() => {

        if(isWishlist === false) {
            
            firestore()
                .collection('wishlist')
                .add({
                    place_id: item.key,
                    user_id: user.email,
                    image: item.photo,
                    title: item.title,
                    rating: 5
                }).then(() => setIsWishlist(true))
        } else {
            firestore()
                .collection('wishlist')
                .doc(wishlistData)
                .delete()
                .then(() => setIsWishlist(false))
        }

       
    }
) 

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
                        <Icon  {...props} color='#3588E7' name={isWishlist? "heart" : "heart-outline"} type="ionicon" />
                    )} ></Button>
                   <Button onPress={() => navigation.push('Booking Hotel And Flight', {item})} activeOpacity={0.6} style={{backgroundColor: '#3588E7', width: 320, borderColor: '#3588E7', borderRadius: 10}} accessoryRight={(props) => (
                       <Icon color='#FFFFFF' {...props} name="arrow-forward-outline" type="ionicon" />
                   )} >Book Trip Now</Button>
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