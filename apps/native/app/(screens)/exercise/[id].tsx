import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Play } from 'lucide-react-native';
import { colors, radius } from '@/theme';
import {
  Badge,
  Button,
  Card,
  IconButton,
  Img,
  MusclePill,
  Pad,
  Screen,
  Text,
} from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import { exerciseById, muscleLabel, CUES, HAS_VIDEO } from '@/lib/mock';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = exerciseById(id);

  if (!exercise) {
    return (
      <View style={styles.root}>
        <BackHeader title="Not found" />
        <Pad>
          <Text variant="body">This exercise no longer exists.</Text>
        </Pad>
      </View>
    );
  }

  const cues = CUES[exercise.id] ?? [exercise.destription];

  return (
    <View style={styles.root}>
      <BackHeader
        transparent
        right={
          <IconButton size={40} style={styles.glassBtn}>
            <Plus size={20} strokeWidth={2.4} color={colors.text} />
          </IconButton>
        }
      />

      <Screen contentStyle={styles.scrollPad}>
        <Img media={exercise.image} radius={0} scrim scrimStrength={0.6} style={styles.hero}>
          <View style={styles.playWrap}>
            <View style={styles.playButton}>
              <Play size={26} color={colors.white} fill={colors.white} style={styles.playGlyph} />
            </View>
          </View>
          {HAS_VIDEO[exercise.id] && (
            <Badge
              label="Demo video"
              tone="accent"
              icon={<Play size={11} color={colors.accentBr} fill={colors.accentBr} />}
              style={styles.demoBadge}
            />
          )}
        </Img>

        <Pad style={styles.section}>
          <View style={styles.badges}>
            <Badge label={exercise.force} uppercase={false} />
            <Badge label={exercise.exerciseType.name} uppercase={false} />
          </View>

          <Text variant="display" size={34} color={colors.text}>
            {exercise.name}
          </Text>
          <Text variant="body" style={styles.desc}>
            {exercise.destription}
          </Text>

          <View style={styles.muscles}>
            <Text variant="label" style={styles.fieldLabel}>
              Targeted muscles
            </Text>
            <View style={styles.pills}>
              <MusclePill label={muscleLabel(exercise.primaryMuscle)} />
              <MusclePill label={muscleLabel(exercise.secondaryMuscle)} secondary />
            </View>
          </View>

          <Card tier="2">
            <Text variant="label" style={styles.howLabel}>
              How to perform
            </Text>
            <View style={styles.cues}>
              {cues.map((cue, i) => (
                <View key={i} style={styles.cueRow}>
                  <View style={styles.cueNum}>
                    <Text variant="num" size={13} color={colors.accentBr}>
                      {i + 1}
                    </Text>
                  </View>
                  <Text variant="small" color={colors.text2} style={styles.cueText}>
                    {cue}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </Pad>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  glassBtn: { backgroundColor: 'rgba(20,20,23,0.55)' },
  scrollPad: { paddingBottom: 110 },
  hero: { width: '100%', height: 300 },
  playWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  playButton: {
    width: 66,
    height: 66,
    borderRadius: 999,
    backgroundColor: 'rgba(20,20,23,0.55)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: { marginLeft: 3 },
  demoBadge: { position: 'absolute', top: 14, right: 14 },
  section: { marginTop: 18, gap: 12 },
  badges: { flexDirection: 'row', gap: 8 },
  desc: { marginTop: 0 },
  muscles: { gap: 10, marginTop: 10 },
  fieldLabel: {},
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  howLabel: { marginBottom: 12 },
  cues: { gap: 12 },
  cueRow: { flexDirection: 'row', gap: 12 },
  cueNum: {
    width: 24,
    height: 24,
    borderRadius: radius.xs,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cueText: { flex: 1, lineHeight: 21 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 32,
  },
});
