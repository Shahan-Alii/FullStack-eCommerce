import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
    const router = useRouter();

    return (
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
    );
}
