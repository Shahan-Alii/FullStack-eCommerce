import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={styles.searchContainer}>
                <Text style={styles.searchText}>Search</Text>
                <Feather name="search" size={20} color="#7e7e7e" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.notificationContainer}>
                <Ionicons name="notifications" size={24} color={Colors.grey} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        backgroundColor: '#f5f5f5',
        gap: 9,
        marginBottom: hp(4),
    },
    notificationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderRadius: hp(3),
        height: hp(6),
        width: hp(6),
    },
    logo: {
        height: hp(6),
        width: hp(6),
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ececec',
        gap: wp(2),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: 20,
        height: hp(5.5),
        marginLeft: wp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    searchText: {
        flex: 1,
        fontSize: 14,
        color: Colors.grey,
        fontFamily: 'mon-med',
    },
});
