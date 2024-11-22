import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { GestureResponderEvent } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
    onPress: (e: GestureResponderEvent) => void;
    isFocused: boolean;
    label: string;
};

const icons = {
    Home: (props: any) => <Feather name="home" size={24} {...props} />,
    Favorites: (props: any) => <Feather name="heart" size={24} {...props} />,
    Cart: (props: any) => <Feather name="shopping-cart" size={24} {...props} />,
    Profile: (props: any) => <Feather name="user" size={24} {...props} />,
};

const TabBarIcon = ({ onPress, isFocused, label }: Props) => {
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const iconOpacity = useSharedValue(0);

    useEffect(() => {
        textOpacity.value = withTiming(isFocused ? 1 : 0, { duration: 400 });
        iconOpacity.value = withTiming(isFocused ? 0 : 1, { duration: 400 });
        translateY.value = withTiming(isFocused ? 12 : 0, { duration: 400 });
    }, [isFocused]);

    const rText = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    const rImage = useAnimatedStyle(() => {
        return {
            opacity: iconOpacity.value,
        };
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
            }}
        >
            <Animated.View style={[rImage, { position: 'absolute' }]}>
                {icons[label]({ color: '#fff' })}
            </Animated.View>

            <Animated.Text
                style={[
                    {
                        color: 'white',
                        fontWeight: 600,
                        fontFamily: 'mon-bold',
                        fontSize: hp(1.4),
                    },
                    rText,
                ]}
            >
                {label}
            </Animated.Text>
        </TouchableOpacity>
    );
};

export default TabBarIcon;

const styles = StyleSheet.create({});
