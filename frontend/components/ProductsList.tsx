import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ProductsList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: listProducts,
    });

    if (isLoading) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: hp(40),
                }}
            >
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: hp(40),
                }}
            >
                <Text style={{ fontSize: hp(5), fontFamily: 'mon-med' }}>
                    Check Your Connection!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data.map((item: any) => (
                <View key={item.id} style={styles.productContainer}>
                    <ProductCard product={item} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: hp(1),
        paddingTop: hp(1.5),
    },
    productContainer: {
        width: '48%', // Makes each product take up nearly half the width of the container
        alignItems: 'center',
    },
});
