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

export async function editProfile(
    email: string,
    image: string,
    name: string,
    contact: string,
    address: string
) {
    const res = await fetch(`${API_URL}/auth/editProfile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contact, name, address, image }),
    });

    if (!res.ok) {
        throw new Error('Failed to Update User Data');
    }
    const data = await res.json();

    return data;
}

export async function toggleRole(email: string, newRole: string) {
    const res = await fetch(`${API_URL}/auth/toggleRole`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newRole }),
    });

    if (!res.ok) {
        throw new Error('Failed to Change Role');
    }
    const data = await res.json();

    return data;
}
