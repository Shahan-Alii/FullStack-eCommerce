import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import useWishlist from '@/store/wishListStore';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WishItemCard from '@/components/WishItemCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WishListScreen = () => {
    const wishList = useWishlist((state: any) => state.items);
    const insets = useSafeAreaInsets();

    // console.log('inside wishList Screen', wishList);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                data={wishList}
                renderItem={({ item }) => <WishItemCard product={item} />}
                keyExtractor={(item) =>
                    item.id ? item.id.toString() : String(item.name)
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Your wish list is empty!
                    </Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

        paddingHorizontal: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#aaa',
        marginTop: hp(45),
        fontFamily: 'mon-bold',
    },
});

export default WishListScreen;
