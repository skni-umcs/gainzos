import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { Button, Chip, Pad, Screen, Text } from '@/components/ui';
import { TemplateCard } from '@/components/templates/template-card';
import { TEMPLATES } from '@/lib/mock';

type Filter = 'all' | 'public' | 'private';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export default function TemplatesScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const list = TEMPLATES.filter(
    (t) => filter === 'all' || (filter === 'public' ? t.isPublic : !t.isPublic),
  );

  return (
    <Screen>
      <Pad>
        <View style={styles.header}>
          <View>
            <Text variant="eyebrow">Your library</Text>
            <Text variant="display" size={34} color={colors.text}>
              Templates
            </Text>
          </View>
          {/* Template builder is deferred; button is a placeholder for the next pass. */}
          <Button size="md" icon={<Plus size={18} strokeWidth={2.6} color={colors.white} />}>
            New
          </Button>
        </View>

        <View style={styles.filters}>
          {FILTERS.map((f) => (
            <Chip key={f.id} label={f.label} active={filter === f.id} onPress={() => setFilter(f.id)} />
          ))}
        </View>

        <View style={styles.list}>
          {list.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </View>
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  filters: { flexDirection: 'row', gap: 8, marginBottom: spacing.lg },
  list: { gap: spacing.lg },
});
