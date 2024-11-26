import Colors from '@/constants/Colors';
import useAuth from '@/store/authStore';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
} from 'react-native';
import {
    Ionicons,
    MaterialIcons,
    Entypo,
    Feather,
    FontAwesome,
} from '@expo/vector-icons';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LineSeparator from '@/components/LineSeparator';
import { useMutation } from '@tanstack/react-query';
import { toggleRole } from '@/api/auth';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOut,
    FadeOutUp,
    FlipInEasyY,
    FlipOutEasyY,
    SlideInDown,
    SlideOutUp,
} from 'react-native-reanimated';

const OptionItem = ({ icon, text, onPress }: any) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#333" />
        <Text style={styles.optionText}>{text}</Text>

        <View style={styles.optionArrow}>
            <Entypo name="chevron-right" size={24} color="black" />
        </View>
    </TouchableOpacity>
);

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const token = useAuth((state: any) => state.token);
    const setToken = useAuth((state: any) => state.setToken);

    const userData = useAuth((state: any) => state.user);
    const setUserData = useAuth((state: any) => state.setUser);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSellerMode, setIsSellerMode] = useState(false);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const roleMutation = useMutation({
        mutationFn: (newRole: string) => toggleRole(userData.email, newRole),
        onSuccess: (data) => {
            console.log('Success', data);
            // Update isSellerMode based on the new role
            const updatedRole = isSellerMode ? 'user' : 'seller';
            setIsSellerMode(updatedRole === 'seller');
            setUserData({ ...userData, role: updatedRole });
            setIsUpdatingRole(false);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleLogout = () => {
        setToken(null);
        setIsLoggedIn(false);
    };

    const handleSellerModeChange = () => {
        const newRole = isSellerMode ? 'user' : 'seller';
        setIsUpdatingRole(true);
        roleMutation.mutate(newRole);
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.containerLggedOut}>
                <Text style={styles.tagline}>Shop the Best Deals !</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: hp(2),
                        paddingHorizontal: hp(3),
                        marginVertical: 10,
                        borderRadius: 5,
                        width: '90%',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        router.push('(modals)/login');
                    }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.grey,
                        paddingVertical: hp(2),
                        paddingHorizontal: hp(3),
                        marginVertical: 10,
                        borderRadius: 5,
                        width: '90%',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        router.push('(modals)/signup');
                    }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ paddingBottom: insets.bottom }}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Image
                        source={{
                            uri: userData.image
                                ? userData.image
                                : 'https://cdn-icons-png.flaticon.com/128/9131/9131646.png',
                        }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>
                        {userData.name || 'Anonymous'}
                    </Text>
                    <Text style={styles.profileNumber}>{userData.email}</Text>
                </View>

                <LineSeparator widthPercentage={100} />

                {/* Options */}
                <View style={styles.optionsContainer}>
                    {/* Seller Mode switch */}
                    <View style={styles.optionItem}>
                        <Entypo name="shop" size={24} color="black" />
                        <Text style={[styles.optionText]}>Seller Mode</Text>

                        <View style={styles.optionArrow}>
                            <Switch
                                value={isSellerMode}
                                onValueChange={handleSellerModeChange}
                                disabled={isUpdatingRole}
                            />
                        </View>
                    </View>

                    {/* Conditional option for seller */}
                    {userData.role == 'seller' && (
                        <Animated.View exiting={FlipOutEasyY.duration(500)}>
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => {
                                    router.push('(modals)/addProduct');
                                }}
                            >
                                <MaterialIcons
                                    name="add-box"
                                    size={24}
                                    color="#333"
                                />
                                <Text style={styles.optionText}>
                                    Add a product
                                </Text>

                                <View style={styles.optionArrow}>
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}

                    {/* Conditional option for user */}
                    {userData.role == 'user' && (
                        <Animated.View exiting={FlipOutEasyY.duration(500)}>
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => {
                                    router.push('(modals)/myOrders');
                                }}
                            >
                                <MaterialIcons
                                    name="shopping-bag"
                                    size={24}
                                    color="#333"
                                />
                                <Text style={styles.optionText}>My Orders</Text>

                                <View style={styles.optionArrow}>
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}

                    <OptionItem
                        icon="person"
                        text="Edit Profile"
                        onPress={() => {
                            router.push('(modals)/editProfile');
                        }}
                    />
                    <OptionItem icon="notifications" text="Notification" />
                    <OptionItem icon="payment" text="Payment" />
                    <OptionItem icon="policy" text="Privacy Policy" />
                    <OptionItem icon="help-outline" text="Help Center" />

                    {/* Logout */}
                    <TouchableOpacity
                        style={styles.optionItem}
                        onPress={handleLogout}
                    >
                        <MaterialIcons name="logout" size={24} color="red" />
                        <Text style={[styles.optionText, { color: 'red' }]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: hp(4),
        paddingBottom: hp(15),
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    profileImage: {
        width: hp(15),
        aspectRatio: 1,
        borderRadius: hp(8),
        marginBottom: 10,
    },
    profileName: {
        fontSize: hp(2.5),
        fontFamily: 'mon-bold',
        color: '#333',
    },
    profileNumber: {
        fontSize: hp(2),
        fontFamily: 'mon-med',
        color: '#666',
    },
    optionsContainer: {
        marginTop: hp(3),
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(2.2),
        borderBottomWidth: 1,
        borderBottomColor: '#e2dfdf',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
        fontFamily: 'mon-med',
    },
    optionArrow: {
        position: 'absolute',
        right: 5,
    },
    logoutButton: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ef6d6d',
        width: hp(9),
        height: hp(9),
        borderRadius: hp(5),
        alignSelf: 'center',
        marginBottom: 10,
    },

    containerLggedOut: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tagline: {
        fontSize: hp(5),
        fontFamily: 'mon-bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },

    buttonText: {
        color: '#fff',
        fontSize: hp(3),
        fontFamily: 'mon-bold',
    },

    dashboardContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp(3),
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical: hp(2),
        paddingHorizontal: hp(2),
    },
});
