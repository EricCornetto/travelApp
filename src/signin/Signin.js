import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';


const Signin = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)


    const AlertIcon = (props) => (
        <Icon  {...props} name='alert-circle-outline'/>
    );

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    )

    function OnAuthStateChanged(user) {
        setUser(user);
        if(initializing) setInitializing(false);
    }

    function Login(){

        auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            console.log('User account signed in!');
        })
        .catch(error => {
            if(error.code === 'auth/email-already-in-use'){
                console.log('That email address is already in use!');
            }
            if(error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error)
        })
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(OnAuthStateChanged);
        return subscriber;
    }, [])

    if(initializing) return null;

    if(!user) {
        return (
            <Layout style={styles.container}>
                <View style={styles.layout}>
                    <Text style={styles.text} >Sign In</Text>
                    <Input style={styles.input} label={<Text style={styles.label}>Email Address</Text>} color onChangeText={(value) => setEmail(value)} />
                    <Input style={styles.input} label={<Text style={styles.label}>Password</Text>} placeholder="place yout text" 
                    accessoryRight={renderIcon} caption={<Text style={styles.label}>Should contain at least 8 symbols</Text>}
                    captionIcon={AlertIcon} secureTextEntry={secureTextEntry} onChangeText={(value) => setPassword(value)}
                    />
                    <Button style={styles.button} onPress={Login}>
                        <Text style={styles.login_text}>Login</Text>
                    </Button>
                </View>  
            </Layout>
        );
    }

    return (
        <Layout>

        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#3588E7',
        flexDirection: 'column'
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 31,
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: 350,
        marginTop: 10
    },
    login_text: {
        color: '#3588E7',
        fontSize: 28
    },
    input: {
        width: 350,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 5
    }
})

export default Signin;