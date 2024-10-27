import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
}

const useAuth = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
        }),
        {
            name: 'authStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuth;
