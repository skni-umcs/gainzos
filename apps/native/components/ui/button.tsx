import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontFamily, gradients, radius, shadows } from '@/theme';
import { Text } from './text';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  size?: 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/** Pill button. `primary` uses the accent gradient; `secondary`/`ghost` are flat. */
export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  block,
  disabled,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const fg = variant === 'primary' ? colors.white : variant === 'ghost' ? colors.text2 : colors.text;
  const pad = size === 'lg' ? styles.lg : styles.md;

  const content = (
    <View style={styles.inner}>
      {icon}
      {typeof children === 'string' ? (
        <Text style={[styles.label, { color: fg }, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        block && styles.block,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={gradients.accent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, pad, shadows.accentGlow]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.base, pad, variant === 'ghost' ? styles.ghost : styles.secondary]}>
          {content}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  md: { paddingVertical: 14, paddingHorizontal: 22 },
  lg: { paddingVertical: 17, paddingHorizontal: 26 },
  secondary: { backgroundColor: colors.surface3 },
  ghost: { borderWidth: 1, borderColor: colors.line2 },
  block: { width: '100%' },
  pressed: { transform: [{ scale: 0.97 }] },
  disabled: { opacity: 0.5 },
  label: { fontFamily: fontFamily.bodyBold, fontSize: 15 },
});
