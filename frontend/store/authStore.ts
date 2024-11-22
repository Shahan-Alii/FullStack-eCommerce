import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
    user: object;
    setUser: (user: object) => void;
}

const useAuth = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: (updatedAttributes: any) =>
                set((state: AuthState) => ({
                    user: { ...state.user, ...updatedAttributes },
                })),
            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'authStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuth;
