import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useCart from '@/store/cartStore';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
};

const CartItemCard = ({ product }: any) => {
    const updateCart = useCart((state: any) => state.updateCart);

    const removeFromCart = useCart((state: any) => state.removeFromCart);

    return (
        <Link href={`/products/${product.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.cardContainer}>
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
                            {(product.price * product.quantity).toFixed(2)} $
                        </Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => {
                                    if (product.quantity > 1) {
                                        updateCart({
                                            ...product,
                                            quantity: product.quantity - 1,
                                        });
                                    }
                                }}
                            >
                                <Ionicons
                                    name="remove"
                                    size={20}
                                    color="#333"
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>
                                {product.quantity}
                            </Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => {
                                    if (product.quantity < 100) {
                                        updateCart({
                                            ...product,
                                            quantity: product.quantity + 1,
                                        });
                                    }
                                }}
                            >
                                <Ionicons name="add" size={20} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* remove and wishList button */}

                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => {
                            removeFromCart(product.id);

                            Toast.show({
                                type: 'success',
                                text1: 'Product Removed',
                                text2: 'Product Removed from Cart Succesfully',
                                visibilityTime: 2000,
                            });
                        }}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        marginLeft: hp(3),
        gap: hp(1),
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    quantityButton: {
        padding: 6,
        backgroundColor: Colors.primary,
        borderRadius: hp(2),
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#333',
    },
    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 20,
    },
});

export default CartItemCard;
