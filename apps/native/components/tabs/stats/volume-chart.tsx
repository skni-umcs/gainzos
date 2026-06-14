import { View, StyleSheet } from 'react-native';
import { ArrowUp } from 'lucide-react-native';
import { colors, fontFamily } from '@/theme';
import { Card, LineChart, Text } from '@/components/ui';
import { VOLUME_TREND } from '@/lib/mock';

/** Hero card: total training volume for the range, with a trend line. */
export function VolumeChart() {
  const totalVolume = VOLUME_TREND.reduce((a, b) => a + b, 0);

  return (
    <Card>
      <View style={styles.head}>
        <View>
          <Text variant="label" style={styles.fieldLabel}>
            Total volume
          </Text>
          <View style={styles.valueRow}>
            <Text variant="num" size={42} color={colors.text}>
              {totalVolume}
            </Text>
            <Text style={styles.unit}>tonnes</Text>
          </View>
        </View>
        <View style={styles.delta}>
          <ArrowUp size={15} strokeWidth={2.6} color={colors.success} />
          <Text style={styles.deltaText}>18%</Text>
        </View>
      </View>
      <LineChart data={VOLUME_TREND} height={120} />
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  fieldLabel: { marginBottom: 6 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  unit: { fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.textMut, marginBottom: 4 },
  delta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 26 },
  deltaText: { fontFamily: fontFamily.bodyBold, fontSize: 13, color: colors.success },
});
