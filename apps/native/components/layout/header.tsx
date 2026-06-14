import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { Avatar, IconButton } from '@/components/ui';
import { Logo } from './logo';

/** Global app header: brand left, search + avatar right. */
export function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <Logo size={26} />
      <View style={styles.right}>
        <Avatar onPress={() => router.push('/profile')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.bg,
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
