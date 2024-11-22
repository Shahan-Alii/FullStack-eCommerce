import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
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

import { AntDesign, Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '@/constants/Colors';
import Animated, {
    FadeInLeft,
    SlideInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/styles';
import { fetchProductById } from '@/api/products';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useCart from '@/store/cartStore';
import useWishlist from '@/store/wishListStore';
import { Rating } from 'react-native-ratings';
import Reviews from '@/components/Reviews';
import LineSeparator from '@/components/LineSeparator';
import Toast from 'react-native-toast-message';

const ProductsDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [quantity, setQuantity] = useState(0);
    const footerTranslateY = useSharedValue(0);

    const addToCart = useCart((state: any) => state.addProduct);
    const addToWish = useWishlist((state: any) => state.addToWishList);
    const removeFromWish = useWishlist(
        (state: any) => state.removeFromWishList
    );
    const wishList = useWishlist((state: any) => state.items);

    const [isInWishList, setIsInWishList] = useState(
        wishList.some((item: any) => item.id == id)
    );

    useEffect(() => {
        setIsInWishList(wishList.some((item: any) => item.id == id));
        footerTranslateY.value = withTiming(1, { duration: 900 });
    }, [wishList]);

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
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color={'#000'} />
                </TouchableOpacity>
            ),
        });
    }, []);

    const rFooter = useAnimatedStyle(() => {
        const translate = interpolate(footerTranslateY.value, [0, 1], [90, 0]);

        return {
            transform: [{ translateY: translate }],
        };
    });

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['products', id],
        queryFn: () => fetchProductById(Number(id)),
    });

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
                    Error fetching Reviews
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

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });

        Toast.show({
            type: 'success',
            text1: 'Added',
            text2: 'Product added to Cart',
            visibilityTime: 2000,
        });
    };

    const handleAddToWishList = () => {
        if (isInWishList) {
            removeFromWish(Number(id));
            Toast.show({
                type: 'success',
                text1: 'Removed',
                text2: 'Product removed from WishList',
                visibilityTime: 2000,
            });
        } else {
            addToWish({ ...product });
            Toast.show({
                type: 'success',
                text1: 'Added',
                text2: 'Product added to WishList',
                visibilityTime: 2000,
            });
        }
    };

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
                    <TouchableOpacity onPress={handleAddToWishList}>
                        <AntDesign name="heart" size={24} color="black" />
                    </TouchableOpacity>
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
                    <TouchableOpacity
                        style={defaultStyles.btn}
                        onPress={handleAddToCart}
                    >
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
