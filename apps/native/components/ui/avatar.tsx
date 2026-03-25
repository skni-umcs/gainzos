import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';
import { colors } from '@/theme/colors'; // <- Twój GainzOS colors

export function Avatar() {
  return (
    <View>
      <LinearGradient
        colors={[colors.primaryContainer, colors.primaryDim]}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: `${colors.primaryFixed}66`, // 0.4 opacity
        }}
      >
        <Text
          style={{
            fontFamily: 'Syne-Bold',
            fontSize: 14,
            color: colors.textPrimary,
          }}
        >
          DK
        </Text>
      </LinearGradient>
    </View>
  );
}