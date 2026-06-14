import { View, StyleSheet } from 'react-native';
import { Gauge, Pencil } from 'lucide-react-native';
import { colors, fontFamily } from '@/theme';
import { Card, Text } from '@/components/ui';
import { METRICS, ACTIVITY_LABEL, GOAL_LABEL } from '@/lib/mock';

type Row = { label: string; value: number | string; unit?: string };

/** Editable body metrics and training attributes sourced from the user's metrics. */
export function Metrics() {
  const rows: Row[] = [
    { label: 'Weight', value: METRICS.weight, unit: 'kg' },
    { label: 'Height', value: METRICS.height, unit: 'cm' },
    { label: 'Biceps', value: METRICS.bicepsCircumference, unit: 'cm' },
    { label: 'Chest', value: METRICS.chestCircumference, unit: 'cm' },
    { label: 'Waist', value: METRICS.waistCircumference, unit: 'cm' },
    { label: 'Body fat', value: METRICS.bodyFatPercentage, unit: '%' },
    { label: 'Activity level', value: ACTIVITY_LABEL[METRICS.activityLevel] },
    { label: 'Goal', value: GOAL_LABEL[METRICS.goal] },
  ];

  return (
    <Card>
      <View style={styles.head}>
        <Text variant="label" style={styles.fieldLabel}>
          Metrics
        </Text>
        <Gauge size={16} strokeWidth={2} color={colors.textMut} />
      </View>
      {rows.map((m, i) => (
        <View key={m.label} style={[styles.row, i > 0 && styles.divider]}>
          <Text variant="small" color={colors.text2} style={styles.rowLabel}>
            {m.label}
          </Text>
          <View style={styles.value}>
            {typeof m.value === 'number' ? (
              <Text variant="num" size={18} color={colors.text}>
                {m.value}
              </Text>
            ) : (
              <Text variant="small" color={colors.text} style={styles.valueText}>
                {m.value}
              </Text>
            )}
            {m.unit && <Text style={styles.unit}>{m.unit}</Text>}
            <Pencil size={15} strokeWidth={2} color={colors.textMut} />
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  fieldLabel: { marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13 },
  divider: { borderTopWidth: 1, borderTopColor: colors.line },
  rowLabel: { flex: 1, fontFamily: fontFamily.bodyBold },
  value: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  valueText: { fontFamily: fontFamily.bodyBold },
  unit: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut },
});
