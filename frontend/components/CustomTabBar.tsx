import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import TabBarIcon from './TabBarIcon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export default function CustomTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const translateX = useSharedValue(0);
    const [dimentions, setDimentions] = useState({ width: 200, height: 100 });

    const buttonWidth = dimentions.width / state.routes.length;

    const onTabBarLayout = (e: any) => {
        // console.log(e.nativeEvent);
        setDimentions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    };

    useEffect(() => {
        translateX.value = withTiming(buttonWidth * state.index, {
            duration: 300,
        });
    }, [state.index]);

    const rCircle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={styles.tabBarContainer} onLayout={onTabBarLayout}>
            <Animated.View
                style={[
                    rCircle,
                    {
                        width: buttonWidth - 12,
                        height: dimentions.height - 15,
                        position: 'absolute',
                        zIndex: -1,
                        marginHorizontal: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            >
                <View style={styles.cicrle}></View>
            </Animated.View>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarIcon
                        key={route.key}
                        onPress={onPress}
                        isFocused={isFocused}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: hp(8.5),
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#292526',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: width * 0.95,
        bottom: hp(2.6),
        paddingVertical: 15,
        shadowColor: 'black',
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 15,
        shadowOpacity: 0.5,
        elevation: 15,
    },
    cicrle: {
        width: 15,
        height: 15,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginBottom: 18,
    },
});
