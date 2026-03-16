import { Text } from 'react-native';
import { Card } from '@/components/ui/card';

interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="bg-bg-muted p-4">
      <Text className="text-lg italic text-text-secondary">"{quote}"</Text>
    </Card>
  );
}