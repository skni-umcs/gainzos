import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { Screen, Pad } from '@/components/ui';
import { Greeting } from '@/components/tabs/home/greeting';
import { ProgressRings } from '@/components/tabs/home/progress-rings';
import { StartCta } from '@/components/tabs/home/start-cta';
import { QuoteCard } from '@/components/tabs/home/quote-card';
import { RecentActivity } from '@/components/tabs/home/recent-activity';

export default function HomeScreen() {
  return (
    <Screen>
      <Pad>
        <View style={styles.stack}>
          <Greeting />
          <ProgressRings />
          <StartCta />
          <QuoteCard />
          <RecentActivity />
        </View>
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg, paddingTop: spacing.xs },
});
