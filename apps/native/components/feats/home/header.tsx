import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { Avatar } from '@/components/ui/avatar';

export function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between mb-7">
      <View className="flex-row items-center gap-3">
        <LinearGradient
          colors={['#9b30ff', '#5500cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('@/assets/logo.png')}
            style={{ width: 26, height: 26 }}
            contentFit="contain"
          />
        </LinearGradient>
        <View>
          <Text
            style={{
              fontFamily: 'Syne-ExtraBold',
              fontSize: 19,
              color: '#fff',
              letterSpacing: -0.3,
            }}
          >
            Gainz<Text style={{ color: '#b46fff' }}>OS</Text>
          </Text>
          <Text
            style={{
              fontFamily: 'DMmono',
              fontSize: 10,
              color: 'rgba(180,111,255,0.7)',
              letterSpacing: 1.5,
            }}
          >
            EXERCISE TRACKER
          </Text>
        </View>
      </View>

      <Avatar />
    </View>
  );
}
