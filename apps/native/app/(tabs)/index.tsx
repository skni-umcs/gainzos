import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { Screen, Pad } from '@/components/ui';
import { Greeting } from '@/components/home/greeting';
import { ProgressRings } from '@/components/home/progress-rings';
import { StartCta } from '@/components/home/start-cta';
import { QuoteCard } from '@/components/home/quote-card';
import { RecentActivity } from '@/components/home/recent-activity';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.stack}>
        <Pad>
          <Greeting />
        </Pad>
        <Pad>
          <ProgressRings />
        </Pad>
        <Pad>
          <StartCta />
        </Pad>
        <Pad>
          <QuoteCard />
        </Pad>
        <Pad>
          <RecentActivity />
        </Pad>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg, paddingTop: spacing.xs },
});
