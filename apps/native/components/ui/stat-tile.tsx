import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown, type LucideProps } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Card } from './card';
import { Text } from './text';

interface StatTileProps {
  icon?: ComponentType<LucideProps>;
  value: string | number;
  unit?: string;
  label: string;
  delta?: string;
  deltaUp?: boolean;
  accent?: boolean;
}

/** Compact metric tile: icon, value+unit, label, and an optional trend delta. */
export function StatTile({ icon: Icon, value, unit, label, delta, deltaUp, accent }: StatTileProps) {
  const deltaColor = deltaUp ? colors.success : colors.error;
  const DeltaIcon = deltaUp ? ArrowUp : ArrowDown;
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        {Icon && (
          <View style={[styles.iconBox, { backgroundColor: accent ? colors.accentSoft : colors.surface3 }]}>
            <Icon size={18} strokeWidth={2} color={accent ? colors.accentBr : colors.text2} />
          </View>
        )}
        {delta != null && (
          <View style={styles.delta}>
            <DeltaIcon size={13} strokeWidth={2.6} color={deltaColor} />
            <Text style={[styles.deltaText, { color: deltaColor }]}>{delta}</Text>
          </View>
        )}
      </View>
      <View style={styles.valueRow}>
        <Text variant="num" size={30} color={colors.text}>
          {value}
        </Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      <Text variant="small" style={styles.label}>
        {label}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  iconBox: { width: 34, height: 34, borderRadius: radius.xs, alignItems: 'center', justifyContent: 'center' },
  delta: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  deltaText: { fontFamily: fontFamily.bodyBold, fontSize: 12 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  unit: { fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.textMut, marginBottom: 3 },
  label: { marginTop: 2 },
});
