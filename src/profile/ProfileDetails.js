import React, { useState } from 'react';
import { Text, Avatar, Layout, Button,  Divider, Input, Icon } from '@ui-kitten/components';
import { View, StyleSheet,  } from 'react-native';
import auth from '@react-native-firebase/auth';





const ProfileDetails = ({navigation}) => {

    var user = auth().currentUser;

    var verified;

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const passwordIcon = (props) => (
        <Icon {...props} name="lock" />
    );
    
    
    const displayNameIcon = (props) => (
        <Icon {...props} name="person-outline" />
    );
    
    const emailIcon = (props) => (
        <Icon {...props} name="email-outline" />
    );
    
    const emailVerIconButton = (props) => (
        <Icon {...props} name="email" />
    );
    
    const emailVerIcon = (props) => {
        if(user.emailVerified === false) {
            return <Icon {...props} name="close-circle-outline" />
        } else if(user.emailVerified === true) {
            return <Icon {...props} name="checkmark-circle-outline" />
        }
    }
    
    const editIcon = (props) => (
      <Icon {...props} name={edit ? "save-outline" : 'edit-outline' } />  
    );
    
    const phoneIcon = (props) => (
        <Icon {...props} name="phone-outline" />
    );

    if(user.emailVerified === false) {
        verified = "Not Verified";
    } else {
        verified = "Verified";
    }

    function Edit() {
        if (edit === false) {
            setEdit(true);
            console.log('Edit : ' + edit);
        }

    }

    function Save() {
        if(edit === true) {
            setEdit(false);
            

            user.updateProfile({
                displayName: name,

            }).then(() => {
                setName('');
                console.log("Update Display Name is Successful");
            })

        }
        
    }

    function verifyEmail() {
        user.sendEmailVerification()
        .then(() => {
            console.log("Send Email Verification is Success");
        })
    }

    function updatePassword() {

    }


    return(
        <Layout style={styles.layout}>
            <View style={styles.container}>
                <Avatar on style={{width: 150, height: 150}} source={require('../asset/img/profile.png')} />
                <Text style={styles.displayName}>{user.displayName}</Text>
            </View>
            <Divider />

            <View style={styles.information_profile} >

                <View pointerEvents={edit ? null : "none"}>
                    <Input accessoryLeft={displayNameIcon} onChangeText={(value) => setName(value)}  placeholder={user.displayName} label={<Text style={styles.label}>Display Name</Text>} />
                    <View pointerEvents="none">
                        <Input accessoryLeft={emailIcon} placeholder={user.email} label={<Text style={styles.label}>Email</Text>} />
                    </View>
                    <Input accessoryLeft={phoneIcon} onChangeText={(value) => setPhone(value)} placeholder={user.phoneNumber} label={<Text style={styles.label}>Phone</Text>} />
                    <Input accessoryLeft={emailVerIcon} placeholder={verified} label={<Text style={styles.label}>Email Verified</Text>} />
                </View>
               

                <View style={styles.button_layout}>
                    <Button accessoryLeft={editIcon} style={styles.button_up} onPress={edit ? Save : Edit }>{edit ? "Save" : "Edit"}</Button>
                    <Button accessoryLeft={emailVerIconButton} style={styles.button_up} onPress={verifyEmail}>Verify Email</Button>
                </View>
                    
                    <Button accessoryLeft={passwordIcon} style={styles.button} onPress={updatePassword}>Update Password</Button>
                
            </View>
            <Divider />

           
        </Layout>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3588E7'
    },
    displayName: {
        color: '#FFFFFF',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    layout: {
        flex: 1,
    },
    information_profile: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        margin: 20,
    },
    text_information: {
        color: '#3588E7',
        fontWeight: 'bold'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15
    },
    button_layout: {
        flexDirection: 'row',
        margin: 5,
    },
    button_up: {
        backgroundColor: '#3588E7',
        margin: 2,
        marginTop: 10,
        height: 50,
        width: 180
    },
    button: {
        backgroundColor: '#3588E7',
        margin: 2,
        marginLeft: 7
    }
})

export default ProfileDetails;