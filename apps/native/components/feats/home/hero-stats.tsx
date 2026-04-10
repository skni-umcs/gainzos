import { ProgressRing } from '@/components/ui/progress-ring';
import { View, StyleSheet, Text } from 'react-native';

export function HeroStats() {
  const calories = {
    burned: 450,
    goal: 800,
  };

  const training_amounts = {
    completed: 3,
    total: 5,
  };

  return (
    <View style={styles.container}>
      {/* TOP ROW */}
      <View style={styles.topRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Kalorie</Text>
          <Text style={styles.statValue}>
            {calories.burned}
          </Text>
          <Text style={styles.statSub}>
            / {calories.goal}
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Treningi</Text>
          <Text style={styles.statValue}>
            {training_amounts.completed}
          </Text>
          <Text style={styles.statSub}>
            / {training_amounts.total}
          </Text>
        </View>
      </View>

      {/* BIG RING BELOW */}
      <ProgressRing
        value={calories.burned}
        max={calories.goal}
        size={180}
        strokeWidth={14}
        innerRing={{
          value: training_amounts.completed,
          max: training_amounts.total,
          strokeWidth: 8,
          gap: 10,
        }}
      >
        <View style={styles.center}>
          <Text style={styles.centerMain}>
            {Math.round((calories.burned / calories.goal) * 100)}%
          </Text>
          <Text style={styles.centerSub}>progress</Text>
        </View>
      </ProgressRing>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  statLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },

  statValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: '800',
  },

  statSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
  },

  center: {
    alignItems: 'center',
  },

  centerMain: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
  },

  centerSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});