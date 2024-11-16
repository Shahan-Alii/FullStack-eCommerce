import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';

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
            icon: <FontAwesome5 name="shoe-prints" size={24} color="black" />,
        },
        {
            name: 'Watch',
            icon: <FontAwesome5 name="clock" size={24} color="black" />,
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
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            {
                                backgroundColor:
                                    category == item.name
                                        ? Colors.primary
                                        : '#f9f9f9',
                            },
                        ]}
                        onPress={() => {
                            changeCategory(item.name);
                        }}
                    >
                        {item.icon}
                        <Text style={styles.categoryName} numberOfLines={1}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
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
        padding: 10,
        marginRight: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: wp(27),
        height: wp(19),
    },
    categoryName: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'mon-bold',
    },
});

export default CategoryList;