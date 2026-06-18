import { View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell, Play } from 'lucide-react-native';
import { colors, fontFamily, gradients, radius, shadows } from '@/theme';
import { Text } from '@/components/ui';
import { templateById } from '@/lib/mock';
import { useStartWorkout } from '@/lib/hooks/use-start-workout';

export function StartCta() {
  const startWorkout = useStartWorkout();
  const template = templateById(1);
  if (!template) return null;

  const start = () => startWorkout(template);

  return (
    <View>
      <LinearGradient
        colors={gradients.accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, shadows.accentGlow]}
      >
        <View style={styles.watermark}>
          <Dumbbell size={150} strokeWidth={1.4} color={colors.white} />
        </View>

        <Text style={styles.kicker}>Today’s session</Text>
        <Text variant="display" size={30} color={colors.white} style={styles.title}>
          {template.name}
        </Text>

        <Pressable onPress={start} style={styles.pill}>
          <Play size={17} color={colors.accentDeep} fill={colors.accentDeep} />
          <Text style={styles.pillText}>Start training</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.xl, padding: 22, overflow: 'hidden' },
  watermark: {
    position: 'absolute',
    right: -28,
    top: -28,
    opacity: 0.18,
    transform: [{ rotate: '-12deg' }],
  },
  kicker: {
    fontFamily: fontFamily.bodyExtraBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.8)',
  },
  title: { marginTop: 6 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: radius.pill,
    marginTop: 16,
  },
  pillText: { fontFamily: fontFamily.bodyExtraBold, fontSize: 15, color: colors.accentDeep },
});
