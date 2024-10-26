import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                <Stack.Screen
                    name="(modals)/login"
                    options={{
                        presentation: 'modal',
                        title: 'Log in or sign up',
                        headerTitleStyle: {
                            fontFamily: 'mon-sb',
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="close-outline" size={28} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
