import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { Text } from './text';

interface ScreenTitleProps {
  title: string;
  /** Small tracked eyebrow shown above the title. */
  eyebrow?: string;
}

/** Page heading: optional eyebrow + large display title. */
export function ScreenTitle({ title, eyebrow }: ScreenTitleProps) {
  return (
    <View style={styles.container}>
      {eyebrow && <Text variant="eyebrow">{eyebrow}</Text>}
      <Text variant="display" size={34} color={colors.text}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 4, marginBottom: 16 },
});
