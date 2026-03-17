import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame } from 'lucide-react-native';

export function StartWorkoutButton() {
  return (
    <TouchableOpacity activeOpacity={0.85} style={{ marginBottom: 14 }}>
      <LinearGradient
        colors={['#7c22d4', '#9b30ff', '#6600cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          gap: 10,
        }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.13)', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 18,
          }}
        />
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flame size={15} color="#fff" fill="#fff" />
        </View>
        <Text style={{ fontFamily: 'Syne-Bold', fontSize: 16, color: '#fff', letterSpacing: 0.3 }}>
          Rozpocznij trening
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
