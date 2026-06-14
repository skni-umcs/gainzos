import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { IconButton, Text } from '@/components/ui';

interface BackHeaderProps {
  title?: string;
  /** Floats over a full-bleed hero with translucent buttons and no background. */
  transparent?: boolean;
  right?: ReactNode;
  onBack?: () => void;
}

/** Push-screen header with a back button; transparent mode floats over a hero image. */
export function BackHeader({ title, transparent, right, onBack }: BackHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const back = onBack ?? (() => router.back());

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.sm },
        transparent ? styles.transparent : styles.solid,
      ]}
    >
      <IconButton onPress={back} size={40} style={transparent ? styles.glassBtn : undefined}>
        <ChevronLeft size={22} strokeWidth={2.2} color={colors.text} />
      </IconButton>
      {title ? (
        <Text variant="h2" color={colors.text} style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={styles.spacer} />
      )}
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  solid: { backgroundColor: colors.bg },
  transparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  glassBtn: { backgroundColor: 'rgba(20,20,23,0.55)' },
  title: { flex: 1 },
  spacer: { flex: 1 },
});
