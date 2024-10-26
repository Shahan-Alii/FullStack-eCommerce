import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import products from '../../assets/products.json';
import ProductCard from '@/components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentContainerStyle={styles.container}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()} // Ensure unique key for each item
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
