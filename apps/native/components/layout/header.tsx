import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/avatar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors'; // <- zakładam, że tu masz swój gainzosowy colors.ts

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }} className="bg-transparent">
      <LinearGradient
        colors={[`${colors.base}8C`, `${colors.base}00`]} // półprzezroczysty do transparent
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <View className="flex-row items-center gap-2.5">
          <View
            className="w-[34px] h-[34px] rounded-[10px] items-center justify-center overflow-hidden border"
            style={{
              borderColor: `${colors.success}33`, // 20% opacity
              backgroundColor: `${colors.success}12`, // 7% opacity
            }}
          >
            <Image
              source={require('@/assets/logo.png')}
              className="w-[22px] h-[22px]"
              resizeMode="contain"
            />
          </View>

          <View className="flex-row items-baseline gap-0.5">
            <Text
              className="text-[17px] font-extrabold tracking-[2.5px]"
              style={{ color: colors.textPrimary }}
            >
              GAINZ
            </Text>
            <Text
              className="text-[17px] font-light tracking-[2.5px] opacity-90"
              style={{ color: colors.textSecondary }}
            >
              OS
            </Text>
          </View>
        </View>

        {/* Right: avatar */}
        <View className="flex-row items-center gap-2.5">
          <Avatar />
        </View>
      </View>

      {/* Bottom accent line */}
      <LinearGradient
        colors={['transparent', `${colors.success}59`, 'transparent']} // 35% opacity
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.borderLine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderLine: {
    height: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});