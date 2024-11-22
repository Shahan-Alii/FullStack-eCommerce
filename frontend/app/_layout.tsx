import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
    const queryClient = new QueryClient();
    const insets = useSafeAreaInsets();

    const [loaded, error] = useFonts({
        mon: require('@/assets/fonts/Montserrat.ttf'),
        'mon-med': require('@/assets/fonts/Montserrat-Medium.ttf'),
        'mon-reg': require('@/assets/fonts/Montserrat-Regular.ttf'),
        'mon-bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
    });

    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{}}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                <Stack.Screen
                    name="(modals)/login"
                    options={{
                        presentation: 'modal',
                        headerTransparent: true,
                        title: '',
                        headerTitleStyle: {
                            fontFamily: 'mon-med',
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="close-outline"
                                    size={28}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />

                <Stack.Screen
                    name="(modals)/signup"
                    options={{
                        headerTransparent: true,
                        presentation: 'modal',
                        title: '',
                        headerTitleStyle: {
                            fontFamily: 'mon-sb',
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons
                                    name="close-outline"
                                    size={28}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />

                <Stack.Screen
                    name="(modals)/editProfile"
                    options={{
                        header: () => (
                            <View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: insets.top,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: insets.top,
                                    }}
                                    onPress={() => {
                                        router.back();
                                    }}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: hp(2),
                                        fontFamily: 'mon-bold',
                                    }}
                                >
                                    Edit Profile
                                </Text>
                            </View>
                        ),
                    }}
                />

                <Stack.Screen
                    name="(modals)/addProduct"
                    options={{
                        header: () => (
                            <View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: insets.top,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: insets.top,
                                    }}
                                    onPress={() => {
                                        router.back();
                                    }}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: hp(2),
                                        fontFamily: 'mon-bold',
                                    }}
                                >
                                    Add Product
                                </Text>
                            </View>
                        ),
                    }}
                />

                <Stack.Screen
                    name="(modals)/myOrders"
                    options={{
                        header: () => (
                            <View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: insets.top,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: insets.top,
                                    }}
                                    onPress={() => {
                                        router.back();
                                    }}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: hp(2),
                                        fontFamily: 'mon-bold',
                                    }}
                                >
                                    My Orders
                                </Text>
                            </View>
                        ),
                    }}
                />
            </Stack>
            <Toast />
        </QueryClientProvider>
    );
}
