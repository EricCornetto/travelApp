import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { Layout, Button, Input, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Text } from 'react-native';

const Signup = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Register() {
        auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            console.log('User account creayed & signed in!');
        })
        .catch(error => {
            if(error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if(error.code === 'auth/invalid-email') {
                console.log('That email address is invalid');
            }

            console.error(error);
        })
    }

    return(
        <Layout style={styles.container}>
            <View style={styles.layout}>
                <Text style={styles.text}>Sign Up</Text>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3588E7',
        flexDirection: 'column',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 31,
        fontWeight: 'bold'
    },

})

export default Signup;