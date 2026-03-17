import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame } from 'lucide-react-native';

export function StartWorkoutButton() {
  return (
    <TouchableOpacity activeOpacity={0.85} className="mb-3">
      <LinearGradient
        colors={['#7c22d4', '#9b30ff', '#6600cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="relative py-4 mb-3 flex-row items-center justify-center"
        style={{ borderRadius: 16 }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.13)', 'transparent']}
          className="absolute inset-0 rounded-2xl"
          style={{ borderRadius: 16 }}
        />
        <View className="w-7 h-7 items-center justify-center mr-2">
          <Flame size={15} color="#fff" fill="#fff" />
        </View>
        <Text className="text-white text-base font-bold" style={{ letterSpacing: 0.3 }}>
          Rozpocznij trening
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

