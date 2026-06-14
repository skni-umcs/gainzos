import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dumbbell, type LucideProps } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius } from '@/theme';
import { Text } from './text';
import { Button } from './button';

interface EmptyStateProps {
  icon?: ComponentType<LucideProps>;
  title: string;
  body?: string;
  cta?: string;
  onCta?: () => void;
}

/** Centered empty/illustration state with an accent-tinted icon badge. */
export function EmptyState({ icon: Icon = Dumbbell, title, body, cta, onCta }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={gradients.accentSoft}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconBadge}
      >
        <Icon size={32} strokeWidth={1.8} color={colors.accentBr} />
      </LinearGradient>
      <Text variant="h3" color={colors.text}>
        {title}
      </Text>
      {body && (
        <Text variant="small" style={styles.body}>
          {body}
        </Text>
      )}
      {cta && (
        <Button onPress={onCta} style={styles.cta}>
          {cta}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 28, gap: 6 },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accentLine,
    marginBottom: 8,
  },
  body: { textAlign: 'center', maxWidth: 240 },
  cta: { marginTop: 12 },
});
