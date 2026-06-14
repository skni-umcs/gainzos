import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fontFamily } from '@/theme';
import { Card, Img, SectionHead, Text } from '@/components/ui';
import { WORKOUTS, templateById } from '@/lib/mock';
import { relDate, toMinutes } from '@/lib/utils/format';

export function RecentActivity() {
  const router = useRouter();

  return (
    <View>
      <SectionHead title="Recent activity" action="History" onAction={() => router.push("/(tabs)/stats")} />
      <View style={styles.list}>
        {WORKOUTS.slice(0, 3).map((workout) => {
          const template = templateById(workout.workoutTemplateId);
          if (!template) return null;
          const tonnes = (Number(workout.volume) / 1000).toFixed(1);
          return (
            <Card key={workout.id} onPress={() => router.push(`/templates/${template.id}`)} style={styles.row}>
              <View style={styles.info}>
                <Text variant="h3" color={colors.text} numberOfLines={1}>
                  {template.name}
                </Text>
                <Text variant="small" style={styles.sub}>
                  {relDate(workout.createdAt)} · {toMinutes(workout.duration)} min
                </Text>
              </View>
              <View style={styles.right}>
                <Text variant="num" size={18} color={colors.text}>
                  {tonnes}t
                </Text>
                <Text style={styles.volumeLabel}>volume</Text>
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12 },
  info: { flex: 1 },
  sub: { marginTop: 2 },
  right: { alignItems: 'flex-end' },
  volumeLabel: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMut,
  },
});
