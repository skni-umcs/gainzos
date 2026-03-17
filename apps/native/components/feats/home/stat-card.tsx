import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

interface StatCardProps {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  value: string | number;
  label: string;
  accent: string;
  bg: string;
  topBar: [string, string];
}

export function StatCard({ Icon, value, label, accent, bg, topBar }: StatCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        borderColor: 'rgba(180,111,255,0.12)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <LinearGradient
        colors={topBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 2 }}
      />
      <View style={{ padding: 14 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: bg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <Icon size={18} color={accent} />
        </View>
        <Text
          style={{
            fontFamily: 'Syne-ExtraBold',
            fontSize: 22,
            color: '#fff',
            lineHeight: 24,
            marginBottom: 3,
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            fontFamily: 'DMmono',
            fontSize: 10,
            color: 'rgba(180,111,255,0.6)',
            letterSpacing: 0.8,
          }}
        >
          {label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}