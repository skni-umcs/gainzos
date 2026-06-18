import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import type { WorkoutTemplateDTO } from '@gainzos/types';
import { useWorkoutStore } from '@/lib/store/workout';

/**
 * Starts a live session from a template and opens the workout screen — but
 * never silently discards a session already in progress (which would defeat the
 * persisted-session recovery). If one is running it resumes the same template,
 * or asks before replacing a different one.
 */
export function useStartWorkout() {
  const router = useRouter();
  const startFromTemplate = useWorkoutStore((s) => s.startFromTemplate);

  return (template: WorkoutTemplateDTO) => {
    const active = useWorkoutStore.getState().session;
    const open = () => router.push('/workout');

    if (!active) {
      startFromTemplate(template);
      open();
      return;
    }

    // Same template already running — just resume it.
    if (active.templateId === template.id) {
      open();
      return;
    }

    Alert.alert('Workout in progress', `Discard your current workout and start “${template.name}”?`, [
      { text: 'Resume current', onPress: open },
      {
        text: 'Discard & start',
        style: 'destructive',
        onPress: () => {
          startFromTemplate(template);
          open();
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
}
