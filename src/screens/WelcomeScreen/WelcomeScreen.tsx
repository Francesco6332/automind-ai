import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps} from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }:  Props) {
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.hero}>
                <Image source = {require('../../../assets/splash-logo.png')} style = {styles.logo} resizeMode ="contain" />
                <Text style = {styles.title}>Your car, smarter.</Text>
                <Text style = {styles.subtitle}>Track maintenance, deadlines and get AI advice and help.</Text>
            </View>
            <Pressable
                accessibilityRole = "button"
                style = {({ pressed}) => [styles.button, pressed && { opacity: 0.7 }]}
                onPress = {() => navigation.replace('Home')}
            >
                <Text style = {styles.buttonText}>Get Started</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 32,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: 8,
    },
    hero: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 260,
        height: 112,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginHorizontal: 24,
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 32,
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
