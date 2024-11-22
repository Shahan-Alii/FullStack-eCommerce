import Colors from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';

type LineSeparatorProps = {
    widthPercentage: number;
};

const LineSeparator = ({ widthPercentage }: LineSeparatorProps) => {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.separator,
                    {
                        width: `${widthPercentage}%`,
                        borderTopColor: Colors.grey,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        borderTopWidth: StyleSheet.hairlineWidth, // Thickness of the line
    },
});

export default LineSeparator;
