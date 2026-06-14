import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import { BackHeader } from '@/components/layout/back-header';
import { TemplateEditor } from '@/components/features/templates/template-editor';
import { upsertTemplate } from '@/lib/mock';
import { useTemplateStore } from '@/lib/store/template';

export default function AddTemplateScreen() {
  const router = useRouter();
  const clearDraft = useTemplateStore((s) => s.clearDraft);

  // A fresh "New template" always starts from a blank draft.
  useEffect(() => {
    clearDraft();
  }, [clearDraft]);

  const handleSave = () => {
    const { name, description, workoutItems } = useTemplateStore.getState().draft;
    upsertTemplate({ name, description, items: workoutItems });
    clearDraft();
    router.back();
  };

  return (
    <View style={styles.root}>
      <BackHeader title="New template" />
      <TemplateEditor onSave={handleSave} saveLabel="Create template" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
