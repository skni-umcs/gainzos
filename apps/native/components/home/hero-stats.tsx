import { View, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';

export function HeroStats() {
  const calories = {
    burned: 450,
    goal: 800,
  };

  const training_amounts = {
    completed: 3,
    total: 5,
  };

  const caloriesProgress = (calories.burned / calories.goal) * 100;
  const trainingsProgress = (training_amounts.completed / training_amounts.total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.card}>
          <Text style={styles.statLabel}>Kalorie</Text>
          <View style={styles.valueRow}>
            <Text style={styles.statValue}>{calories.burned}</Text>
            <Text style={styles.statSub}>/ {calories.goal}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(caloriesProgress, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.statLabel}>Treningi</Text>
          <View style={styles.valueRow}>
            <Text style={styles.statValue}>{training_amounts.completed}</Text>
            <Text style={styles.statSub}>/ {training_amounts.total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(trainingsProgress, 100)}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  statValue: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  statSub: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    paddingBottom: 4,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});