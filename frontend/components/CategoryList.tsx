import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { Link, useLocalSearchParams } from 'expo-router';

interface CategoryListProps {
    category: string;
    changeCategory: (category: string) => void;
}

const CategoryList = ({ category, changeCategory }: CategoryListProps) => {
    const categories = [
        {
            name: 'Clothes',
            icon: <FontAwesome5 name="tshirt" size={24} color="black" />,
        },
        {
            name: 'Shoes',
            icon: (
                <MaterialCommunityIcons
                    name="shoe-cleat"
                    size={24}
                    color="black"
                />
            ),
        },
        {
            name: 'Watch',
            icon: <MaterialIcons name="watch" size={24} color="black" />,
        },
        {
            name: 'Jewellery',
            icon: <FontAwesome5 name="gem" size={24} color="black" />,
        },
        {
            name: 'Electronics',
            icon: <FontAwesome5 name="tv" size={24} color="black" />,
        },
        {
            name: 'Kitchen',
            icon: <FontAwesome5 name="utensils" size={24} color="black" />,
        },
        {
            name: 'Toy',
            icon: <FontAwesome5 name="puzzle-piece" size={24} color="black" />,
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Link href={`/products/category/${item.name}`} asChild>
                        <TouchableOpacity>
                            <View style={[styles.categoryCard]}>
                                {item.icon}
                                <Text
                                    style={styles.categoryName}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(2.2),
        margin: 10,
    },
    categoryCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginRight: 10,
        borderRadius: hp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
        width: wp(25),
        height: wp(19),
        backgroundColor: '#f9f9f9',
    },
    categoryName: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'mon-bold',
    },
});

export default CategoryList;
