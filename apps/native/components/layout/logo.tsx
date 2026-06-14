import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, fontFamily } from '@/theme';
import { Text } from '@/components/ui';

interface LogoProps {
  size?: number;
  showWord?: boolean;
}

const logoImage = require('@/assets/logo.png');

/** Brand mark: logo image + "GAINZOS" wordmark. */
export function Logo({ size = 26, showWord = true }: LogoProps) {
  return (
    <View style={styles.row}>
      <Image source={logoImage} style={{ width: size, height: size }} contentFit="contain" />
      {showWord && (
        <Text style={[styles.word, { fontSize: size * 0.86 }]}>
          GAINZ<Text style={[styles.word, { fontSize: size * 0.86, color: colors.accentBr }]}>OS</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  word: { fontFamily: fontFamily.displayBold, color: colors.text, letterSpacing: 0.3 },
});
