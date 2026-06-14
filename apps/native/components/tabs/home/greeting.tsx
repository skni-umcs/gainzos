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
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { marginTop: 2 },
  date: { marginTop: 4 },
});
