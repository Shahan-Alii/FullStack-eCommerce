import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <View>
            <Text>Profile Screen</Text>
            <Text>Profile Screen</Text>
            <Text>Profile Screen</Text>

            <Link href={'(modals)/login'}>GO TO LOGIN </Link>
        </View>
    );
}
