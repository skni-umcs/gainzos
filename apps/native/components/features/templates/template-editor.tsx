import { useState, type ComponentProps } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Dumbbell, Plus } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Button, Card, EmptyState, Pad, Screen, SectionHead, Text } from '@/components/ui';
import { useTemplateStore } from '@/lib/store/template';
import { ExerciseItemCard } from './exercise-item-card';
import { AddExerciseSheet } from './add-exercise-sheet';

/** Labelled fill input, mirroring the settings screen's field styling. */
function Field({ label, ...input }: { label: string } & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text variant="label" style={styles.fieldLabel}>
        {label}
      </Text>
      <TextInput style={styles.input} placeholderTextColor={colors.textFaint} {...input} />
    </View>
  );
}

interface TemplateEditorProps {
  onSave: () => void;
  saveLabel?: string;
}

/**
 * The shared template builder body: name/description, the list of added
 * exercises with their set & rest controls, and the add-exercise sheet.
 * Operates on the global draft store; both create and edit screens reuse it.
 */
export function TemplateEditor({ onSave, saveLabel = 'Save template' }: TemplateEditorProps) {
  const { name, description, workoutItems } = useTemplateStore((s) => s.draft);
  const setName = useTemplateStore((s) => s.setName);
  const setDescription = useTemplateStore((s) => s.setDescription);
  const [sheetOpen, setSheetOpen] = useState(false);

  const canSave = name.trim().length > 0 && workoutItems.length > 0;

  return (
    <>
      <Screen contentStyle={styles.scrollPad}>
        <Pad style={styles.body}>
          <View style={styles.fields}>
            <Field
              label="Template name"
              value={name}
              onChangeText={setName}
              placeholder="e.g. Push Day A"
              maxLength={60}
            />
            <Field
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="What is this session about?"
              multiline
              style={[styles.input, styles.multiline]}
              maxLength={160}
            />
          </View>

          <View>
            <SectionHead title={`Exercises${workoutItems.length ? ` (${workoutItems.length})` : ''}`} />
            {workoutItems.length === 0 ? (
              <Card tier="2" style={styles.emptyCard}>
                <EmptyState
                  icon={Dumbbell}
                  title="No exercises yet"
                  body="Add your first exercise to start building this template."
                />
              </Card>
            ) : (
              <View style={styles.list}>
                {workoutItems.map((item, index) => (
                  <ExerciseItemCard key={item.id} item={item} index={index} />
                ))}
              </View>
            )}
          </View>

          <Button
            variant="secondary"
            block
            onPress={() => setSheetOpen(true)}
            icon={<Plus size={18} strokeWidth={2.6} color={colors.text} />}
          >
            Add exercise
          </Button>
        </Pad>
      </Screen>

      <LinearGradient colors={['rgba(14,14,16,0)', colors.bg]} style={styles.footer}>
        <Button
          block
          size="lg"
          disabled={!canSave}
          onPress={onSave}
          icon={<Check size={18} strokeWidth={2.6} color={colors.white} />}
        >
          {saveLabel}
        </Button>
      </LinearGradient>

      <AddExerciseSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  scrollPad: { paddingBottom: 120 },
  body: { paddingTop: 8, gap: 24 },
  fields: { gap: 16 },
  field: { gap: 7 },
  fieldLabel: { marginBottom: 0 },
  input: {
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontSize: 15,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top', paddingTop: 12 },
  emptyCard: { padding: 0, overflow: 'hidden' },
  list: { gap: 12 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 32,
  },
});
