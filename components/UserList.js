import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput, Picker, Button, TouchableHighlight, TouchableWithoutFeedback  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
// import RNFS from 'react-native-fs';
// import XLSX from 'xlsx';
import { CSVLink } from "react-csv";
// import { launchImageLibrary } from 'react-native-image-picker';


const UserList = ({ navigation, route}) => {
    // const { user } = route.params;

  
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [roleFilter, setRoleFilter] = useState('All');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [hoveredUserId, setHoveredUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        // name: '',
        email: '',
        role: 'User', // default role
        phonenumber: '',
        firstname: '',
        lastname: '',
    });

// console.log(user);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://656591f5eb8bb4b70ef1d670.mockapi.io/projects');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // delete User
    const handleDelete = async (userId) => {
        const userToDelete = users.find(user => user.id === userId);
        if (!userToDelete) {
            console.error(`User with id ${userId} not found.`);
            return;
        }
    
        try {
            const response = await fetch(`https://656591f5eb8bb4b70ef1d670.mockapi.io/projects/${userId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log(`Deleted user with id ${userId}`);
                const updatedUsers = users.filter(user => user.id !== userId);
                setUsers(updatedUsers);
                setSelectedUserId(null);
            } else {
                console.error('Failed to delete user');
                Alert.alert('Delete Failed', 'Failed to delete the user. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Alert.alert('Delete Error', 'An error occurred while deleting the user.');
        }
    };
    

    const handleFilter = (role) => {
        setRoleFilter(role);
        switch (role) {
            case 'Admin':
                setFilteredUsers(users.filter(user => user.role === 'Admin'));
                break;
            case 'User':
                setFilteredUsers(users.filter(user => user.role === 'User'));
                break;
            case 'Editor':
                setFilteredUsers(users.filter(user => user.role === 'Editor'));
                break;
            default:
                setFilteredUsers(users);
                break;
        }
    };

    useEffect(() => {
        handleFilter(roleFilter);
    }, [roleFilter, users]);

    const handlePressIn = (userId) => {
        setSelectedUserId(userId);
    };

    const handlePressOut = () => {
        setSelectedUserId(null);
    };

    const handleInputChange = (field, value) => {
        setNewUser({ ...newUser, [field]: value });
    };

    //Add User
    const handleAddUser = async () => {
        try {
            const response = await fetch('https://656591f5eb8bb4b70ef1d670.mockapi.io/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const addedUser = await response.json();
                setUsers([...users, addedUser]);
                setFormVisible(false);
                setNewUser({
                    // name: '',
                    email: '',
                    role: 'User',
                    phonenumber: '',
                    firstname: '',
                    lastname: ''
                });
            } else {
                Alert.alert('Add User Failed', 'Failed to add the user. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Add User Error', 'An error occurred while adding the user.');
        }
    };

    //Edit User
    const handleEdit = (userId) => {
        navigation.navigate('UserEdit', { userId });
    };
    //Search
    const filterUsers = (query) => {
        const filteredData = users.filter(user =>
            user.firstname.toLowerCase().includes(query.toLowerCase()) ||
            user.lastname.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filteredData);
    };
    
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (text) => {
        setSearchQuery(text);
        filterUsers(text); // Call the filter function with the current search query
    };
    
    useEffect(() => {
        filterUsers(searchQuery);
    }, [searchQuery]);
    
    //Excel
    const handleExportToCSV = () => {
        // Prepare data for CSV
        const csvData = filteredUsers.map(user => ({
            // name: user.name,
            id: user.id,
            email: user.email,
            phonenumber: user.phonenumber,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        }));

        return csvData;
    };

    //Image
    const handleSelectImage = () => {
        const options = {
            mediaType: 'photo',
        };
    
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setNewUser({ ...newUser, avatar: source });
            }
        });
    };

    //Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số lượng mục trên mỗi trang
    
    //xu ly phan trang
    const paginateUsers = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredUsers.slice(startIndex, endIndex);
    };
    


    


    const goBack = () => {
        navigation.goBack();
    };
    const goHome = () => {
        navigation.navigate('Home', { user: user });
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
        <View style={{ flex: 1, margin: 5 }}>
            <View style={styles.header}>
                <Text style={styles.title}>HRDept Company</Text>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name='notifications-outline' size={25} color='#red' />
                    {/* {count > 0 && (
                        <Badge
                            value={count}
                            status="error"
                            containerStyle={styles.badgeContainer}
                            textStyle={styles.badgeText}
                        />
                    )} */}
                </TouchableOpacity>
                {/* <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.user}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                  
                </View> */}
                <TouchableOpacity>
                    {/* <Image style={styles.avatar} source={require('../assets/avt.png')} /> */}
                </TouchableOpacity>
            </View>

            <View style={{ borderRadius: 5, borderWidth: 0.5, borderColor: '#C4C4C4' }} />

            <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingTop: '20px', paddingBottom: '5px', justifyContent: 'space-around' }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>User</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', }}>
                    <CSVLink data={handleExportToCSV()} filename={"users.csv"} >
                        <TouchableOpacity style={{ marginRight: '20px', borderWidth: 0.5, borderColor: 'gray', borderRadius: 5, backgroundColor: '#438932', height: '30px', justifyContent: 'center' }}>
                            <Text>Export to Excel</Text>
                        </TouchableOpacity>
                    </CSVLink>
                    <TouchableOpacity style={{ borderWidth: 0.5, borderColor: 'gray', borderRadius: 5, backgroundColor: '#E52A2A', alignItems: 'center', justifyContent: 'center' }} onPress={() => setFormVisible(true)}>
                        <Text>Add New User</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {isFormVisible && (
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Add New User</Text>
                    <TextInput
                        placeholder="First Name"
                        style={styles.input}
                        value={newUser.firstName}
                        onChangeText={(value) => handleInputChange('firstname', value)}
                    />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.input}
                        value={newUser.lastName}
                        onChangeText={(value) => handleInputChange('lastname', value)}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={newUser.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        style={styles.input}
                        value={newUser.phoneNumber}
                        onChangeText={(value) => handleInputChange('phonenumber', value)}
                    />
                    <Picker
                        selectedValue={newUser.role}
                        style={styles.picker}
                        onValueChange={(value) => handleInputChange('role', value)}
                    >
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Admin" value="Admin" />
                        <Picker.Item label="Editor" value="Editor" />
                    </Picker>
                    <TextInput
                        placeholder="UserName"
                        style={styles.input}
                        value={newUser.user}
                        onChangeText={(value) => handleInputChange('user', value)}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={newUser.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                    />
                    <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
                        <Text>Select Image</Text>
                    </TouchableOpacity>
                    {newUser.avatar && (
                        <Image source={newUser.img} style={styles.selectedImage} />
                    )}
                    <Button title="Add User" onPress={handleAddUser} />
                </View>
            )}

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: '35px' }}>
                <View>
                    <TextInput placeholder="Search User..." style={{ color: 'black', fontSize: 15, borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 5, marginRight: 5, width: '120px', height: '35px' }} onChangeText={handleSearch}  value={searchQuery} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', }}>
                    <Picker
                        selectedValue={roleFilter}
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray' }}
                        onValueChange={(itemValue) => handleFilter(itemValue)}
                    >
                        <Picker.Item label="All" value="All" />
                        <Picker.Item label="Admin" value="Admin" />
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Editor" value="Editor" />
                    </Picker>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=>{goUserList()}}>
                    <Ionicons name='reload-circle-outline' size={30} color='gray'></Ionicons>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal={false}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.columnHeader}>ID</Text>
                        <Text style={styles.columnHeader}>Email</Text>
                        <Text style={styles.columnHeader}>Phone Number</Text>
                        <Text style={styles.columnHeader}>First Name</Text>
                        <Text style={styles.columnHeader}>Last Name</Text>
                        <Text style={styles.columnHeader}>Role</Text>
                        <Text style={styles.columnHeader}>Action</Text>
                    </View>
                    {filteredUsers.map(user => (
                        <TouchableWithoutFeedback
                            key={user.id}
                            onPressIn={() => setHoveredUserId(user.id)}
                            onPressOut={() => setHoveredUserId(null)}
                        >
                            <View style={[styles.tableRow, hoveredUserId === user.id && styles.hoveredRow]}>
                                <Text style={styles.column}>{user.id}</Text>
                                <Text style={styles.column}>{user.email}</Text>
                                <Text style={styles.column}>{user.phonenumber}</Text>
                                <Text style={styles.column}>{user.firstname}</Text>
                                <Text style={styles.column}>{user.lastname}</Text>
                                <Text style={styles.column}>{user.role}</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleEdit(user.id)}>
                                    <Ionicons name='create' size={20} color='#5cbaff'></Ionicons>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=>handleDelete(user.id)}>
                                    <Ionicons name='trash' size={20} color='red'></Ionicons>
                                    
                                </TouchableOpacity>
                            
                            </View>
                            
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
           
            <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', paddingBottom: 35, paddingTop: 35, backgroundColor: 'white' }}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => { goHome() }}>
                    <Ionicons name='home-outline' size={30} color='#bfbfbf'></Ionicons>
                    <Text style={{ color: '#bfbfbf', fontSize: 13 }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goSearch() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name='search-outline' size={30} color='#bfbfbf'></Ionicons>
                    <Text style={{ color: '#bfbfbf', fontSize: 13 }}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goUserList() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name='people' size={30} color='#de47a9'></Ionicons>
                    <Text style={{ color: '#de47a9', fontSize: 13 }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goNotify() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name='notifications-outline' size={30} color='#bfbfbf'></Ionicons>
                    <Text style={{ color: '#bfbfbf', fontSize: 13 }}>Notify</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goMail() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name='mail-outline' size={30} color='#bfbfbf'></Ionicons>
                    <Text style={{ color: '#bfbfbf', fontSize: 13 }}>Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goSetting() }} style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Ionicons name='settings-outline' size={30} color='#bfbfbf'></Ionicons>
                        <Text style={{ color: '#bfbfbf', fontSize: 13 }}>Setting</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: '#C0C0C0',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    badgeText: {
        fontSize: 12,
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    table: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedRow: {
        backgroundColor: '#E1E1E1',
    },
    columnHeader: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 1,
        width: '35px',
        fontSize: '13px',
    },
    column: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 4,
        width: '56px',
        fontSize: '13px',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#007BFF',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        marginVertical: 10,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    hoveredRow: {
        backgroundColor: '#fce4ec', // Màu nền khi di chuột vào
    },
    imagePicker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default UserList;
