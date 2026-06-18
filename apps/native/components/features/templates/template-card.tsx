import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Lock, List, Dumbbell } from 'lucide-react-native';
import type { WorkoutTemplateDTO } from '@gainzos/types';
import { colors, fontFamily, radius } from '@/theme';
import { Badge, Card, Img, Text } from '@/components/ui';
import { categoriesOf, templateSetCount } from '@/lib/mock';

/** Template summary card: cover hero + visibility badge, description, category chips, stats. */
export function TemplateCard({ template }: { template: WorkoutTemplateDTO }) {
  const router = useRouter();
  const categories = categoriesOf(template.muscleGroups);

  return (
    <Card onPress={() => router.push(`/templates/${template.id}/view`)} style={styles.card}>
      <Img media={template.items[0]?.exercise.image} radius={0} scrim scrimStrength={0.86} style={styles.cover}>
        <Text variant="display" size={24} color={colors.white} style={styles.title}>
          {template.name}
        </Text>
      </Img>

      <View style={styles.body}>
        <Text variant="small" color={colors.text2} style={styles.desc}>
          {template.description}
        </Text>
        <View style={styles.chips}>
          {categories.map((c) => (
            <Badge key={c} label={c} uppercase={false} style={styles.chip} />
          ))}
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <List size={15} strokeWidth={2.2} color={colors.textMut} />
            <Text style={styles.statText}>{template.items.length} exercises</Text>
          </View>
          <View style={styles.stat}>
            <Dumbbell size={15} strokeWidth={2.2} color={colors.textMut} />
            <Text style={styles.statText}>{templateSetCount(template)} sets</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: 'hidden' },
  cover: { width: '100%', height: 116 },
  title: { position: 'absolute', left: 14, bottom: 12, right: 14 },
  body: { padding: 14 },
  desc: { marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { borderRadius: radius.sm },
  stats: { flexDirection: 'row', gap: 14, marginTop: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statText: { fontFamily: fontFamily.bodySemiBold, fontSize: 12.5, color: colors.textMut },
});
