import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, Lock, Pencil, Play, Timer } from 'lucide-react-native';
import type { WorkoutItemDTO } from '@gainzos/types';
import { colors, fontFamily } from '@/theme';
import {
  Badge,
  Button,
  Card,
  Img,
  IconButton,
  Pad,
  Screen,
  SectionHead,
  Text,
} from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import {
  categoriesOf,
  templateById,
  templateEstMinutes,
  templateSetCount,
} from '@/lib/mock';
import { useStartWorkout } from '@/lib/hooks/use-start-workout';

/**
 * Compact one-line summary of an exercise's sets. Shows uniform values directly
 * (e.g. "4 × 8 · 80kg") and collapses to "varied" / a range when sets differ.
 */
function setSummary(item: WorkoutItemDTO): { load: string; rest: string | null } {
  const sets = item.sets;
  const first = sets[0];
  if (!first) return { load: 'No sets', rest: null };

  const sameWork = sets.every(
    (s) => s.reps === first.reps && s.durationSeconds === first.durationSeconds,
  );
  const sameWeight = sets.every((s) => s.weight === first.weight);
  const sameRest = sets.every((s) => s.restTimeSeconds === first.restTimeSeconds);

  const work = first.reps || `${first.durationSeconds}s`;
  const load = `${sets.length} × ${sameWork ? work : 'varied'}${
    sameWeight && first.weight ? ` · ${first.weight}kg` : ''
  }`;

  const rests = sets.map((s) => s.restTimeSeconds);
  const rest = sameRest
    ? `${first.restTimeSeconds}s`
    : `${Math.min(...rests)}–${Math.max(...rests)}s`;

  return { load, rest };
}

export default function TemplateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const startWorkout = useStartWorkout();
  const template = templateById(Number(id));

  if (!template) {
    return (
      <View style={styles.missing}>
        <BackHeader title="Not found" />
        <Pad>
          <Text variant="body">This template no longer exists.</Text>
        </Pad>
      </View>
    );
  }

  const categories = categoriesOf(template.muscleGroups);

  return (
    <View style={styles.root}>
      <BackHeader
        transparent
        right={
          <IconButton size={40} onPress={() => router.push(`/templates/${id}/edit`)} style={styles.glassBtn}>
            <Pencil size={19} strokeWidth={2.1} color={colors.text} />
          </IconButton>
        }
      />

      <Screen contentStyle={styles.scrollPad}>
        <Img media={template.items[0]?.exercise.image} radius={0} scrim scrimStrength={0.95} style={styles.hero}>
          <View style={styles.heroContent}>
            <Text variant="display" size={38} color={colors.white}>
              {template.name}
            </Text>
          </View>
        </Img>

        <Pad style={styles.section}>
          <Text variant="body">{template.description}</Text>

          <View style={styles.statRow}>
            {[
              { value: String(template.items.length), label: 'Exercises' },
              { value: String(templateSetCount(template)), label: 'Total sets' },
              { value: `~${templateEstMinutes(template)}`, label: 'Minutes' },
            ].map((s) => (
              <Card key={s.label} style={styles.statCard}>
                <Text variant="num" size={24} color={colors.text}>
                  {s.value}
                </Text>
                <Text variant="small" style={styles.statLabel}>
                  {s.label}
                </Text>
              </Card>
            ))}
          </View>

          <View style={styles.muscles}>
            <Text variant="label" style={styles.fieldLabel}>
              Target muscle groups
            </Text>
            <View style={styles.chips}>
              {categories.map((c) => (
                <Badge key={c} label={c} uppercase={false} />
              ))}
            </View>
          </View>

          <SectionHead title="Exercises" />
          <View style={styles.exList}>
            {template.items.map((item, index) => {
              const summary = setSummary(item);
              return (
                <Card
                  key={item.id}
                  onPress={() => router.push(`/exercise/${item.exercise.id}`)}
                  style={styles.exRow}
                >
                  <Text variant="num" size={15} color={colors.textMut} style={styles.exIndex}>
                    {index + 1}
                  </Text>
                  <Img media={item.exercise.image} radius={12} style={styles.exThumb} />
                  <View style={styles.exInfo}>
                    <Text variant="h3" color={colors.text}>
                      {item.exercise.name}
                    </Text>
                    <Text variant="small" style={styles.exMeta}>
                      {summary.load}
                    </Text>
                  </View>
                  {summary.rest && (
                    <View style={styles.exRest}>
                      <Timer size={14} strokeWidth={2.2} color={colors.textMut} />
                      <Text style={styles.exRestText}>{summary.rest}</Text>
                    </View>
                  )}
                </Card>
              );
            })}
          </View>
        </Pad>
      </Screen>

      {/* Sticky CTA — seeds a live session from this template and opens it. */}
      <LinearGradient colors={['rgba(14,14,16,0)', colors.bg]} style={styles.footer}>
        <Button
          block
          size="lg"
          onPress={() => startWorkout(template)}
          icon={<Play size={18} color={colors.white} fill={colors.white} />}
        >
          Start workout
        </Button>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  missing: { flex: 1, backgroundColor: colors.bg },
  glassBtn: { backgroundColor: 'rgba(20,20,23,0.55)' },
  scrollPad: { paddingBottom: 110 },
  hero: { width: '100%', height: 240 },
  heroContent: { position: 'absolute', left: 20, right: 20, bottom: 18, gap: 8 },
  heroBadge: { marginBottom: 0 },
  section: { marginTop: 18, gap: 18 },
  statRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, padding: 14, alignItems: 'center' },
  statLabel: { fontSize: 11, marginTop: 2 },
  muscles: { gap: 10 },
  fieldLabel: { marginBottom: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  exList: { gap: 10 },
  exRow: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 12 },
  exIndex: { width: 18, textAlign: 'center' },
  exThumb: { width: 48, height: 48 },
  exInfo: { flex: 1 },
  exMeta: { marginTop: 2 },
  exRest: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  exRestText: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 32,
  },
});
