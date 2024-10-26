import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const defaultStyles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        width: wp(40),
        height: hp(7),
        borderRadius: 12,
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'mon-bold',
        textAlign: 'center',
        fontSize: hp(2.5),
    },
});
