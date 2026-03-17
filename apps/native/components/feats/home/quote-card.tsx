import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';


interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'rgba(120,40,200,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(180,111,255,0.15)',
        borderRadius: 16,
        padding: 14,
        gap: 10,
        marginBottom: 22,
      }}
    >
      <LinearGradient
        colors={['#9b30ff', 'rgba(155,48,255,0.1)']}
        style={{ width: 3, borderRadius: 2, alignSelf: 'stretch' }}
      />
      <Text
        style={{
          fontFamily: 'Syne-Regular',
          fontSize: 13,
          fontStyle: 'italic',
          color: 'rgba(220,180,255,0.85)',
          lineHeight: 20,
          flex: 1,
        }}
      >
        {quote}
      </Text>
    </View>
  );
}
