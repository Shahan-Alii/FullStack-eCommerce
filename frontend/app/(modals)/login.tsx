import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Link, Redirect, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import useAuth from '@/store/authStore';

export default function Login() {
    const setUser = useAuth((state: any) => state.setUser);
    const setToken = useAuth((state: any) => state.setToken);

    const router = useRouter();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const loginMutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            console.log('Success', data);

            if (data.user && data.token) {
                setToken(data.token);
                setUser(data.user);
            }
            router.dismissAll();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('@/assets/images/login-bg2.jpg')}
                resizeMode="cover"
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.container}>
                    <BlurView
                        intensity={50}
                        style={styles.blurContainer}
                        experimentalBlurMethod="dimezisBlurView"
                        tint="systemChromeMaterialDark"
                    >
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Login to Your Account
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Email"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.passwordInput}
                                    secureTextEntry={!passwordVisible}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={togglePasswordVisibility}
                                >
                                    <Ionicons
                                        name={
                                            passwordVisible ? 'eye-off' : 'eye'
                                        }
                                        size={24}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                loginMutation.mutate();
                            }}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <Pressable
                            onPress={() => {
                                router.replace('/(modals)/signup');
                            }}
                        >
                            <Text style={styles.signUpText}>
                                Don't have an account?
                                <Text style={{ color: Colors.primary }}>
                                    Sign Up
                                </Text>
                            </Text>
                        </Pressable>
                    </BlurView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurContainer: {
        width: '90%',
        maxWidth: 400,
        padding: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'mon-bold',
        color: '#fff',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    icon: {
        padding: 5,
    },
    button: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'mon-med',
    },
    signUpText: {
        color: '#fff',
        textAlign: 'center',
        margin: 10,
        fontSize: 16,

        fontFamily: 'mon-med',
    },
});
