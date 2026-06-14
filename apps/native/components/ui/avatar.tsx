import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { MediaDTO } from '@gainzos/types';
import { colors } from '@/theme';
import { Img } from './img';

interface AvatarProps {
  media?: MediaDTO;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Circular user avatar image with a faint ring. */
export function Avatar({ media, size = 38, onPress, style }: AvatarProps) {
  const ring = { width: size, height: size, borderRadius: size / 2 };
  const content = <Img media={media} radius={size / 2} style={[styles.img, ring]} />;

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={6} style={style}>
        {content}
      </Pressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  img: { borderWidth: 1.5, borderColor: colors.line2 },
});
