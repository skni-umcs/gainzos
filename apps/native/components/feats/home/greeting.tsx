import { Text, View } from 'react-native';

export function Greeting() {
  return (
    <View className="mb-6">
      <Text
        style={{
          fontFamily: 'DMmono',
          fontSize: 11,
          color: 'white',
          letterSpacing: 1.8,
          marginBottom: 4,
        }}
      >
        WITAMY PONOWNIE
      </Text>
      <Text style={{ fontFamily: 'Syne-Bold', fontSize: 26, color: '#fff', lineHeight: 32 }}>
        Cześć, <Text style={{ color: '#c084fc' }}>Damian!</Text>
      </Text>
    </View>
  );
}
