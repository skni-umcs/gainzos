import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Text } from 'react-native';

export function Avatar() {
  return (
    <View>
      <LinearGradient
        colors={['#5a00b4', '#9b30ff']}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: 'rgba(180,111,255,0.4)',
        }}
      >
        <Text style={{ fontFamily: 'Syne-Bold', fontSize: 14, color: '#fff' }}>DK</Text>
      </LinearGradient>
    </View>
  );
}
