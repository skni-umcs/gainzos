import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { typography } from '@/theme';

type Variant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
  /** Convenience for the common `lineHeight` override on numbers/headings. */
  size?: number;
}

/**
 * Typed text. Pick a `variant` from the design's type scale; override `color`
 * or `size` inline. Falls back to `body`.
 */
export function Text({ variant = 'body', color, size, style, ...rest }: TextProps) {
  const override: TextStyle = {};
  if (color) override.color = color;
  if (size) override.fontSize = size;
  return <RNText style={[typography[variant], override, style]} {...rest} />;
}
