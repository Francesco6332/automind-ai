import { StyleSheet, Text, View } from 'react-native';
import type { CaseStatus } from '../types/CaseInterface';
import { colors } from '../theme/colors';

const STATUS: Record<CaseStatus, { label: string; color: string }> = {
    open: { label: 'Da verificare', color: colors.statusOpen },
    inProgress: { label: 'In corso', color: colors.statusInProgress },
    resolved: { label: 'Risolto', color: colors.statusResolved },
};

type Props = {
    status: CaseStatus;
};

export default function StatusBadge({ status }: Props) {
    const { label, color } = STATUS[status];

    return (
        <View style={[styles.badge, { backgroundColor: color + '26' }]}>
            <Text style={[styles.text, { color }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});
