import useAuth from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default async function createOrder(items: []) {
    //@ts-ignore
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ order: {}, items }),
    });

    console.log({ order: {}, items });

    if (!(res.status == 201)) {
        throw new Error('Failed to Chechkout');
    }

    console.log(res);
    const data = await res.json();

    return data;
}

export async function listOrders() {
    //@ts-ignore
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch orders');
    }
    const data = await res.json();

    // console.log('got orders');
    // console.log(data);

    return data;
}

export async function getOrderDetails(id: number) {
    //@ts-ignore
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch orders');
    }
    const data = await res.json();

    console.log('got order detail');
    console.log(data);

    return data;
}
