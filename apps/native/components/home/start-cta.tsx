import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell, Play, List, Clock } from 'lucide-react-native';
import { colors, fontFamily, gradients, radius, shadows } from '@/theme';
import { Text } from '@/components/ui';
import { templateById, templateEstMinutes } from '@/lib/mock';

/** Hero CTA for today's planned session. Opens the template detail (workout flow is deferred). */
export function StartCta() {
  const router = useRouter();
  const template = templateById(1);
  if (!template) return null;

  return (
    <Pressable onPress={() => router.push(`/templates/${template.id}`)}>
      <LinearGradient
        colors={gradients.accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, shadows.accentGlow]}
      >
        <View style={styles.watermark}>
          <Dumbbell size={150} strokeWidth={1.4} color={colors.white} />
        </View>

        <Text style={styles.kicker}>Today’s session</Text>
        <Text variant="display" size={30} color={colors.white} style={styles.title}>
          {template.name}
        </Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <List size={15} strokeWidth={2.2} color="rgba(255,255,255,0.9)" />
            <Text style={styles.metaText}>{template.items.length} exercises</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={15} strokeWidth={2.2} color="rgba(255,255,255,0.9)" />
            <Text style={styles.metaText}>~{templateEstMinutes(template)} min</Text>
          </View>
        </View>

        <View style={styles.pill}>
          <Play size={17} color={colors.accentDeep} fill={colors.accentDeep} />
          <Text style={styles.pillText}>Start training</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.xl, padding: 22, overflow: 'hidden' },
  watermark: { position: 'absolute', right: -28, top: -28, opacity: 0.18, transform: [{ rotate: '-12deg' }] },
  kicker: {
    fontFamily: fontFamily.bodyExtraBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.8)',
  },
  title: { marginTop: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: radius.pill,
    marginTop: 16,
  },
  pillText: { fontFamily: fontFamily.bodyExtraBold, fontSize: 15, color: colors.accentDeep },
});
