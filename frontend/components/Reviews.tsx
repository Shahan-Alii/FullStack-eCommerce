import {
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReviewsByProduct, createReview } from '@/api/products';
import { Rating } from 'react-native-ratings';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import Toast from 'react-native-toast-message';

type ReviewsProps = {
    id: number;
    totalReviews: number;
};

export default function Reviews({ id, totalReviews }: ReviewsProps) {
    const queryClient = useQueryClient();

    const {
        data: reviews,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['reviews', id],
        queryFn: () => fetchReviewsByProduct(Number(id)),
    });

    // Modal visibility state
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const addReviewMutation = useMutation({
        mutationFn: ({
            rating,
            id,
            comment,
        }: {
            rating: number;
            id: number;
            comment: string;
        }) => createReview(rating, id, comment),
        onSuccess: (data) => {
            console.log('Review created successfully');

            Toast.show({
                type: 'success',
                text1: 'Review Added',
                text2: 'Your Review is added Succesfully',
                visibilityTime: 2000,
            });

            queryClient.invalidateQueries({
                queryKey: ['products', id], // The query key you're using in useQuery for product
            });

            queryClient.refetchQueries({
                queryKey: ['products', id], // The query key you're using in useQuery for product
            });

            queryClient.invalidateQueries({
                queryKey: ['reviews', id], // The query key you're using in useQuery for reviews
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Review not added',
                text2: 'Please Try Again!',
                visibilityTime: 2000,
            });
            console.log('error', error);
        },
    });

    // Render loading state
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

    // Render error state
    if (error) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp(30),
                    width: wp(100),
                }}
            >
                <Text style={{ fontSize: hp(5), fontFamily: 'mon-med' }}>
                    Error fetching data
                </Text>
            </View>
        );
    }

    const handleReviewSubmit = () => {
        addReviewMutation.mutate({
            rating,
            id,
            comment: reviewText,
        });

        // Close modal after submission
        setModalVisible(false);

        // Optionally reset form fields
        setReviewText('');
        setRating(0);
    };

    return (
        <View style={styles.container}>
            {/*Conditional rendering id no of reviews is 0 then No Reviews otherwise all reviews will be printed by map */}

            <ScrollView
                style={{ height: hp(16) }}
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {reviews.length === 0 ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: hp(20),
                            width: wp(77),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: hp(3),
                                fontFamily: 'mon-reg',
                                textAlign: 'center',
                                width: wp(100),
                            }}
                        >
                            (No reviews Yet)
                        </Text>
                    </View>
                ) : (
                    reviews.map((item: any) => (
                        <View
                            key={item.reviewId}
                            style={styles.reviewContainer}
                        >
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.userName}>
                                    {item.userName
                                        ? item.userName
                                        : 'Anonymous'}
                                </Text>
                                <Rating
                                    type="star"
                                    startingValue={item.rating}
                                    readonly={true}
                                    imageSize={hp(3)}
                                    ratingCount={5}
                                />
                            </View>

                            <Text style={styles.reviewComment}>
                                {item.comment}
                            </Text>
                            <Text style={styles.reviewDate}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Button to open modal */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.addReviewButton}
                    onPress={() => setModalVisible(true)} // Ensure this opens the modal
                >
                    <Text style={styles.addReviewButtonText}>Add a Review</Text>
                </TouchableOpacity>
            </View>

            {/* Modal to write a review */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Write a Review</Text>

                        {/* Rating */}
                        <Rating
                            type="star"
                            startingValue={rating}
                            onFinishRating={setRating}
                            imageSize={hp(3)}
                            ratingCount={5}
                            style={{ paddingVertical: hp(1.5) }}
                        />

                        {/* Text Input for comment */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write your review here..."
                            multiline
                            numberOfLines={4}
                            value={reviewText}
                            onChangeText={setReviewText}
                        />

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleReviewSubmit}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: hp(2) },
    header: {
        fontSize: 24,
        marginBottom: 12,
        fontFamily: 'mon-bold',
    },
    reviewContainer: {
        padding: 12,
        marginBottom: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        borderRadius: 8,
        height: hp(13),
        margin: 5,
        paddingHorizontal: hp(2),
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        fontFamily: 'mon-bold',
        marginRight: 8,
    },
    reviewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

    reviewComment: {
        marginVertical: 8,
        fontFamily: 'mon-reg',
        flex: 1,
        marginRight: 10,
    },
    reviewDate: {
        color: '#888',
        fontSize: 12,
        fontFamily: 'mon-bold',
    },
    addReviewButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
        width: wp(40),
    },
    addReviewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        width: wp(80),
        borderRadius: 8,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 18,
        fontFamily: 'mon-bold',
    },
    textInput: {
        width: '100%',
        height: hp(18),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        fontFamily: 'mon-reg',
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        marginBottom: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-bold',
    },
    cancelButton: {
        backgroundColor: Colors.grey,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-bold',
    },
});
