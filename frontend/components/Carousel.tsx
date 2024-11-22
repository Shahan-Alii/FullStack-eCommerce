import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Colors from '@/constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Carousel() {
    const slides = [
        require('./../assets/images/sale/1.png'),
        require('./../assets/images/sale/2.png'),
        require('./../assets/images/sale/3.png'),
        require('./../assets/images/sale/4.png'),
    ];

    return (
        <View style={styles.container}>
            <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                autoplayLoopKeepAnimation
                renderAll
                index={0}
                showPagination
                data={slides}
                paginationStyle={styles.paginationStyle}
                paginationActiveColor={Colors.primary}
                paginationStyleItemActive={{ width: hp(4.5), height: hp(1.2) }}
                paginationStyleItemInactive={{
                    height: hp(1.2),
                    width: hp(1.2),
                }}
                paginationStyleItem={{
                    marginHorizontal: hp(0.4),
                }}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image
                            source={item}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: wp(90),
    },
    imageContainer: {
        width: wp(100),
        height: hp(22),
        overflow: 'hidden',
        borderRadius: 30,
    },
    image: {
        width: '90%',
        height: '100%',
        borderRadius: 30,
    },
    paginationStyle: {
        position: 'absolute',
        bottom: -10,
    },
});
