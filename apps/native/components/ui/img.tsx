import type { ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { MediaDTO } from '@gainzos/types';
import { placeholderImage } from '@/lib/mock';

interface ImgProps {
  media?: MediaDTO;
  radius?: number;
  /** Darkening gradient from the bottom (for text over images). */
  scrim?: boolean;
  /** 0–1 opacity of the scrim at its base. */
  scrimStrength?: number;
  style?: StyleProp<ViewStyle>;
  /** Overlay content (badges, titles) positioned above the image + scrim. */
  children?: ReactNode;
}

/** Image slot — renders a remote MediaDTO url or falls back to the bundled placeholder. */
export function Img({ media, radius = 14, scrim, scrimStrength = 0.9, style, children }: ImgProps) {
  const source: ImageSource | number = media?.url ? { uri: media.url } : placeholderImage;
  return (
    <View style={[styles.container, { borderRadius: radius }, style]}>
      <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" transition={150} />
      {scrim && (
        <LinearGradient
          colors={[`rgba(8,8,10,${scrimStrength})`, `rgba(8,8,10,${scrimStrength * 0.45})`, 'rgba(8,8,10,0)']}
          locations={[0, 0.38, 0.72]}
        />
      )}
      {children != null && <View style={StyleSheet.absoluteFill}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#1a1a1f',
  },
});
