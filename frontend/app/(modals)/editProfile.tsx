import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '@/store/authStore';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { useMutation } from '@tanstack/react-query';
import { editProfile } from '@/api/auth';
import { useRouter } from 'expo-router';

import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditScreen() {
    const user = useAuth((state: any) => state.user);
    const setUser = useAuth((state: any) => state.setUser);
    const router = useRouter();

    const [image, setImage] = useState(
        'https://cdn-icons-png.flaticon.com/128/9131/9131549.png'
    );
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(0);

    useEffect(() => {
        setImage(user.image);
        setName(user.name);
        setContact(user.contact);
        setAddress(user.address);
        setEmail(user.email);
    }, []);

    const editProfileMutation = useMutation({
        mutationFn: () => editProfile(email, image, name, contact, address),
        onSuccess: (data) => {
            // console.log('Success', data);

            setUser({ name, image, contact, address });
            Alert.alert('Success', 'Profile Updated successfully!');
            setIsLoading(0);
        },
        onError: (error) => {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
            setIsLoading(0);
        },
    });

    const handleSubmit = async () => {
        setIsLoading(1);

        try {
            if (image) {
                let isImageUploaded = await handleUpload();

                if (!isImageUploaded) {
                    console.log('Failed to upload image to Cloudinary');
                    Alert.alert('Error', 'Please try again');
                    setIsLoading(0);
                    return;
                }
            }

            editProfileMutation.mutate();
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setIsLoading(0);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();

        //@ts-ignore
        formData.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: `user-profile-picture.jpg`,
        });
        formData.append('upload_preset', 'profile_images');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dw24cvnds/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const result = await response.json();

            if (response.ok) {
                setImage(result.secure_url);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Upload failed:', error);
            return false;
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    if (isLoading) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                enabled={false}
            >
                {/* Image Container */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri:
                                image ||
                                'https://cdn-icons-png.flaticon.com/128/9131/9131646.png',
                        }}
                        style={styles.image}
                    />

                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            position: 'absolute',
                            left: hp(26),
                            bottom: hp(2),
                            backgroundColor: 'black',
                            padding: hp(0.9),
                            borderRadius: hp(2),
                        }}
                    >
                        <Entypo name="edit" size={hp(4)} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contact</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="contact Number"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Update</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 10,
        height: hp(29),
    },
    image: {
        width: hp(25),
        aspectRatio: 1,
        borderRadius: hp(13),
        marginBottom: 10,
        borderColor: Colors.grey,
        borderWidth: StyleSheet.hairlineWidth,
    },

    inputGroup: {
        width: '100%',
        marginBottom: 15,
        position: 'relative',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#555',
        fontFamily: 'mon-med',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top', // Ensures multiline input starts at the top
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: hp(2),
        paddingHorizontal: hp(3),
        marginVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: hp(3),
        fontFamily: 'mon-bold',
    },
});
