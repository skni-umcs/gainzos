import { View, Pressable, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, fontFamily } from '@/theme';
import { Text } from './text';

interface SectionHeadProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

/** Section title with an optional right-aligned action link. */
export function SectionHead({ title, action, onAction }: SectionHeadProps) {
  return (
    <View style={styles.row}>
      <Text variant="h2" color={colors.text}>
        {title}
      </Text>
      {action && (
        <Pressable onPress={onAction} style={styles.action} hitSlop={8}>
          <Text style={styles.actionLabel}>{action}</Text>
          <ChevronRight size={15} strokeWidth={2.4} color={colors.accentBr} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionLabel: { fontFamily: fontFamily.bodyBold, fontSize: 13.5, color: colors.accentBr },
});
