import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { Button, Chip, Pad, Screen, Text } from '@/components/ui';
import { TemplateCard } from '@/components/features/templates/template-card';
import { TEMPLATES } from '@/lib/mock';

export default function TemplatesScreen() {
  const router = useRouter();

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
          <Button
            size="md"
            onPress={() => router.push('/templates/add')}
            icon={<Plus size={18} strokeWidth={2.6} color={colors.white} />}
          >
            New
          </Button>
        </View>

        <View style={styles.list}>
          {TEMPLATES.map((template) => (
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
