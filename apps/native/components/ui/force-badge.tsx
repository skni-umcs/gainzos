import { View, StyleSheet } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { forceColor } from '@/lib/mock';
import { Text } from './text';

/** Small dot + label badge coloring a movement's force type (Push / Pull / Static). */
export function ForceBadge({ force }: { force: string }) {
  const color = forceColor(force);
  return (
    <View style={styles.badge}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{force}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.sm,
    backgroundColor: colors.surface3,
    alignSelf: 'flex-start',
  },
  dot: { width: 5, height: 5, borderRadius: 999 },
  label: { fontFamily: fontFamily.bodyBold, fontSize: 10.5 },
});
