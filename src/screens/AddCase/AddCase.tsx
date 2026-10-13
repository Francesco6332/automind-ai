import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import Chip from '../../components/Chip';
import { recentCases, selectedVehicle } from '../../data/mockData';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCase'>;

const AREAS = ['Freni', 'Motore', 'Sospensioni', 'Elettronica', 'Pneumatici', 'Altro'];
const WHEN_OPTIONS = ['Bassa velocità', 'Alta velocità', 'A freddo', 'A caldo', 'In frenata', 'In curva', 'Intermittente'];

export default function AddCase({ navigation, route }: Props) {
    const linkedCase = recentCases.find((c) => c.id === route.params?.caseId);

    const [area, setArea] = useState<string | null>(null);
    const [symptom, setSymptom] = useState('');
    const [description, setDescription] = useState('');
    const [when, setWhen] = useState<string[]>([]);

    const toggleWhen = (option: string) =>
        setWhen((current) =>
            current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
        );

    // Demo only: nothing is saved
    const handleSaveDraft = () =>
        Alert.alert(
            'Bozza salvata',
            'Questa è una versione dimostrativa: i dati non vengono ancora memorizzati.',
            [{ text: 'OK', onPress: () => navigation.goBack() }],
        );

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
            >
                {linkedCase && (
                    <Text style={styles.linked}>Nota per il caso: {linkedCase.title}</Text>
                )}

                <View style={styles.field}>
                    <Text style={styles.label}>Veicolo</Text>
                    <View style={[styles.input, styles.readOnly]}>
                        <Text style={styles.inputText}>
                            🚗  {selectedVehicle.model} {selectedVehicle.year}
                        </Text>
                    </View>
                    <Text style={styles.hint}>Associa il caso all’auto corretta.</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Area</Text>
                    <View style={styles.chips}>
                        {AREAS.map((option) => (
                            <Chip
                                key={option}
                                label={option}
                                selected={area === option}
                                onPress={() => setArea(area === option ? null : option)}
                            />
                        ))}
                    </View>
                    <Text style={[styles.label, styles.labelSpaced]}>Sintomo</Text>
                    <TextInput
                        style={styles.input}
                        value={symptom}
                        onChangeText={setSymptom}
                        placeholder="Es. fischio a bassa velocità"
                        placeholderTextColor={colors.textMuted}
                    />
                    <Text style={styles.hint}>Aiuta a classificare il problema.</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Descrizione</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Es. si sente in rilascio; diminuisce sfiorando il freno"
                        placeholderTextColor={colors.textMuted}
                        multiline
                        textAlignVertical="top"
                    />
                    <Text style={styles.hint}>Raccoglie il contesto osservabile.</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Quando accade</Text>
                    <View style={styles.chips}>
                        {WHEN_OPTIONS.map((option) => (
                            <Chip
                                key={option}
                                label={option}
                                selected={when.includes(option)}
                                onPress={() => toggleWhen(option)}
                            />
                        ))}
                    </View>
                    <Text style={styles.hint}>Supporta eventuali domande future.</Text>
                </View>

                <View style={styles.field}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Allegati</Text>
                        <Text style={styles.soon}>Prossimamente</Text>
                    </View>
                    <View style={styles.attachments}>
                        <View style={styles.attachment}>
                            <Text style={styles.attachmentIcon}>📷</Text>
                            <Text style={styles.attachmentText}>Foto</Text>
                        </View>
                        <View style={styles.attachment}>
                            <Text style={styles.attachmentIcon}>🎙️</Text>
                            <Text style={styles.attachmentText}>Audio</Text>
                        </View>
                    </View>
                    <Text style={styles.hint}>Evoluzione possibile, non ancora disponibile.</Text>
                </View>
            </ScrollView>

            <View style={styles.actions}>
                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
                    onPress={handleSaveDraft}
                >
                    <Text style={styles.buttonText}>Salva bozza</Text>
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
    content: {
        padding: 24,
        gap: 24,
    },
    linked: {
        fontSize: 14,
        color: colors.accent,
    },
    field: {
        gap: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    labelSpaced: {
        marginTop: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    hint: {
        fontSize: 12,
        color: colors.textMuted,
    },
    input: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: colors.text,
    },
    inputText: {
        fontSize: 15,
        color: colors.text,
    },
    readOnly: {
        opacity: 0.8,
    },
    multiline: {
        minHeight: 110,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    soon: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.statusInProgress,
        textTransform: 'uppercase',
    },
    attachments: {
        flexDirection: 'row',
        gap: 12,
    },
    attachment: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.border,
        opacity: 0.6,
    },
    attachmentIcon: {
        fontSize: 22,
    },
    attachmentText: {
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 4,
    },
    actions: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 16,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
