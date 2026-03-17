import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';


interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View className="relative flex-row items-stretch rounded-2xl border border-border bg-bg-surface-alt p-4 mb-6 overflow-hidden">
      <LinearGradient colors={['#9b30ff', '#7c22d4']} style={StyleSheet.absoluteFillObject} />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(10, 10, 15, 0.8)' }]} />

      <LinearGradient
        colors={['#c084fc', 'rgba(192,132,252,0.15)']}
        style={{ width: 3, borderRadius: 999, alignSelf: 'stretch', marginRight: 12 }}
      />
      <Text
        className="flex-1 text-text-primary text-[14px] italic"
        style={{ lineHeight: 21 }}
      >
        {quote}
      </Text>
    </View>
  );
}
