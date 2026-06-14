import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Target, Settings } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { Avatar, Badge, IconButton, Img, Text } from '@/components/ui';
import { USER, METRICS, GOAL_LABEL } from '@/lib/mock';

/** Profile header — cover image, settings entry, avatar and identity row. */
export function Cover() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View>
      <Img radius={0} style={{ height: 120 + insets.top }}>
        <IconButton
          size={36}
          onPress={() => router.push('/(screens)/settings')}
          style={[styles.settings, { top: insets.top + 14 }]}
        >
          <Settings size={19} strokeWidth={2} color={colors.text} />
        </IconButton>
      </Img>
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
  );
}

const styles = StyleSheet.create({
  settings: { position: 'absolute', right: 16, backgroundColor: 'rgba(20,20,23,0.4)' },
  identity: { paddingHorizontal: spacing.xl, marginTop: -42 },
  avatar: { borderWidth: 4, borderColor: colors.bg, borderRadius: 46 },
  identityRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 },
  identityText: { flex: 1 },
  email: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
});
