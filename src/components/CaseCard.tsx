import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ICase } from '../types/CaseInterface';
import { colors } from '../theme/colors';
import { formatDate } from '../utils/formatDate';
import StatusBadge from './StatusBadge';

type Props = {
    item: ICase;
    onPress: () => void;
};

export default function CaseCard({ item, onPress }: Props) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
        >
            <View style={styles.topRow}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <StatusBadge status={item.status} />
            </View>
            <Text style={styles.date}>{formatDate(item.reportedAt)}</Text>
            <Text style={styles.symptom} numberOfLines={1}>{item.symptom}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    date: {
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 4,
    },
    symptom: {
        fontSize: 14,
        color: colors.text,
        marginTop: 8,
    },
});
