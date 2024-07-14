import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserEdit = ({ route, navigation }) => {
    const { userId } = route.params;
    const { user } = route.params;
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        phonenumber: '',
        firstname: '',
        lastname: '',
        role: '',
        user:'',
        password:'',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://656591f5eb8bb4b70ef1d670.mockapi.io/projects/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`https://656591f5eb8bb4b70ef1d670.mockapi.io/projects/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log(`User with id ${userId} updated successfully`);
                navigation.goBack();
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    const goBack = () => {
        navigation.goBack();
    };
    const goHome = () => {
        navigation.navigate('Home');
    };
    const goSearch = () => {
        navigation.navigate('Search');
    };
    const goUserList = () => {
        navigation.navigate('UserList');
    };
    const goNotify = () => {
        navigation.navigate('Notify');
    };
    const goMail = () => {
        navigation.navigate('Mail');
    };
    const goSetting = () => {
        navigation.navigate('Setting');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit User</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.firstname}
                    onChangeText={(value) => handleInputChange('firstname', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.lastname}
                    onChangeText={(value) => handleInputChange('lastname', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Role:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.role}
                    onChangeText={(value) => handleInputChange('role', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.phonenumber}
                    onChangeText={(value) => handleInputChange('phonenumber', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>UserName:</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.user}
                        onChangeText={(value) => handleInputChange('user', value)}
                    />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                    /> 
            </View>
            
               
            <Button title="Save Changes" onPress={handleSaveChanges} />
            <TouchableOpacity style={{marginTop: '20px', backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', height: 40, fontWeight: 'bold'}} onPress={()=>goBack()}>
                <Text>CANCEL</Text>
                
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        margin: 10 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 40,
        paddingLeft: 10,
    },
});

export default UserEdit;
