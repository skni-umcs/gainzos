import { StyleSheet } from 'react-native';
import { Pad, Screen } from '@/components/ui';
import { Cover } from '@/components/tabs/profile/cover';
import { Achievements } from '@/components/tabs/profile/achievements';
import { Metrics } from '@/components/tabs/profile/metrics';

export default function ProfileScreen() {
  return (
    <Screen>
      <Cover />

      <Pad style={styles.body}>
        <Achievements />
        <Metrics />
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { marginTop: 20, gap: 16 },
});
