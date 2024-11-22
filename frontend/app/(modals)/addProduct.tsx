import Colors from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useMutation } from '@tanstack/react-query';
import createProduct from '@/api/products';

export default function AddProductScreen() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('Miscellaneous');
    const [image, setImage] = useState(
        'https://cdn-icons-png.flaticon.com/128/2907/2907776.png'
    );

    const [isLoading, setIsLoading] = useState(0);

    const addProductMutation = useMutation({
        mutationFn: () =>
            createProduct(
                productName,
                Number(productPrice),
                productDescription,
                category,
                image
            ),
        onSuccess: (data) => {
            // console.log('Success', data);

            Alert.alert('Success', 'Profile Updated successfully!');
            setIsLoading(0);
        },
        onError: (error) => {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
            setIsLoading(0);
        },
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.5,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();

        //@ts-ignore
        formData.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: `product.jpg`,
        });
        formData.append('upload_preset', 'product_images');

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
                console.log('Upload successful:', result.secure_url);
                return true;
            } else {
                return false;
                throw new Error(result.error.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            return false;
        }
    };

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

            addProductMutation.mutate();
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setIsLoading(0);
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
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image Container */}
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: image,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        position: 'absolute',
                        left: hp(22),
                        bottom: hp(-1),
                        backgroundColor: 'black',
                        padding: hp(0.9),
                        borderRadius: hp(2),
                    }}
                >
                    <Entypo name="edit" size={hp(3)} color="white" />
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Product Name</Text>
                <TextInput
                    style={styles.input}
                    value={productName}
                    onChangeText={setProductName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Product Price</Text>
                <TextInput
                    style={styles.input}
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Product Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline
                    numberOfLines={4}
                />
            </View>

            {/* Category Selection */}
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category</Text>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Miscellaneous" value="Miscellaneous" />
                    <Picker.Item label="Clothes" value="Clothes" />
                    <Picker.Item label="Shoes" value="Shoes" />
                    <Picker.Item label="Watch" value="Watch" />
                    <Picker.Item label="Jewellery" value="Jewellery" />
                    <Picker.Item label="Electronics" value="Electronics" />
                    <Picker.Item label="Kitchen" value="Kitchen" />
                    <Picker.Item label="Toy" value="Toy" />
                </Picker>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>Add Product</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    imageContainer: {
        width: '60%',
        aspectRatio: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: hp(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: Colors.grey,
        borderWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: hp(3),
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
        textAlignVertical: 'top',
    },
    categoryContainer: {
        width: '100%',
        marginBottom: 20,
    },
    categoryLabel: {
        fontSize: 16,
        fontFamily: 'mon-med',
        marginBottom: 5,
    },
    picker: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-bold',
    },
});
