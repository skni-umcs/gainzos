import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Mail,
  Target,
  Settings,
  Ruler,
  ArrowUp,
  User as UserIcon,
  Calendar,
  Zap,
  Pencil,
  ChevronRight,
} from 'lucide-react-native';
import { colors, fontFamily, gradients, radius, spacing } from '@/theme';
import { Avatar, Badge, Button, Card, IconButton, LineChart, Pad, Screen, Text } from '@/components/ui';
import { USER, METRICS, WEIGHT_TREND, ACTIVITY_LABEL, GOAL_LABEL, GENDER_LABEL } from '@/lib/mock';

function ageFrom(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const wNow = WEIGHT_TREND[WEIGHT_TREND.length - 1];
  const wDelta = (wNow - WEIGHT_TREND[0]).toFixed(1);
  const birthLabel = new Date(METRICS.birthDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const quickMetrics = [
    { value: METRICS.weight, unit: 'kg', label: 'Weight' },
    { value: METRICS.height, unit: 'cm', label: 'Height' },
    { value: ageFrom(METRICS.birthDate), unit: 'yr', label: 'Age' },
    { value: METRICS.bodyFatPercentage, unit: '%', label: 'Body fat' },
  ];

  const measurements = [
    { label: 'Biceps', value: METRICS.bicepsCircumference, unit: 'cm' },
    { label: 'Chest', value: METRICS.chestCircumference, unit: 'cm' },
    { label: 'Waist', value: METRICS.waistCircumference, unit: 'cm' },
    { label: 'Body fat', value: METRICS.bodyFatPercentage, unit: '%' },
  ];

  const attributes = [
    { label: 'Gender', value: GENDER_LABEL[METRICS.gender], Icon: UserIcon },
    { label: 'Birth date', value: birthLabel, Icon: Calendar },
    { label: 'Activity level', value: ACTIVITY_LABEL[METRICS.activityLevel], Icon: Zap },
    { label: 'Goal', value: GOAL_LABEL[METRICS.goal], Icon: Target },
  ];

  return (
    <Screen>
      {/* Cover + avatar */}
      <View>
        <LinearGradient
          colors={gradients.accent}
          start={{ x: 0.8, y: 0 }}
          end={{ x: 0.2, y: 1 }}
          style={[styles.cover, { height: 120 + insets.top, paddingTop: insets.top }]}
        >
          <IconButton size={36} style={[styles.settings, { top: insets.top + 14 }]}>
            <Settings size={19} strokeWidth={2} color={colors.text} />
          </IconButton>
        </LinearGradient>
        <View style={styles.identity}>
          <Avatar size={84} style={styles.avatar} />
          <View style={styles.identityRow}>
            <View style={styles.identityText}>
              <Text variant="display" size={30} color={colors.text}>
                {USER.username}
              </Text>
              <View style={styles.email}>
                <Mail size={13} strokeWidth={2} color={colors.textMut} />
                <Text variant="small">{USER.email}</Text>
              </View>
            </View>
            <Badge
              label={GOAL_LABEL[METRICS.goal]}
              tone="accent"
              uppercase={false}
              icon={<Target size={13} strokeWidth={2.2} color={colors.accentBr} />}
            />
          </View>
        </View>
      </View>

      <Pad style={styles.body}>
        {/* Quick metrics */}
        <View style={styles.quickGrid}>
          {quickMetrics.map((m) => (
            <Card key={m.label} style={styles.quickCard}>
              <View style={styles.quickValue}>
                <Text variant="num" size={21} color={colors.text}>
                  {m.value}
                </Text>
                <Text style={styles.quickUnit}>{m.unit}</Text>
              </View>
              <Text style={styles.quickLabel}>{m.label}</Text>
            </Card>
          ))}
        </View>

        {/* Weight progress */}
        <Card style={styles.section}>
          <Text variant="label" style={styles.fieldLabel}>
            Weight progress · 12 wk
          </Text>
          <View style={styles.weightRow}>
            <Text variant="num" size={32} color={colors.text}>
              {wNow}
            </Text>
            <Text style={styles.weightUnit}>kg</Text>
            <View style={styles.weightDelta}>
              <ArrowUp size={14} strokeWidth={2.6} color={colors.success} />
              <Text style={styles.weightDeltaText}>+{wDelta} kg</Text>
            </View>
          </View>
          <View style={styles.chart}>
            <LineChart data={WEIGHT_TREND} height={96} />
          </View>
        </Card>

        {/* Body measurements */}
        <Card style={styles.section}>
          <View style={styles.measureHead}>
            <Text variant="label" style={styles.fieldLabel}>
              Body measurements
            </Text>
            <Ruler size={16} strokeWidth={2} color={colors.textMut} />
          </View>
          {measurements.map((m, i) => (
            <View key={m.label} style={[styles.measureRow, i > 0 && styles.rowDivider]}>
              <Text variant="small" color={colors.text2} style={styles.rowLabel}>
                {m.label}
              </Text>
              <View style={styles.measureValue}>
                <Text variant="num" size={18} color={colors.text}>
                  {m.value}
                </Text>
                <Text style={styles.measureUnit}>{m.unit}</Text>
                <Pencil size={15} strokeWidth={2} color={colors.textMut} />
              </View>
            </View>
          ))}
        </Card>

        {/* Profile attributes */}
        <Card style={styles.section}>
          <Text variant="label" style={styles.fieldLabel}>
            Profile
          </Text>
          {attributes.map(({ label, value, Icon }, i) => (
            <View key={label} style={[styles.attrRow, i > 0 && styles.rowDivider]}>
              <View style={styles.attrIcon}>
                <Icon size={16} strokeWidth={2} color={colors.text2} />
              </View>
              <Text variant="small" color={colors.text2} style={styles.rowLabel}>
                {label}
              </Text>
              <Text variant="small" color={colors.text} style={styles.attrValue}>
                {value}
              </Text>
              <ChevronRight size={16} strokeWidth={2} color={colors.textFaint} />
            </View>
          ))}
        </Card>

        {/* Logout is a no-op until auth is wired. */}
        <Button variant="ghost" block style={styles.logout} textStyle={styles.logoutText}>
          Log out
        </Button>
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: {},
  settings: { position: 'absolute', right: 16, backgroundColor: 'rgba(20,20,23,0.4)' },
  identity: { paddingHorizontal: spacing.xl, marginTop: -42 },
  avatar: { borderWidth: 4, borderColor: colors.bg, borderRadius: 46 },
  identityRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 },
  identityText: { flex: 1 },
  email: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  body: { marginTop: 20, gap: 16 },
  quickGrid: { flexDirection: 'row', gap: 10 },
  quickCard: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' },
  quickValue: { flexDirection: 'row', alignItems: 'flex-end', gap: 1 },
  quickUnit: { fontFamily: fontFamily.bodySemiBold, fontSize: 10, color: colors.textMut, marginBottom: 2 },
  quickLabel: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textMut,
    marginTop: 3,
  },
  section: {},
  fieldLabel: { marginBottom: 6 },
  weightRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  weightUnit: { fontFamily: fontFamily.bodyBold, fontSize: 14, color: colors.textMut, marginBottom: 3 },
  weightDelta: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  weightDeltaText: { fontFamily: fontFamily.bodyBold, fontSize: 13, color: colors.success },
  chart: { marginTop: 10 },
  measureHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  measureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13 },
  measureValue: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  measureUnit: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.line },
  rowLabel: { flex: 1, fontFamily: fontFamily.bodyBold },
  attrRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  attrIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.xs,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attrValue: { fontFamily: fontFamily.bodyBold },
  logout: { marginTop: 0 },
  logoutText: { color: colors.error },
});
