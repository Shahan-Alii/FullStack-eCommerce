import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Share,
    ActivityIndicator,
} from 'react-native';
import products from '@/assets/products.json'; // Assuming this is where your products data is
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors'; // Update this path if necessary
import Animated, {
    SlideInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    withTiming,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/styles';
import { fetchProductById } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

const ProductsDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const navigation = useNavigation();

    const [quantity, setQuantity] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
            headerShown: true,
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={shareProduct}
                    >
                        <Ionicons
                            name="share-outline"
                            size={22}
                            color={'#000000'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color={'#000'}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={'#000'} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    {
        /* fetch product */
    }

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['products', id],
        queryFn: () => fetchProductById(Number(id)),
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
                    {' '}
                    Error fetching data
                </Text>
            </View>
        );
    }

    const shareProduct = async () => {
        try {
            await Share.share({
                title: product.name,
                url: product.image,
                message: 'check out this product',
            });
        } catch (err) {
            console.log(err);
        }
    };

    {
        /* return product if fetched correctly*/
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.ScrollView
                contentContainerStyle={{}}
                scrollEventThrottle={16}
            >
                <Animated.Image
                    source={{ uri: product.image }}
                    style={[styles.image]}
                    resizeMode="contain"
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                    </Text>
                    <Text style={styles.description}>
                        {product.description}
                    </Text>
                </View>

                {/* cart container */}

                <View style={styles.cartBtnContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.roundButton}
                            onPress={() => {
                                if (quantity > 0) {
                                    setQuantity((prev) => prev - 1);
                                }
                            }}
                        >
                            <Text style={styles.textIcon}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.roundButton}
                            onPress={() => {
                                if (quantity < 100) {
                                    setQuantity((prev) => prev + 1);
                                }
                            }}
                        >
                            <Text style={styles.textIcon}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={defaultStyles.btn}>
                        <Text style={defaultStyles.btnText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: hp(40),
        width: wp(100),
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 26,
        fontFamily: 'mon-reg',
    },
    price: {
        fontSize: 20,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: 'mon-bold',
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'mon-reg',
    },

    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    errorMessage: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        fontSize: 16,
        color: Colors.primary,
        textAlign: 'center',
        marginTop: 10,
    },
    cartBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    textIcon: {
        fontSize: 24,
        color: Colors.dark,
    },
    quantity: {
        fontSize: 20,
        marginHorizontal: 20,
        fontFamily: 'mon-bold',
        color: Colors.primary,
    },
});

export default ProductsDetailsScreen;
