import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import StatusBadge from '../../components/StatusBadge';
import { recentCases, selectedVehicle } from '../../data/mockData';
import { colors } from '../../theme/colors';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<RootStackParamList, 'CaseDetail'>;

export default function CaseDetail({ navigation, route }: Props) {
    const item = recentCases.find((c) => c.id === route.params.caseId);

    if (!item) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.body}>Caso non trovato.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>
                        {selectedVehicle.model} {selectedVehicle.year} · Registrato il {formatDate(item.reportedAt)}
                    </Text>
                    <View style={styles.badgeRow}>
                        <StatusBadge status={item.status} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sintomo riportato</Text>
                    <Text style={styles.body}>{item.symptom}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quando compare</Text>
                    <Text style={styles.body}>{item.conditions}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Osservazioni</Text>
                    <Text style={styles.bodyMuted}>Possibili cause da verificare in officina:</Text>
                    {item.observations.map((observation) => (
                        <Text key={observation} style={styles.bullet}>• {observation}</Text>
                    ))}
                </View>

                <View style={styles.notice}>
                    <Text style={styles.noticeTitle}>ℹ️  Nota</Text>
                    <Text style={styles.noticeText}>
                        In una versione futura AutoMind AI potrebbe proporre domande di approfondimento
                        e fonti utili. Non sostituisce in alcun caso il controllo di un professionista.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.actions}>
                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && { opacity: 0.7 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Torna all’elenco</Text>
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.button, styles.primaryButton, pressed && { opacity: 0.7 }]}
                    onPress={() => navigation.navigate('AddCase', { caseId: item.id })}
                >
                    <Text style={styles.buttonText}>Aggiungi nota</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 24,
        gap: 16,
    },
    header: {
        marginBottom: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.text,
    },
    meta: {
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 4,
    },
    badgeRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    section: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    body: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.text,
    },
    bodyMuted: {
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 8,
    },
    bullet: {
        fontSize: 15,
        lineHeight: 24,
        color: colors.text,
    },
    notice: {
        borderRadius: 12,
        padding: 16,
        backgroundColor: colors.statusInProgress + '1A',
        borderColor: colors.statusInProgress,
        borderWidth: 1,
    },
    noticeTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.statusInProgress,
        marginBottom: 4,
    },
    noticeText: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.text,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 16,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
