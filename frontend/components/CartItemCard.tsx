import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useCart from '@/store/cartStore';

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

    const [quantity, setQuantity] = useState(product.quantity);

    return (
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
                    {product.price * quantity} $
                </Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                        updateCart({
                            ...product,
                            quantity: product.quantity - 1,
                        });

                        setQuantity((val: number) => val - 1);
                    }}
                >
                    <Ionicons name="remove" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{product.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                        updateCart({
                            ...product,
                            quantity: product.quantity + 1,
                        });

                        setQuantity((val: number) => val + 1);
                    }}
                >
                    <Ionicons name="add" size={20} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
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
    quantityContainer: {
        marginLeft: 14,
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
        padding: 6,
    },
});

export default CartItemCard;
