import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import useCart from '@/store/cartStore';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Rating } from 'react-native-ratings';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

export default function ProductCard({ product, index }: any) {
    const addToCart = useCart((state: any) => state.addProduct);

    if (index % 2 == 1) {
        index--;
    }

    return (
        <Link href={`/products/${product.id}`} asChild>
            <TouchableOpacity>
                <Animated.View
                    style={styles.container}
                    entering={SlideInDown.duration(900).delay(index * 100)}
                >
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            {product.name}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                gap: hp(2),
                                paddingVertical: hp(1),
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <View style={styles.soldQuantityContainer}>
                                <Text
                                    style={{
                                        fontFamily: 'mon-med',
                                        fontSize: hp(1.7),
                                    }}
                                >
                                    {product.sold_quantity} sold
                                </Text>
                            </View>

                            <View style={styles.reviewsContainer}>
                                <Rating
                                    type="star"
                                    startingValue={Number(
                                        (product.rating / 5).toFixed(2)
                                    )}
                                    readonly={true}
                                    imageSize={hp(2.5)}
                                    ratingCount={1}
                                />
                                <Text
                                    style={{
                                        fontSize: hp(2.5),
                                        fontFamily: 'mon-reg',
                                    }}
                                >
                                    {Number(product.rating).toFixed(1)}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.price}>{product.price} $</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: '70%',
        height: '50%',
        borderRadius: 10,
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
        fontSize: hp(2.7),
        alignSelf: 'flex-start',
        padding: 5,
        marginBottom: 4,
        marginLeft: 4,
    },

    soldQuantityContainer: {
        backgroundColor: Colors.lightGrey,
        borderRadius: hp(1.1),
        width: wp(15),
        height: hp(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: hp(0.7),
        borderLeftColor: Colors.grey,
        borderLeftWidth: StyleSheet.hairlineWidth,
        paddingLeft: 8,
    },
});
