import React, { useCallback, useState } from 'react';
import { Text, Avatar, Layout, Button,  Divider, Input, Icon, Popover, } from '@ui-kitten/components';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, TouchableOpacity, ScrollView, RefreshControl  } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';




const ProfileDetails = ({navigation}) => {

    var user = auth().currentUser;
    var filePath;
    var fileName;

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [securityTextEntry, setSecurityTextEntry] = useState(true);
    const [newPass, setNewPass] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [, updateState] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateState;
        wait(2000).then(() => setRefreshing(false));
    }, []);

    async function downloadURL(fileName){
        const url = await storage().ref('images/' + fileName ).getDownloadURL();
        console.log(url)

        user.updateProfile({
            photoURL: url
        }).then(() => {
            console.log('Update Profile Successfull');
        })
    }

    const forceUpdate = useState()[1].bind(null, {})

 
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

    const logoutIcon = (props) => (
        <Icon {...props} name="log-out-outline" />
    );

    const ToggleIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecurityTextEntry}>
            <Icon {...props} name={securityTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const toggleSecurityTextEntry = () => {
        setSecurityTextEntry(!securityTextEntry)
    }


    function Edit() {
        if (edit === false) {
            setEdit(true);
            console.log('Edit : ' + edit);
        }

    }

    function Save() {
        if(edit === true) {
            
            
            if(name == "") {
                setName(user.displayName);
            }


            user.updateProfile({
                displayName: name,

            }).then(() => {
                console.log('Update Profile Successfully');
                console.log()
                setEdit(false);
                forceUpdate();
            })

            

        }
        
    }

    function Logout(){
        
        Alert.alert(
            "Are you leaving?",
            "Are you sure want to log out?",
            [
                {
                    text: "Yes",
                    onPress: () => auth().signOut().then(() => {
                        console.log('user signed out');
                        navigation.push('Signin');
                    })
                },
                {
                    text: "Cancel",
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false}
        )

        return null;
    }

    function updatePassword() {
        user.updatePassword(newPass).then(() => {
            console.log('Update Password Success');
            Alert.alert(
                "Update Password Successfully",
                "You're password has been updated, re-login to check it out",
                [
                    {
                        text: "Ok",
                        onPress: () => setVisible(false)
                    }
                ],
                {cancelable: false}
            );
        });
    }

    function verifyEmail() {

        if(user.emailVerified === true) {
            Alert.alert(
                "Your Email has been verified",
                "Your Email has been verified sucessfully",
                [
                    {
                        text: "Ok",
                        onPress: forceUpdate
                    }
                ],
                {cancelable: false}
            );
        } else {

        user.sendEmailVerification()
        .then(() => {
            Alert.alert(
                "A verification link has been sent to your email accout",
                "Please click on the link that has just been sent to your email account to verify your email",
                [
                    {
                        text: "Ok",
                        onPress: forceUpdate
                    }
                ],
                {cancelable: false}
            );
            console.log("Send Email Verification is Success");
        })

    }
    }

    const renderToggleButton = () => (
        <Button accessoryLeft={passwordIcon} style={styles.button} onPress={() => setVisible(true)}>Update Password</Button>
    );

    function chooseImage() {

        const options = {
            title: 'Select Photo',
            cameraType: 'front',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
            },
            path: 'images',
        };
    
        ImagePicker.showImagePicker(options, (response) => {
            console.log("Response = ", response)
            
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button : ', response.customButton);
                alert(response.customButton);
            } else {
                filePath = response.path;
                fileName = response.fileName;
                
                storage().ref('images/' + fileName).putFile(filePath).then(() => {
                    console.log("UPLOADED");
                    downloadURL(fileName);
                    forceUpdate;
                })
            }
                 
        })      
    }




    return(
        <Layout style={styles.layout}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >
            <View style={styles.container}>
                <TouchableOpacity onPress={chooseImage}>
                <Avatar style={styles.avatar} source={{uri: user.photoURL ? user.photoURL : 'https://firebasestorage.googleapis.com/v0/b/travelapp-86794.appspot.com/o/icons%2Fprofile.png?alt=media&token=57861e23-e813-4236-9cba-b2a127446d9f'}} />
                </TouchableOpacity>
                
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
                    <Input accessoryLeft={emailVerIcon} placeholder={user.emailVerified ? "Verified" : "Not Verified"} label={<Text style={styles.label}>Email Verified</Text>} />
                </View>
               

                <View style={styles.button_layout}>
                    <Button activeOpacity={0.6} accessoryLeft={editIcon} style={styles.button_up} onPress={edit ? Save : Edit }>{edit ? "Save" : "Edit"}</Button>
                    <Button activeOpacity={0.6} accessoryLeft={emailVerIconButton} style={styles.button_up} onPress={verifyEmail}>Verify Email</Button>
                    
                </View>
                
                <Popover 
                    backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    visible={visible}
                    anchor={renderToggleButton}
                    onBackdropPress={() => setVisible(false)}
                >
                    <Layout style={styles.popover_container}>
                        <Text style={styles.popover_text_header}>Update Password</Text>
                        <Input style={styles.popover_input}  accessoryLeft={passwordIcon} accessoryRight={ToggleIcon} secureTextEntry={securityTextEntry} placeholder="Enter your new password" label={<Text style={styles.popover_label}>New Password</Text>} onChangeText={(value) => setNewPass(value)} />
                        <Button activeOpacity={0.6} style={styles.popover_button}>
                        <Text style={styles.popover_button_text} onPress={updatePassword}>Save</Text>
                        </Button>
                    </Layout>
                </Popover>

                <Button activeOpacity={0.6} style={styles.button} onPress={Logout} accessoryLeft={logoutIcon}>Logout</Button>
            </View>
            <Divider />

            </ScrollView>
        </Layout>
        
    );
}

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve,timeout);
    })
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
    avatar: {
        width: 150,
        height: 150
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
        width: 180,
        borderColor: '#3588E7'
    },
    button: {
        backgroundColor: '#3588E7',
        marginTop: 5,
        marginLeft: 7,
        borderColor: '#3588E7'
    },
    popover_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3588E7',
        height: 360,
        width: 380,
        borderTopRightRadius: 180,
    },
    popover_text_header: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 31,
        marginBottom: 10
    },
    popover_input: {
        width: 350,
        margin: 20,
        marginBottom: 5
    },
    popover_button : {
        backgroundColor: '#FFFFFF',
        width: 350,
        borderRadius: 100,
    },
    popover_button_text: {
        color: '#3588E7',
        fontWeight: 'bold'
    },
    popover_label: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default ProfileDetails;