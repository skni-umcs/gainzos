import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Img, Pad, Screen, SectionHead, Text } from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import { EXERCISE_TYPES, EXERCISE_TYPE_COUNT } from '@/lib/mock';

export default function LibraryScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <BackHeader />
      <Screen>
        <Pad>
          <Text variant="eyebrow">Explore</Text>
          <Text variant="display" size={34} color={colors.text} style={styles.title}>
            Exercise library
          </Text>

          <View style={styles.searchWrap}>
            <Search size={19} strokeWidth={2.1} color={colors.textMut} style={styles.searchIcon} />
            <TextInput
              placeholder="Search exercises…"
              placeholderTextColor={colors.textFaint}
              style={styles.search}
            />
          </View>

          <SectionHead title="Categories" />
          <View style={styles.grid}>
            {EXERCISE_TYPES.map((type) => (
              <Pressable key={type.id} style={styles.cell} onPress={() => router.push(`/library/${type.id}`)}>
                <Img media={type.media} radius={radius.lg} scrim scrimStrength={0.9} style={styles.fill}>
                  <View style={styles.cellLabel}>
                    <Text variant="display" size={22} color={colors.white}>
                      {type.name}
                    </Text>
                    <Text style={styles.count}>{EXERCISE_TYPE_COUNT[type.id]} exercises</Text>
                  </View>
                </Img>
              </Pressable>
            ))}
          </View>
        </Pad>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  title: { marginBottom: 16 },
  searchWrap: { justifyContent: 'center', marginBottom: 22 },
  searchIcon: { position: 'absolute', left: 14, zIndex: 1 },
  search: {
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingLeft: 42,
    paddingRight: 15,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontSize: 15,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cell: { width: '48%', aspectRatio: 1 / 0.92 },
  fill: { flex: 1 },
  cellLabel: { position: 'absolute', left: 14, bottom: 12, right: 12 },
  count: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 11.5,
    letterSpacing: 0.5,
    color: 'rgba(255,255,255,0.72)',
  },
});
