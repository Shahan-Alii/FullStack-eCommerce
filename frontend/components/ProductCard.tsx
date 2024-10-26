import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ProductCard({ product }: any) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text
                style={styles.name}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.9}
            >
                {product.name}
            </Text>

            <Text style={styles.price}>{product.price} $</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: hp(35),
        width: wp(45),
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
    },
    name: {
        padding: 5,
        textAlign: 'center',
        fontFamily: 'mon-reg',
        fontSize: hp(2),
    },
    price: {
        fontFamily: 'mon-bold',
        fontSize: hp(2.9),
        alignSelf: 'flex-start',
        padding: 5,
        marginBottom: 18,
        marginLeft: 4,
    },
});
