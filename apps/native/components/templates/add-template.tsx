import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface AddTemplateCardProps {
  onPress?: () => void;
}

export function AddTemplateCard({ onPress }: AddTemplateCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.plusCircle}>
        <Text style={styles.plus}>+</Text>
      </View>
      <Text style={styles.label}>Dodaj nowy template</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: `${colors.outlineVariant}CC`,
    borderRadius: 16,
    backgroundColor: `${colors.containerLow}99`,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  plusCircle: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}AA`,
    backgroundColor: `${colors.primaryContainer}AA`,
  },
  plus: {
    color: colors.primaryFixed,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '700',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});