import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native';
import { Layout, Text, Button, Input, Icon, CheckBox, } from '@ui-kitten/components';
import { GoogleSignin } from '@react-native-community/google-signin';


const Signin = ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [checked, setChecked] = useState(false);


    const emailIcon = (props) => (
        <Icon  {...props} name='email'/>
    );

    const passwordIcon = (props) => (
        <Icon {...props} name='lock' />
    );

    const googleIcon = (props) => (
        <Image {...props} style={{width: 50, height: 50}} source={require('../asset/img/search.png')} />
    );

    const facebookIcon = (props) => (
        <Image {...props} style={{width: 50, height: 50}} source={require('../asset/img/facebook.png')} />
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
            if(error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error)
        })
    }

    async function onGoogleButtonPress(){
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(OnAuthStateChanged);
        return subscriber;
    }, [])

    if(initializing) return null;

    if(!user) {
        return (
            <ScrollView>
            <Layout style={styles.container}>
                <View style={styles.layout}>
                    <Text style={styles.text} >Sign In</Text>
                    <Input style={styles.input} label={<Text style={styles.label}>Email</Text>} placeholder="Enter your Email" onChangeText={(value) => setEmail(value)} 
                    accessoryLeft={emailIcon} />
                    <Input style={styles.input} label={<Text style={styles.label}>Password</Text>} placeholder="Enter your Password" 
                    accessoryRight={renderIcon} accessoryLeft={passwordIcon} secureTextEntry={secureTextEntry} onChangeText={(value) => setPassword(value)} />
                    <Text style={styles.forgot_pass} >Forgot Password?</Text>
                    <CheckBox  style={styles.checkbox} checked={checked} onChange={value => setChecked(value)}><Text style={styles.label}>Remember me</Text></CheckBox>
                    <Button activeOpacity={0.6} style={styles.button} onPress={Login}>
                        <Text style={styles.login_text}>Login</Text>
                    </Button>
                    <Text style={styles.text_or}>- OR -</Text>
                    <Text style={styles.text_or}>Sign in With</Text>
                    <View style={styles.signin_label}>
                        <Button activeOpacity={0.6} style={styles.signin_button} onPress={onGoogleButtonPress} accessoryRight={googleIcon}></Button>
                        <Button activeOpacity={0.6} style={styles.signin_button} accessoryRight={facebookIcon}></Button>
                    </View>
                    <View style={styles.dont_have_account_container}>
                        <Text style={styles.dont_have_account_text}>Don't have an Account? <Text style={styles.signup_text} onPress={() => navigation.navigate('Signup')} >Sign up</Text></Text>
                    </View>
                </View>  
            </Layout>
            </ScrollView>
        );
    } 

    return(
        <Layout onLayout={() => navigation.push('Home',{screen: 'Home', })}>
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
        fontWeight: 'bold',
        marginTop: 10
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: 350,
        marginTop: 10,
        borderRadius: 100
    },
    login_text: {
        color: '#3588E7',
        fontSize: 28
    },
    input: {
        width: 350,
        paddingTop: 10
    },
    label: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 5,
    },
    forgot_pass: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 5,
        marginLeft: 240,
        paddingTop: 5
    },
    checkbox: {
        marginRight: 210,
        paddingBottom: 5,
    },
    text_or: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingBottom: 5,
        paddingTop: 10
    },
    signin_button: {
        width: 70,
        height: 70,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        margin: 15
    },
    signin_label: {
        flexDirection: 'row'
    },
    dont_have_account_container: {
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 150
    },
    dont_have_account_text: {
        color : '#FFFFFF',
        fontSize: 13
    },
    signup_text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default Signin;