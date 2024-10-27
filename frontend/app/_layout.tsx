import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Colors from '@/constants/Colors';

export default function RootLayout() {
    const queryClient = new QueryClient();

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
            </Stack>
        </QueryClientProvider>
    );
}
