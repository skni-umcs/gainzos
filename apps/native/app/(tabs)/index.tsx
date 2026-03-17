import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { HomeHeader } from '@/components/feats/home/header';
import { QuoteCard } from '@/components/feats/home/quote-card';
import { StatsList } from '@/components/feats/home/stats-list';
import { LastWorkout } from '@/components/feats/home/last-workout';
import { Greeting } from '@/components/feats/home/greeting';
import { WeeklyActivityChart } from '@/components/feats/home/activity-chart';
import { StartWorkoutButton } from '@/components/feats/home/start-training-button';

export default function Index() {
  const { t } = useTranslation('translations', { keyPrefix: 'screens.home' });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <Greeting/>
        <QuoteCard quote="Nie liczy się to, ile razy upadasz, ale ile razy się podnosisz." />
        <StartWorkoutButton />
        <StatsList/>
        <LastWorkout />
        <WeeklyActivityChart />
      </ScrollView>
    </SafeAreaView>
  );
}
