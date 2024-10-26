import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function ProductCard({ product }: any) {
    return (
        <Link href={`/products/${product.id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.9}
                    >
                        {product.name}
                    </Text>

                    <Text style={styles.price}>{product.price} $</Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: hp(40),
        width: wp(45),
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    textContainer: {
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 5,
    },
    name: {
        padding: 5,
        fontFamily: 'mon-reg',
        fontSize: hp(2),
        alignSelf: 'center',
    },
    price: {
        fontFamily: 'mon-bold',
        fontSize: hp(2.9),
        alignSelf: 'flex-start',
        padding: 5,
        marginBottom: 4,
        marginLeft: 4,
    },
    button: {
        backgroundColor: Colors.primary,
        height: hp(5),
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'mon-med',
    },
});
