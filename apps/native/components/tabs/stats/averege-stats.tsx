import { View, StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/theme';
import { Card, Text } from '@/components/ui';


/** Side-by-side average duration and calorie cards, each with a 7-day sparkline. */
export function AveregeStats() {
  return (
    <View style={styles.duo}>
      <Card style={styles.duoCard}>
        <Text variant="label" style={styles.fieldLabel}>
          Avg duration
        </Text>
        <View style={styles.valueRow}>
          <Text variant="num" size={26} color={colors.text}>
            54
          </Text>
          <Text style={styles.smallUnit}>min</Text>
        </View>
      </Card>
      <Card style={styles.duoCard}>
        <Text variant="label" style={styles.fieldLabel}>
          Avg calories
        </Text>
        <View style={styles.valueRow}>
          <Text variant="num" size={26} color={colors.text}>
            2.4k
          </Text>
          <Text style={styles.smallUnit}>kcal</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  duo: { flexDirection: 'row', gap: 14 },
  duoCard: { flex: 1, padding: 16 },
  fieldLabel: { marginBottom: 6 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  smallUnit: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut, marginBottom: 3 },
});
