import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import products from '../../assets/products.json';
import ProductCard from '@/components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ExploreScreen() {
    {
        /* fetch data */
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: listProducts,
    });

    {
        /* error handling */
    }

    if (isLoading) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
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
                }}
            >
                <Text style={{ fontSize: hp(10), fontFamily: 'mon-med' }}>
                    Error fetching data
                </Text>
            </View>
        );
    }

    {
        /* actual return  */
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentContainerStyle={styles.container}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
