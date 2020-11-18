import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { Layout, Button, Input, Icon, } from '@ui-kitten/components';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

const Signup = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const emailIcon = (props) => (
        <Icon  {...props} name='email'/>
    );

    const passwordIcon = (props) => (
        <Icon {...props} name='lock' />
    );

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    )

    function Register() {

        if(password === confirmPass) {
            auth().createUserWithEmailAndPassword(email,password)
            .then(() => {
                console.log('User account creayed & signed in!');
                navigation.navigate('Signin')
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
        } else {
            console.log('Password dont Match!');
        }

       
    }

    return(
        <Layout style={styles.container}>
            <View style={styles.layout}>
                <Text style={styles.text}>Sign Up</Text>
                <Input style={styles.input} label={<Text style={styles.label}>Email</Text>} placeholder="Enter your Email" onChangeText={(value) => setEmail(value)} 
                    accessoryLeft={emailIcon} />
                <Input style={styles.input} label={<Text style={styles.label}>Password</Text>} placeholder="Enter your Password" accessoryRight={renderIcon}
                accessoryLeft={passwordIcon} secureTextEntry={secureTextEntry} onChangeText={(value) => setPassword(value)} />
                <Input style={styles.input} label={<Text style={styles.label}>Confirm Password</Text>} placeholder="Confirm Password" accessoryRight={renderIcon}
                accessoryLeft={passwordIcon} secureTextEntry={secureTextEntry} onChangeText={(value) => setConfirmPass(value)} />
                <Button style={styles.button}>
                    <Text style={styles.register_text} onPress={Register}>Register</Text>
                </Button>
                <View style={styles.have_account_container}>
                    <Text style={styles.have_account_text}>Have an Account ? <Text style={styles.signin_text} onPress={() => navigation.navigate('Signin')}>Sign in</Text></Text>
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
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
    input : {
        width:350,
        paddingTop: 10,

    },
    label: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 5,  
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: 350,
        marginTop: 25,
        borderRadius: 100
    },
    register_text: {
        color: '#3588E7',
        fontSize: 28
    },
    have_account_text: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    signin_text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    have_account_container: {
        marginTop: 350
    }

})

export default Signup;