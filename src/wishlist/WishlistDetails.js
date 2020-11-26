import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Layout, Divider, Avatar } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Rating } from 'react-native-elements';

const WishlistDetails = ({navigation}) => {

    const [wishlisted, setWishListed] = useState([]);
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [, updateState] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false))
    })

    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .where('wishlist','==',true)
        .onSnapshot((querySnapshot) => {
            const place = [];

            querySnapshot.forEach(documentSnapshot => {
                place.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setWishListed(place)
            setLoading(false)
        })

        return () => subscriber();
    }, [])

    return(
        <FlatList refreshing={refreshing} onRefresh={onRefresh}
        data={wishlisted} renderItem={({item}) => (
            <View style={styles.discover_container}>
            <TouchableOpacity onPress={() => navigation.push('PlaceDetails', {item})}>
            <View style={styles.item_container}>
                <Image style={styles.item_image} source={{uri: item.photo}} />
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.item_title}>{item.title}</Text>
                        <Image style={styles.item_flag} source={{uri: item.flag}} />
                    </View>
                    
                    <Text style={styles.sub_header}>{item.sub_header}</Text>

                    <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity  >
                    <Avatar style={styles.wishlist} 
                    source={{uri: item.wishlist ? 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fheart.png?alt=media&token=368f4e5b-5139-4b54-b6c1-53d8f30d822c'
                     : 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fheart-outline.png?alt=media&token=b2e167b5-a284-4f5f-851b-1ddf6f606f1d'}}
                    />
                    </TouchableOpacity>
                    
                    </View>
                </View>
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
    },
    item_image: {
        width: 180, 
        height: 140
    },
    item_container: {
        flexDirection: 'row', 
        margin: 5,
    },
    discover_container: {
        backgroundColor: '#FFFFFF',
        marginBottom: 5
    },
})

export default WishlistDetails;