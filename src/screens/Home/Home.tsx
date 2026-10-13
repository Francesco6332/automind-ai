import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import CaseCard from '../../components/CaseCard';
import { openCasesSummary, recentCases, selectedVehicle } from '../../data/mockData';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Text style={styles.appName}>AutoMind AI</Text>
                <Text style={styles.vehicle}>
                    {selectedVehicle.model} {selectedVehicle.year}
                </Text>
            </View>

            <View style={styles.summary}>
                <Text style={styles.summaryText}>{openCasesSummary}</Text>
            </View>

            <Text style={styles.sectionTitle}>Casi recenti</Text>

            <FlatList
                data={recentCases}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <CaseCard
                        item={item}
                        onPress={() => navigation.navigate('CaseDetail', { caseId: item.id })}
                    />
                )}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
                onPress={() => navigation.navigate('AddCase')}
            >
                <Text style={styles.buttonText}>+ Aggiungi caso</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    appName: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.accent,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    vehicle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 2,
    },
    summary: {
        marginHorizontal: 24,
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: colors.primary + '26',
        borderColor: colors.primary,
        borderWidth: 1,
    },
    summaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 24,
        marginBottom: 12,
        paddingHorizontal: 24,
    },
    list: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    separator: {
        height: 12,
    },
    button: {
        alignItems: 'center',
        marginHorizontal: 24,
        marginTop: 8,
        marginBottom: 16,
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
