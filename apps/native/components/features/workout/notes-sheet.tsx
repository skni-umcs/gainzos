import { Modal, Pressable, View, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { IconButton, Text } from '@/components/ui';
import { useWorkoutStore } from '@/lib/store/workout';

interface NotesSheetProps {
  visible: boolean;
  onClose: () => void;
}

/** Slide-up editor for free-text session notes; saved live onto the session. */
export function NotesSheet({ visible, onClose }: NotesSheetProps) {
  const insets = useSafeAreaInsets();
  const notes = useWorkoutStore((s) => s.session?.notes ?? '');
  const setNotes = useWorkoutStore((s) => s.setNotes);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text variant="eyebrow">During this session</Text>
              <Text variant="h2" color={colors.text}>
                Notes
              </Text>
            </View>
            <IconButton size={36} onPress={onClose} style={styles.headerBtn}>
              <X size={19} strokeWidth={2.3} color={colors.text2} />
            </IconButton>
          </View>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            autoFocus
            placeholder="How did it feel? Form cues, PRs, things to change next time…"
            placeholderTextColor={colors.textFaint}
            style={styles.input}
            textAlignVertical="top"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.scrim },
  sheet: {
    backgroundColor: colors.surface1,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surface4,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  headerBtn: { backgroundColor: colors.surface3 },
  headerTitle: { flex: 1 },
  input: {
    minHeight: 160,
    backgroundColor: colors.surface3,
    borderRadius: radius.lg,
    padding: 16,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontSize: 16,
    lineHeight: 23,
  },
});
