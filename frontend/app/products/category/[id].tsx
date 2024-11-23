import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from 'react-native';

import ProductCard from '@/components/ProductCard';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

export default function CategoryProducts() {
    const { id: categoryName } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    {
        /* fetch data */
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', categoryName],
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
        Toast.show({
            type: 'error',
            text1: 'Failed to load products',
            text2: 'Please check your internet connection!',
            visibilityTime: 2000,
        });

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
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View
                            style={[styles.header, { paddingTop: insets.top }]}
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
                                {categoryName}
                            </Text>
                        </View>
                    ),
                }}
            />

            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <ProductCard product={item} index={index} />
                )}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: hp(1.7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
