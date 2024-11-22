import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type WishlistItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
    seller_id: number;
    sold_quantity: number;
    total_reviews: number;
};

type WishlistState = {
    items: WishlistItem[];

    addToWishList: (product: WishlistItem) => void;
    removeFromWishList: (productId: number) => void;
    resetWishlist: () => void;
};

const useWishlist = create(
    persist(
        (set) => ({
            items: [],

            addToWishList: (product: WishlistItem) =>
                set((state: WishlistState) => {
                    if (!product || !product.id) {
                        console.error('Product or Product ID is missing');
                        return state;
                    }

                    // Check if the item is already in the wishlist
                    const existingProductIndex = state.items.findIndex(
                        (item) => item.id == product.id
                    );

                    // Add the product to the wishlist if it's not already there
                    if (existingProductIndex === -1) {
                        return { items: [...state.items, product] };
                    }

                    return state; // Item already exists, do nothing
                }),

            removeFromWishList: (productId: number) =>
                set((state: WishlistState) => {
                    // Filter out the item by productId
                    const updatedItems = state.items.filter(
                        (item) => item.id != productId
                    );
                    return { items: updatedItems };
                }),

            resetWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlistStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useWishlist;
