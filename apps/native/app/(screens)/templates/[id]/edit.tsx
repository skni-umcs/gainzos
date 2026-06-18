import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/theme';
import { Pad, Text } from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import { TemplateEditor } from '@/components/features/templates/template-editor';
import { templateById, upsertTemplate } from '@/lib/mock';
import { useTemplateStore } from '@/lib/store/template';

export default function EditTemplateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const template = templateById(Number(id));
  const loadDraft = useTemplateStore((s) => s.loadDraft);

  // Seed the draft from the existing template before paint so the editor opens
  // pre-filled (no empty-fields flash during the push animation).
  useLayoutEffect(() => {
    if (!template) return;
    loadDraft({
      name: template.name,
      description: template.description,
      workoutItems: template.items,
    });
  }, [template, loadDraft]);

  if (!template) {
    return (
      <View style={styles.root}>
        <BackHeader title="Not found" />
        <Pad>
          <Text variant="body">This template no longer exists.</Text>
        </Pad>
      </View>
    );
  }

  const handleSave = () => {
    const { name, description, workoutItems } = useTemplateStore.getState().draft;
    upsertTemplate({ id: Number(id), name, description, items: workoutItems });
    router.back();
  };

  return (
    <View style={styles.root}>
      <BackHeader title="Edit template" />
      <TemplateEditor onSave={handleSave} saveLabel="Save changes" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
