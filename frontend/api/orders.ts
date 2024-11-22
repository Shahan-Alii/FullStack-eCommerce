import useAuth from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default async function createOrder(items: []) {
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ order: {}, items }),
    });

    if (!res) {
        throw new Error('Failed to Chechkout');
    }
    const data = await res.json();

    return data;
}
