import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Clock, Flame, Layers, Repeat, Check } from 'lucide-react-native';
import { colors, gradients, radius, shadows, spacing } from '@/theme';
import { Button, Card, Screen, Pad, StatTile, Text } from '@/components/ui';
import { fmtClock } from '@/lib/utils/format';
import { useWorkoutStore } from '@/lib/store/workout';

/** Post-session recap — shown once `finishWorkout` stashes a summary. */
export default function WorkoutCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const summary = useWorkoutStore((s) => s.lastSummary);
  const clearSummary = useWorkoutStore((s) => s.clearSummary);
  const pendingUpdate = useWorkoutStore((s) => s.pendingTemplateUpdate);
  const applyTemplateUpdate = useWorkoutStore((s) => s.applyTemplateUpdate);
  const discardTemplateUpdate = useWorkoutStore((s) => s.discardTemplateUpdate);
  const [templateChoice, setTemplateChoice] = useState<'updated' | 'kept' | null>(null);

  // Nothing to show (deep link, reload) — bounce home.
  if (!summary) return <Redirect href="/" />;

  const done = () => {
    clearSummary();
    router.replace('/');
  };

  const updateTemplate = () => {
    applyTemplateUpdate();
    setTemplateChoice('updated');
  };
  const keepTemplate = () => {
    discardTemplateUpdate();
    setTemplateChoice('kept');
  };

  return (
    <View style={styles.root}>
      <Screen contentStyle={[styles.content, { paddingTop: insets.top + spacing['3xl'] }]}>
        <Pad style={styles.stack}>
          <LinearGradient
            colors={gradients.accent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.medal, shadows.accentGlow]}
          >
            <Trophy size={44} strokeWidth={2} color={colors.white} />
          </LinearGradient>

          <View style={styles.headings}>
            <Text variant="label" style={styles.kicker}>
              Workout complete
            </Text>
            <Text variant="display" size={34} color={colors.text} style={styles.title}>
              {summary.name}
            </Text>
            <Text variant="body" style={styles.sub}>
              {summary.doneSets} of {summary.totalSets} sets · {summary.exercises}{' '}
              {summary.exercises === 1 ? 'exercise' : 'exercises'}
            </Text>
          </View>

          {pendingUpdate && templateChoice === null ? (
            <Card tier="2" style={styles.updateCard}>
              <View style={styles.updateText}>
                <Text variant="h3" color={colors.text}>
                  Update “{pendingUpdate.name}”?
                </Text>
                <Text variant="small" style={styles.updateSub}>
                  You changed sets, weights or reps this session. Save them to your template?
                </Text>
              </View>
              <View style={styles.updateActions}>
                <View style={styles.updateBtn}>
                  <Button variant="secondary" block onPress={keepTemplate}>
                    Keep original
                  </Button>
                </View>
                <View style={styles.updateBtn}>
                  <Button block onPress={updateTemplate}>
                    Update
                  </Button>
                </View>
              </View>
            </Card>
          ) : templateChoice ? (
            <View style={styles.choiceNote}>
              {templateChoice === 'updated' && (
                <Check size={15} strokeWidth={2.6} color={colors.success} />
              )}
              <Text variant="small">
                {templateChoice === 'updated' ? 'Template updated' : 'Template kept as-is'}
              </Text>
            </View>
          ) : null}

          <View style={styles.grid}>
            <View style={styles.cell}>
              <StatTile icon={Clock} value={fmtClock(summary.durationSeconds)} label="Duration" accent />
            </View>
            <View style={styles.cell}>
              <StatTile
                icon={Flame}
                value={summary.volume.toLocaleString()}
                unit="kg"
                label="Total volume"
                accent
              />
            </View>
            <View style={styles.cell}>
              <StatTile icon={Layers} value={summary.doneSets} label="Sets done" />
            </View>
            <View style={styles.cell}>
              <StatTile icon={Repeat} value={summary.totalReps} label="Total reps" />
            </View>
          </View>

          {summary.notes ? (
            <Card style={styles.notesCard}>
              <Text variant="label" style={styles.notesLabel}>
                Notes
              </Text>
              <Text variant="body" color={colors.text2}>
                {summary.notes}
              </Text>
            </Card>
          ) : null}
        </Pad>
      </Screen>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pad>
          <Button block size="lg" onPress={done}>
            Done
          </Button>
        </Pad>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 120 },
  stack: { alignItems: 'center', gap: spacing.xl },
  medal: {
    width: 92,
    height: 92,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headings: { alignItems: 'center', gap: 6 },
  kicker: { color: colors.accentBr },
  title: { textAlign: 'center' },
  sub: { textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    width: '100%',
  },
  cell: { flexGrow: 1, flexBasis: '46%' },
  notesCard: { width: '100%', gap: 8 },
  notesLabel: {},
  updateCard: { width: '100%', gap: 16 },
  updateText: { gap: 4 },
  updateSub: {},
  updateActions: { flexDirection: 'row', gap: spacing.md },
  updateBtn: { flex: 1 },
  choiceNote: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    paddingTop: spacing.md,
  },
});
