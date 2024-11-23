import createOrder from '@/api/orders';
import CartItemCard from '@/components/CartItemCard';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/styles';
import useCart from '@/store/cartStore';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
};

export default function CartScreen() {
    const items = useCart((state: any) => state.items);

    const resetCart = useCart((state: any) => state.resetCart);

    const [totalPrice, setTotalPrice] = useState(0);

    const createOrderMutation = useMutation({
        mutationFn: () => {
            return createOrder(
                items.map((item: any) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                }))
            );
        },
        onSuccess: (data) => {
            resetCart();
            Toast.show({
                type: 'success',
                text1: 'Ordered',
                text2: 'Your order has been placed',
                visibilityTime: 2000,
            });

            console.log('order created successfully');
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to place order',
                text2: 'Please Try Again!',
                visibilityTime: 2000,
            });
            console.log('error on checkout', error);
        },
    });

    useEffect(() => {
        const total = items.reduce((sum: number, item: any) => {
            return sum + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [items]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CartItemCard product={item} />}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Total: ${totalPrice.toFixed(2)}
                </Text>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[defaultStyles.btn, styles.Btn]}
                        onPress={() => {
                            createOrderMutation.mutate();
                        }}
                    >
                        <Text style={defaultStyles.btnText}>Checkout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            defaultStyles.btn,
                            styles.Btn,
                            { backgroundColor: Colors.grey },
                        ]}
                        onPress={resetCart}
                    >
                        <Text
                            style={[defaultStyles.btnText, { color: '#fff' }]}
                        >
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp(9.6),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 18,
        fontFamily: 'mon-bold',
        marginLeft: 5,
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    Btn: {
        width: '100%',
        marginVertical: 5,
    },
});
