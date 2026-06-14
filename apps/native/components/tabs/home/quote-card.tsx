import { View, StyleSheet } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from '@/components/ui';
import { QUOTE } from '@/lib/mock';

/** Motivational quote with an oversized decorative quotation mark. */
export function QuoteCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>{QUOTE.text}</Text>
      <Text style={styles.author}>— {QUOTE.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: 20,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  quote: {
    fontFamily: fontFamily.displayMedium,
    fontSize: 18,
    lineHeight: 22,
    color: colors.text,
  },
  author: {
    marginTop: 12,
    fontFamily: fontFamily.bodyBold,
    fontSize: 12.5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.accentBr,
  },
});
