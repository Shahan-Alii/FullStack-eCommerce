import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];

    addProduct: (product: CartItem) => void;
    updateCart: (product: CartItem) => void;
    resetCart: () => void;
};

const useCart = create(
    persist(
        (set) => ({
            items: [],

            addProduct: (product: CartItem) =>
                set((state: CartState) => {
                    if (!product || !product.id) {
                        console.error('Product or Product ID is missing');
                        return state;
                    }

                    const existingProductIndex = state.items.findIndex(
                        (item) => item.id === product.id
                    );

                    if (existingProductIndex > -1) {
                        const updatedItems = state.items.map((item, index) =>
                            index === existingProductIndex
                                ? {
                                      ...item,
                                      quantity:
                                          item.quantity +
                                          (product.quantity || 1),
                                  }
                                : item
                        );
                        return { items: updatedItems };
                    } else {
                        return {
                            items: [...state.items, product],
                        };
                    }
                }),

            updateCart: (product: CartItem) =>
                set((state: CartState) => {
                    const updatedItems = state.items.map((item, index) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantity: product.quantity,
                              }
                            : item
                    );
                    return { items: updatedItems };
                }),
            resetCart: () => set({ items: [] }),
        }),
        {
            name: 'cartStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCart;
