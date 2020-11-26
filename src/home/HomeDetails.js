import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { Text, Divider, Avatar, Input, Icon, Button } from '@ui-kitten/components';
import { Badge,  Tile, Rating, Image } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { PagerDotIndicator, IndicatorViewPager,  } from '@shankarmorwal/rn-viewpager';

const HomeDetails = ({navigation}) => {

    var user = auth().currentUser;
    const [places, setPlaces] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, updateState] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [isWishlist, setIsWishList] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState();
        wait(2000).then(() => setRefreshing(false));
    });


  


    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .onSnapshot((querySnapshot) => {
            const place = [];

            querySnapshot.forEach(documentSnapshot => {
                place.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setPlaces(place);
            setLoading(false);
        });

        return () => subscriber();
    }, []);


    useEffect(() => {
        const subscriber = firestore()
        .collection('places')
        .where('rating', '==', 5)
        .onSnapshot((querySnapshot) => {
            const place = [];

            querySnapshot.forEach(documentSnapshot => {
                place.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setMostPopular(place)
            setLoading(false);
        });

        return () => subscriber();
    }, []);


    if(loading) {
        return <ActivityIndicator />;
    }



    return(
         
                <FlatList  refreshing={refreshing} onRefresh={onRefresh} 
                data={places} ListHeaderComponent={
                    <>
                <View style={styles.container}>
                   <View style={styles.header}>
                        <Text style={styles.display_name}> Hai, {user.displayName}!     </Text>
                        <TouchableOpacity onPress={(() => navigation.push('Home', {screen: 'Profile'}))}>
                            <Avatar style={styles.avatar} source={{uri: user.photoURL ? user.photoURL : 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fprofile.png?alt=media&token=57861e23-e813-4236-9cba-b2a127446d9f'}} />
                            <Badge status="success" containerStyle={{position: 'absolute', top: 45, right: 0}} />
                        </TouchableOpacity>
                        
                   </View>
                <Divider />
                <View style={styles.header_bot}>
                    <Text style={styles.where_text}>Where</Text>
                    <Text style={styles.will_you_go_text}>Will you go</Text>
                    <Text style={styles.today_text}>today</Text>

                    <Input style={styles.input} accessoryLeft={searchIcon} placeholder="What would you like to discover?" />
                   
                    </View>
                    
      
                </View>

                <View>
                    <Text style={styles.hot_place_text}>Most Popular</Text>
                    <Divider />
                </View>
                
                <View style={styles.hot_place}>
            
                <IndicatorViewPager style={styles.pagerStyle}
                indicator={
                    <PagerDotIndicator pageCount={4} />
                }>

                
                    {
                        mostPopular.map((item,key) => (
            
                            <Tile key={key} onPress={() => navigation.push('PlaceDetails', {item: item})}
                            imageSrc={{uri: item.photo}}
                            title={item.title}
                            >
                            <View style={styles.rating_container}>
                            <Rating readonly imageSize={18}  startingValue={item.rating} />
                            </View>
                            
                            <Text style={styles.sub_header_text}>{item.sub_header}</Text>
                            </Tile>
                      
                        ))
                    }
                    </IndicatorViewPager>
                </View>

                <View>
                    <Text style={styles.hot_place_text}>Discovery</Text>
                </View>
                    </>
                }
                renderItem={({item}) => (
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
                    
                )}
                
                />   
    );
}

const searchIcon = (props) => (
    <Icon {...props} name="search" />
);

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
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#3588E7',
        borderBottomRightRadius: 100,

    },
    hot_place_text: {
        marginLeft: 10, 
        marginTop: 30, 
        fontWeight: 'bold', 
        fontSize: 18,
    },
    pagerStyle: {
        height: 350
      },
    display_name: {
        color: '#FFFFFF',
        marginTop:50,
        fontSize: 18,
        fontWeight: 'bold'
    },
    avatar: {
        width: 50, 
        height: 50,
        marginTop: 40
    },
    input: {
        width: 350,
        marginBottom: 50,
        marginTop: 20,
        borderRadius: 100,
        borderColor: '#3588E7'
    },
    header: {
        flexDirection: 'row',
        marginTop: 5
    },
    header_bot: {
        flexDirection: 'column',
        margin: 10
    },
    where_text: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold'
    },
    will_you_go_text: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold'
    },
    today_text: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold'
    },
    hot_place: {
        justifyContent: 'center', 
        backgroundColor: '#FFFFFF', 
        marginTop: 10,
        
    },
    rating_container: {
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    sub_header_text: {
        marginBottom: 20
    }
})

export default HomeDetails;