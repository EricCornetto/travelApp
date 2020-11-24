import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Text, Layout, Divider, Avatar, Input, Icon, ViewPager, Button } from '@ui-kitten/components';
import { Badge, Card, } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeDetails = ({navigation}) => {

    var user = auth().currentUser;
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const shouldLoadComponent = (index) => index === selectedIndex;
    const [, updateState] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false));
    })

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

    if(loading) {
        return <ActivityIndicator />;
    }


    return(
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Layout style={styles.layout}>
           
                <View style={styles.container}>
                   <View style={styles.header}>
                        <Text style={styles.display_name}> Hai, {user.displayName}!     </Text>
                        <TouchableOpacity onPress={(() => navigation.push('Home', {screen: 'Profile'}))}>
                            <Avatar style={styles.avatar} source={{uri: user.photoURL}} />
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


                <Divider />
                <View style={styles.content}>
                <ViewPager
                selectedIndex={selectedIndex}
                shouldLoadComponent={shouldLoadComponent}
                onSelect={index => setSelectedIndex(index)}
                >
                <FlatList  refreshing={refreshing} onRefresh={onRefresh}
                data={places}
                renderItem={({item}) => (
                       <Card containerStyle={styles.card}>
                           <Card.Title style={styles.text_header}>{item.title}</Card.Title>
                           <Card.Divider />
                           <Card.Image source={{uri: item.photo}} />
                           <Text style={styles.text_content}>
                                {item.content}
                           </Text>
                           <Button style={styles.button}>Check Now!</Button>
                       </Card>
                )}/>
                </ViewPager>
                </View>
                
               
                
        </Layout>
        </ScrollView>
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
    layout: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#3588E7',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    content: {
        backgroundColor: '#FFFFFF',
        margin: 10,
        
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
    card: {
        margin: 1,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 10
      },
    button: {
        borderRadius: 100,
        backgroundColor: '#3588E7',
        borderColor: '#3588E7',
    },
    text_header: {
        fontWeight: 'bold',
        fontSize: 22
    },
    text_content: {
        fontSize: 18,
        margin: 10,
        textAlign: 'justify'
    }
})

export default HomeDetails;