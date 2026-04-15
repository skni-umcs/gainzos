import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';
import { colors } from '@/theme/colors'; // <- Twój GainzOS colors

export function Avatar() {
  return (
    <View>
      <LinearGradient
        colors={[colors.primary, colors.secondary]} // Gradient zdefiniowany w GainzOS colors
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: `${colors.primary}66`, // 0.4 opacity
        }}
      >
        <Text
          style={{
            fontFamily: 'Syne-Bold',
            fontSize: 14,
            color: colors.text,
          }}
        >
          DK
        </Text>
      </LinearGradient>
    </View>
  );
}