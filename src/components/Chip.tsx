import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

export default function Chip({ label, selected, onPress }: Props) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && { opacity: 0.7 },
            ]}
        >
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    chipSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '33',
    },
    label: {
        fontSize: 14,
        color: colors.textMuted,
    },
    labelSelected: {
        color: colors.text,
        fontWeight: '600',
    },
});
