import { Text, View } from 'react-native';
import { QuoteCard } from '@/components/feats/home/quote-card';
import { ScreenTitle } from '@/components/ui/screen-title';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <ScreenTitle title="Welcome back" />
      <QuoteCard quote="Nie ma nic lepszego niż być sobą." />
    </View>
  );
}
