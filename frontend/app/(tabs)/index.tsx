import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import { StatusBar } from 'expo-status-bar';
import CategoryList from '@/components/CategoryList';
import ProdcutsList from '@/components/ProductsList';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(13) }}
            >
                <Header />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Carousel />
                </View>

                <CategoryList
                    category={selectedCategory}
                    changeCategory={setSelectedCategory}
                />
                {/* trending products separator */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: hp(1.2),
                        paddingTop: hp(2.5),
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'mon-bold',
                            fontSize: hp(3),
                        }}
                    >
                        Trending 🔥
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary,
                            padding: hp(1.5),
                            borderRadius: hp(1.9),
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'mon-med',
                                fontSize: hp(2),
                                color: 'white',
                            }}
                        >
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>

                <ProdcutsList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
    },
});
