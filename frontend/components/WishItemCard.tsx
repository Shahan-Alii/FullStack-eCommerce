import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useWishlist from '@/store/wishListStore'; // Assuming you have a store for the wish list
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import Animated, { FlipOutEasyY } from 'react-native-reanimated';

type WishItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
};

const WishItemCard = ({ product }: any) => {
    const removeFromWishList = useWishlist(
        (state: any) => state.removeFromWishList
    ); // Function to remove item from wish list

    return (
        <Link href={`/products/${product.id}`} asChild>
            <TouchableOpacity>
                <Animated.View
                    style={styles.cardContainer}
                    exiting={FlipOutEasyY}
                >
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <View style={styles.infoContainer}>
                        <Text style={styles.productName} numberOfLines={1}>
                            {product.name}
                        </Text>
                        <Text style={styles.productPrice}>
                            {product.price} $
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => {
                            removeFromWishList(product.id);

                            Toast.show({
                                type: 'success',
                                text1: 'Removed',
                                text2: 'Product Removed from WishList',
                                visibilityTime: 2000,
                            });
                        }}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    productName: {
        fontSize: 16,
        fontFamily: 'mon-bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
        fontFamily: 'mon-med',
    },
    removeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: hp(1),
    },
});

export default WishItemCard;
