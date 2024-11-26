import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Colors from '@/constants/Colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { listOrders } from '@/api/orders';
import { Link, useRouter } from 'expo-router';
import { format } from 'date-fns';

// Define the Order type
type Order = {
    id: number;
    order_number: string;
    created_at: string;
    status: string;
};

export default function MyOrdersScreen() {
    const router = useRouter();

    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [currentTab, setCurrentTab] = useState<'Active' | 'Completed'>(
        'Active'
    );

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery<Order[]>({
        queryFn: listOrders,
        queryKey: ['orders'],
    });

    useEffect(() => {
        if (orders) {
            const active = orders.filter(
                (order) => order.status !== 'Delivered'
            );
            const completed = orders.filter(
                (order) => order.status === 'Delivered'
            );
            setActiveOrders(active);
            setCompletedOrders(completed);
        }
    }, [orders]);

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

    const renderOrderCard = ({ item }: { item: Order }) => {
        const date = format(new Date(item.created_at), 'MMMM dd, yyyy ');

        return (
            <Link href={`/orders/${item.id}`} asChild>
                <TouchableOpacity>
                    <View style={styles.orderCard}>
                        <Text style={styles.orderNumber}>
                            Order ID: {item.order_number}
                        </Text>
                        <View style={styles.orderDetails}>
                            <Text style={styles.orderDate}>Date: {date}</Text>
                            <Text style={styles.orderStatus}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        currentTab === 'Active' && styles.activeTab,
                    ]}
                    onPress={() => setCurrentTab('Active')}
                >
                    <Text style={styles.tabText}>Active Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        currentTab === 'Completed' && styles.activeTab,
                    ]}
                    onPress={() => setCurrentTab('Completed')}
                >
                    <Text style={styles.tabText}>Completed Orders</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={currentTab === 'Active' ? activeOrders : completedOrders}
                renderItem={renderOrderCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        No {currentTab === 'Active' ? 'Active' : 'Completed'}{' '}
                        Orders
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: { borderBottomColor: Colors.primary },
    tabText: { fontFamily: 'mon-bold', fontSize: hp(2) },
    list: { paddingBottom: 20 },
    orderCard: {
        backgroundColor: Colors.lightGrey,
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
    },
    orderNumber: { fontFamily: 'mon-bold', fontSize: hp(2.2), marginBottom: 5 },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderDate: { fontFamily: 'mon-reg', fontSize: hp(1.8) },
    orderStatus: {
        fontFamily: 'mon-bold',
        fontSize: hp(2),
        color: Colors.primary,
    },
    centered: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    errorText: { fontSize: hp(5), fontFamily: 'mon-med', color: 'red' },
    emptyText: {
        textAlign: 'center',
        fontFamily: 'mon-reg',
        fontSize: hp(2),
        color: Colors.grey,
        marginTop: 50,
    },
});
