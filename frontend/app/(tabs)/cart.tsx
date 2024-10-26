import CartItemCard from '@/components/CartItemCard';
import useCart from '@/store/cartStore';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
};

export default function CartScreen() {
    const items: CartItem[] = useCart((state: any) => state.items);

    console.log(items);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CartItemCard product={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
