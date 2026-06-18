import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { X, Dumbbell, Flag, NotebookPen } from 'lucide-react-native';
import { colors, fontFamily, spacing } from '@/theme';
import { Button, EmptyState, IconButton, Pad, Screen, Text } from '@/components/ui';
import { ExerciseCard, RestBar, NotesSheet } from '@/components/features/workout';
import { fmtClock } from '@/lib/utils/format';
import { useNow, useWorkoutTimer } from '@/lib/hooks/use-workout-timer';
import { useWorkoutStore, type ActiveTimer } from '@/lib/store/workout';

/** Fire a "go" haptic the moment a rest period ends (skip, timeout, or auto-advance). */
function useRestEndCue() {
  const prev = useRef<ActiveTimer | null>(null);
  useEffect(
    () =>
      useWorkoutStore.subscribe((state) => {
        const next = state.session?.timer ?? null;
        const was = prev.current;
        const restEnded =
          was?.phase === 'rest' &&
          (!next || next.phase !== 'rest' || next.setId !== was.setId);
        if (restEnded) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        prev.current = next;
      }),
    [],
  );
}

/** Live session header — elapsed clock, title, and a close (cancel) control. */
function WorkoutHeader({
  name,
  startedAt,
  onClose,
}: {
  name: string;
  startedAt: number;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const now = useNow();
  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000));

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.headerInfo}>
        <Text variant="num" size={26} color={colors.text} style={styles.clock}>
          {fmtClock(elapsed)}
        </Text>
        <Text variant="small" numberOfLines={1}>
          {name}
        </Text>
      </View>
      <IconButton size={40} onPress={onClose}>
        <X size={20} strokeWidth={2.3} color={colors.text} />
      </IconButton>
    </View>
  );
}

export default function WorkoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const session = useWorkoutStore((s) => s.session);
  const ensureFresh = useWorkoutStore((s) => s.ensureFresh);
  const finishWorkout = useWorkoutStore((s) => s.finishWorkout);
  const cancelWorkout = useWorkoutStore((s) => s.cancelWorkout);
  const hasNotes = useWorkoutStore((s) => (s.session?.notes.trim().length ?? 0) > 0);
  const [notesOpen, setNotesOpen] = useState(false);

  // Drives the timer state machine; discards an abandoned session on launch.
  useWorkoutTimer();
  useRestEndCue();
  useEffect(() => {
    ensureFresh();
  }, [ensureFresh]);

  const goHome = () => router.replace('/');

  if (!session) {
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <View style={styles.headerInfo} />
          <IconButton size={40} onPress={goHome}>
            <X size={20} strokeWidth={2.3} color={colors.text} />
          </IconButton>
        </View>
        <Screen>
          <Pad>
            <EmptyState
              icon={Dumbbell}
              title="No active workout"
              body="Start a session from a template to begin tracking sets and rest."
            />
          </Pad>
        </Screen>
      </View>
    );
  }

  const handleCancel = () => {
    Alert.alert('Discard workout?', 'Your progress in this session will be lost.', [
      { text: 'Keep training', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          cancelWorkout();
          goHome();
        },
      },
    ]);
  };

  const handleFinish = () => {
    const summary = finishWorkout();
    if (summary) router.replace('/workout-complete');
    else goHome();
  };

  return (
    <View style={styles.root}>
      <WorkoutHeader name={session.name} startedAt={session.startedAt} onClose={handleCancel} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Pad style={styles.list}>
          {session.items.map((item, index) => (
            <ExerciseCard key={item.id} item={item} index={index} />
          ))}
        </Pad>
      </ScrollView>

      {/* Bottom bar: running timer above the notes + finish actions. */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <RestBar />
        <Pad style={styles.actions}>
          <IconButton size={54} onPress={() => setNotesOpen(true)} style={styles.notesBtn}>
            <NotebookPen size={21} strokeWidth={2.1} color={colors.text} />
            {hasNotes && <View style={styles.notesDot} />}
          </IconButton>
          <View style={styles.finishWrap}>
            <Button
              block
              size="lg"
              onPress={handleFinish}
              icon={<Flag size={18} strokeWidth={2.4} color={colors.white} />}
            >
              Finish workout
            </Button>
          </View>
        </Pad>
      </View>

      <NotesSheet visible={notesOpen} onClose={() => setNotesOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.bg,
  },
  headerInfo: { flex: 1 },
  clock: { fontFamily: fontFamily.displayBold },
  body: { paddingTop: spacing.xs, paddingBottom: spacing.lg },
  list: { gap: spacing.md },
  footer: {
    backgroundColor: colors.bg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  notesBtn: { backgroundColor: colors.surface3 },
  notesDot: {
    position: 'absolute',
    top: 11,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  finishWrap: { flex: 1 },
});
