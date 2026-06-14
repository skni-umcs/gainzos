import { View, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { colors, fontFamily } from '@/theme';
import { Text } from '@/components/ui';
import { TODAY } from '@/lib/mock';

/** "Good morning, <name>" with today's date and a streak pill. */
export function Greeting() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <View style={styles.row}>
      <View>
        <Text variant="eyebrow">Good morning</Text>
        <Text variant="display" size={38} color={colors.text} style={styles.name}>
          {TODAY.greetingName}
        </Text>
        <Text variant="small" style={styles.date}>
          {dateStr}
        </Text>
      </View>
      <View style={styles.streak}>
        <Flame size={16} color={colors.warning} fill={colors.warning} />
        <Text variant="num" size={17} color={colors.text}>
          {TODAY.streak}
        </Text>
        <Text style={styles.streakLabel}>days</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { marginTop: 2 },
  date: { marginTop: 4 },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  streakLabel: { fontFamily: fontFamily.bodyBold, fontSize: 11, color: colors.textMut },
});
