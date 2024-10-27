const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Failed to Login');
    }
    const data = await res.json();

    return data;
}

export async function signUp(email: string, password: string, name: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
        throw new Error('Failed to SignUp');
    }
    const data = await res.json();

    return data;
}
