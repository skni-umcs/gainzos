import type { Quote } from '@/lib/types/quote';
import { View, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { StyleSheet } from 'react-native';
import { QuoteIcon } from 'lucide-react-native';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.glassOverlay} />

      <View style={styles.content}>
        <Text style={styles.text} numberOfLines={4} ellipsizeMode="tail">
          "{quote.text}"
        </Text>

        <Text style={styles.author}>— {quote.author}</Text>
      </View>
      <QuoteIcon size={24} color={colors.primary} style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(10, 8, 20, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
    marginVertical: 8,
    overflow: 'hidden',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  bar: {
    width: 3,
    borderRadius: 3,
    marginRight: 14,
    alignSelf: 'stretch',
    opacity: 0.85,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: 'rgba(230, 220, 255, 0.92)',
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  author: {
    color: 'rgba(180, 160, 240, 0.75)',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: 0.4,
  },
});
