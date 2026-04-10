import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { QuoteCard } from '@/components/feats/home/quote';
import { Quote } from '@/lib/types/quote';
import { Greeting } from '@/components/feats/home/greeting';
import { ProgressRing } from '@/components/ui/progress-ring';
import { View, Text, StyleSheet } from 'react-native';
import { HeroStats } from '@/components/feats/home/hero-stats';
import { StartTrainingButton } from '@/components/feats/home/start-training';

export default function Index() {
  const { t } = useTranslation('translations', { keyPrefix: 'screens.home' });

  const quote: Quote = {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    isVulgar: false,
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Greeting />
      <QuoteCard quote={quote} />
      <StartTrainingButton />
      <HeroStats />
    </ScrollView>
  );
}
