import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Overlay } from 'react-native-elements';
import { ImageBackground } from 'react-native';

const WishlistDetails = ({navigation}) => {

    const [wishlisted, setWishListed] = useState([]);
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [visible, setVisible] = useState(false);
    const [, updateState] = useState();


    const user = auth().currentUser;

    const toggleOverlay = () => {
        setVisible(!visible)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false))
    })

   useEffect(() => {
       const subscriber = firestore()
        .collection('wishlist')
        .where('user_id', '==', user.email)
        .onSnapshot(querySnapshot => {
            const wish = [];

            querySnapshot.forEach(documentSnapshot => {
                wish.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setWishListed(wish)
        })

        return () => subscriber();
   }, [])



    return(
        <FlatList refreshing={refreshing} onRefresh={onRefresh}
        data={wishlisted} renderItem={({item}) => (
            <View style={styles.discover_container}>
            <TouchableOpacity onPress={() => navigation.push("Booking Hotel And Flight", {item})}>
            <View style={styles.item_container}>
                <ImageBackground imageStyle={styles.item_image} style={styles.item_image} source={{uri: item.image}}> 

                
                    <Text style={styles.item_title}>{item.title}</Text>
    

                    <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity >
                    <Icon style={{marginLeft: '90%', marginTop: '15%'}} color='#3588E7' name="heart" type="ionicon" />
                    </TouchableOpacity>
                    
                  
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
    })
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

export default WishlistDetails;