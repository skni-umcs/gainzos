import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface StatCardProps {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  value: string | number;
  label: string;
  accent: string;
  bg: [string, string];
  topBar: [string, string];
}

export function StatCard({ Icon, value, label, accent, bg, topBar }: StatCardProps) {
  return (
    <View className="flex-1 rounded-2xl overflow-hidden border border-border bg-bg-surface-alt">
      <LinearGradient colors={bg} style={StyleSheet.absoluteFillObject} />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(10, 10, 15, 0.58)' }]} />

      <LinearGradient
        colors={topBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 3 }}
      />

      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <View
            className="h-10 w-10 rounded-xl items-center justify-center mr-3 border"
            style={{ borderColor: accent, backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            <Icon size={18} color={accent} />
          </View>
          <Text className="text-text-primary text-2xl font-bold">{value}</Text>
        </View>
        <Text className="text-text-secondary text-[11px]" style={{ letterSpacing: 0.8 }}>
          {label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
