import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Colors from '@/constants/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    router,
    Stack,
    useLocalSearchParams,
    useNavigation,
} from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getOrderDetails } from '@/api/orders';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';

export default function OrderDetailsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
            headerShown: true,
            header: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: insets.top, // adjust according to safe area
                        paddingHorizontal: 10,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp(2), fontFamily: 'mon-bold' }}>
                        Details
                    </Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, insets.top]);

    const { id } = useLocalSearchParams();

    const {
        data: order,
        isLoading,
        error,
    } = useQuery({
        queryFn: () => getOrderDetails(Number(id)),
        queryKey: ['orders', { id }],
    });

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error fetching data</Text>
            </View>
        );
    }

    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <Image
                source={{ uri: item.product.image }}
                style={styles.itemImage}
                resizeMode="contain"
            />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product.name}</Text>

                <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                    {'   '} | {'   '}Price: ${item.price.toFixed(2)}
                </Text>
            </View>
        </View>
    );

    const calculateTotalPrice = (order: any) => {
        return order.items.reduce((total: number, item: any) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Text style={styles.orderId}>Order ID: {order.order_number} </Text>

            <View style={styles.statusRow}>
                <Text style={styles.status}>Status : {order.status}</Text>
                <Text style={styles.price}>
                    Total price : {calculateTotalPrice(order).toFixed(2)}
                </Text>
            </View>

            <FlatList
                data={order.items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No items in this order</Text>
                )}
                contentContainerStyle={styles.list}
                ListHeaderComponent={() => {
                    return (
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'mon-bold',
                                fontSize: hp(3),
                            }}
                        >
                            Items
                        </Text>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingVertical: hp(7) },
    orderId: {
        fontSize: hp(2.5),
        fontFamily: 'mon-bold',
        marginBottom: 10,
    },
    statusRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        gap: 5,
    },
    status: {
        fontSize: hp(2),
        fontFamily: 'mon-med',
    },
    price: {
        fontSize: hp(2),
        fontFamily: 'mon-med',
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: hp(2.2),
        fontFamily: 'mon-bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: hp(1.8),
        fontFamily: 'mon-reg',
        color: Colors.grey,
        marginBottom: 5,
    },
    itemQuantity: {
        fontSize: hp(1.8),
        fontFamily: 'mon-reg',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: hp(2),
        fontFamily: 'mon-reg',
        color: Colors.grey,
    },
    list: {
        paddingBottom: 20,
        paddingTop: 10,
    },
    centered: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    errorText: { fontSize: hp(5), fontFamily: 'mon-med', color: 'red' },
});
