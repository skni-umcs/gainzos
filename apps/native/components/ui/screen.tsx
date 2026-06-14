import type { ReactNode } from 'react';
import { ScrollView, View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { spacing } from '@/theme';

interface ScreenProps {
  children: ReactNode;
  /** Set false for screens that manage their own scrolling (e.g. sticky footers). */
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Scrollable screen body with a comfortable bottom inset and hidden scrollbar. */
export function Screen({ children, scroll = true, contentStyle }: ScreenProps) {
  if (!scroll) {
    return <View style={[styles.flex, contentStyle]}>{children}</View>;
  }
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

/** Horizontal page gutter (20px), matching the design's `<Pad>`. */
export function Pad({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.pad, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: spacing['2xl'] },
  pad: { paddingHorizontal: spacing.xl },
});
