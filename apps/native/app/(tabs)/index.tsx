import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { QuoteCard } from '@/components/home/quote';
import { Quote } from '@/lib/types/quote';
import { Greeting } from '@/components/home/greeting';
import { HeroStats } from '@/components/home/hero-stats';
import { StartTrainingButton } from '@/components/home/start-training';

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
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Greeting />
      <QuoteCard quote={quote} />
      <StartTrainingButton />
      <HeroStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});