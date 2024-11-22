import useAuth from '@/store/authStore';
import { Alert } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
    const res = await fetch(`${API_URL}/products`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await res.json();

    return data;
}

export default async function createProduct(
    productName: string,
    productPrice: number,
    productDescription: string,
    productCategory: string,
    productImage: string
) {
    //@ts-ignore
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            image: productImage,
        }),
    });

    if (!res.ok) {
        Alert.alert('Error', 'Failed to create product');
    }
    const data = await res.json();

    return data;
}

export async function fetchProductById(id: number) {
    const res = await fetch(`${API_URL}/products/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    const data = await res.json();

    return data;
}

export async function fetchReviewsByProduct(id: number) {
    const res = await fetch(`${API_URL}/products/${id}/reviews`);

    if (!res.ok) {
        throw new Error('Failed to fetch reviews');
    }
    const data = await res.json();

    return data;
}

export async function createReview(
    rating: number,
    id: number,
    comment: string
) {
    //@ts-ignore
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/products/${id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ rating, comment }),
    });

    if (!res.ok) {
        throw new Error('Failed to Add Review');
    }
    const data = await res.json();

    return data;
}
