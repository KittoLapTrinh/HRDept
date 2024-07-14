import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, Divider, Provider } from 'react-native-paper';

const Home = ({ navigation, route }) => {
    const { user } = route.params;

    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);
    
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openModal = () => {
        closeMenu();
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    //Logout
    const handleLogout = () => {
        closeMenu();
        navigation.navigate('Login');
    };


    const handleMouseEnter = (index) => {
        setHoveredImage(index);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const goHome = () => {
        navigation.navigate('Home');
    }
    const goSearch = () => {
        navigation.navigate('Search');
    }
    const goUserList = () => {
        navigation.navigate('UserList');
    }
    const goNotify = () => {
        navigation.navigate('Notify');
    }
    const goMail = () => {
        navigation.navigate('Mail');
    }
    const goSetting = () => {
        navigation.navigate('Setting');
    }

    return (
        <Provider>
            <View style={{ flex: 1, padding: 5 }}>
                <ScrollView horizontal={false}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image style={styles.logo} source={require('../assets/logo.png')} />
                            <Text style={styles.headerTitle}>HR DEPT</Text>
                        </View>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu} style={styles.headerRight}>
                                    <Text>Hi, {user.lastname}</Text>
                                    <Ionicons name="chevron-down" size={20} color="#000" />
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={openModal} title="Thông tin cá nhân" />
                            <Divider />
                            <Menu.Item onPress={handleLogout} title="Đăng xuất" />
                        </Menu>
                    </View>
                    
                    <Image style={styles.banner} source={require('../assets/a1.png')} />
                    
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Chúng tôi là HR DEPT.</Text>
                        <Text style={styles.sectionTitle}>VIỆT NAM</Text>
                    </View>
                    
                    <View style={styles.infoSection}>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                Chúng tôi mong muốn trở thành đối tác đáng tin cậy cho các dịch vụ về giấy tờ liên quan đến nhân sự...
                            </Text>
                        </View>
                        <View style={styles.infoImages}>
                            <Image style={styles.infoImage} source={require('../assets/resume.png')} />
                            <Image style={styles.infoImage} source={require('../assets/hrmanager.png')} />
                        </View>
                    </View>
                    
                    <View style={styles.servicesSection}>
                        <Image style={styles.largeImage} source={require('../assets/chuyenmon.png')} />
                        <View style={styles.servicesTextContainer}>
                            <Text style={styles.servicesTitle}>Dịch vụ chuyên môn</Text>
                            <Text style={styles.servicesText}>
                                Chúng tôi tập trung vào Dịch vụ tính toán bảng lương và Dịch vụ phần mềm phiếu lương bảo mật...
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.officeSolutions}>
                        <Text style={styles.officeSolutionsTitle}>Giải pháp văn phòng</Text>
                        <View style={styles.officeSolutionItems}>
                            <View style={styles.officeSolutionItem}>
                                <Image style={styles.officeSolutionImage} source={require('../assets/giaiphapvp1.png')} />
                                <Text style={styles.officeSolutionText}>Phần mềm Phiếu Lương được khóa mật khẩu riêng biệt...</Text>
                            </View>
                            <View style={styles.officeSolutionItem}>
                                <Image style={styles.officeSolutionImage} source={require('../assets/giaiphapvp2.png')} />
                                <Text style={styles.officeSolutionText}>Chữ ký điện tử dành cho việc ký hợp đồng...</Text>
                            </View>
                            <View style={styles.officeSolutionItem}>
                                <Image style={styles.officeSolutionImage} source={require('../assets/giaiphapvp3.png')} />
                                <Text style={styles.officeSolutionText}>Các sản phẩm công nghệ, phần mềm và văn phòng khác...</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.contactSection}>
                        <Text style={styles.contactTitle}>Liên hệ</Text>
                        <Image style={styles.contactImage} source={require('../assets/lienhe.png')} />
                    </View>
                </ScrollView>
                
                <View style={styles.footer}>
                    <FooterButton title="Home" iconName="home" onPress={goHome} active />
                    <FooterButton title="Search" iconName="search-outline" onPress={goSearch} />
                    <FooterButton title="User" iconName="people-outline" onPress={goUserList} />
                    <FooterButton title="Notify" iconName="notifications-outline" onPress={goNotify} />
                    <FooterButton title="Mail" iconName="mail-outline" onPress={goMail} />
                    <FooterButton title="Setting" iconName="settings-outline" onPress={goSetting} />
                </View>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Thông tin cá nhân</Text>
                            <Text style={styles.modalText}>ID: {user.id}</Text>
                            <Text style={styles.modalText}>Email: {user.email}</Text>
                            <Text style={styles.modalText}>Số điện thoại: {user.phonenumber}</Text>
                            <Text style={styles.modalText}>Họ: {user.firstname}</Text>
                            <Text style={styles.modalText}>Tên: {user.lastname}</Text>
                            <Text style={styles.modalText}>Vai trò: {user.role}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </Provider>
    )
}

const FooterButton = ({ title, iconName, onPress, active }) => (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
        <Ionicons name={iconName} size={30} color={active ? '#de47a9' : '#bfbfbf'} />
        <Text style={[styles.footerButtonText, active && { color: '#de47a9' }]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#C4C4C4',
        marginBottom: 20,
        padding: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 25,
        height: 25,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#dd45a8',
        marginLeft: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    banner: {
        width: "100%",
        height: 150,
        borderRadius: 50,
    },
    section: {
        flexDirection: 'column',
        marginVertical: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoTextContainer: {
        backgroundColor: '#474747',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        flex: 1,
        padding: 5,
    },
    infoText: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    infoImages: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    infoImage: {
        width: 150,
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: 10,
    },
    servicesSection: {
        flexDirection: 'row',
        marginTop: 5,
    },
    largeImage: {
        width: 150,
        height: 300,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginRight: 20,
    },
    servicesTextContainer: {
        flexDirection: 'column',
        backgroundColor: '#474747',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 5,
    },
    servicesTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    servicesText: {
        fontSize: 15,
        color: '#FFFFFF',
        width: 200
    },
    officeSolutions: {
        marginTop: 10,
    },
    officeSolutionsTitle: {
        color: '#314d67',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    officeSolutionItems: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    officeSolutionItem: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    officeSolutionImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: 10,
    },
    officeSolutionText: {
        width: 120,
        color: '#314d67',
        textAlign: 'center',
    },
    contactSection: {
        marginTop: 5,
    },
    contactTitle: {
        color: '#314d67',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    contactImage: {
        width: "100%",
        height: 70,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    footer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerButtonText: {
        fontSize: 13,
        color: '#bfbfbf',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#de47a9',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Home;
