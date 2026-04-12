import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface ScreenTitleProps {
  title: string;
  description?: string;
}

export function ScreenTitle({ title, description }: ScreenTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {title}
      </Text>
      {description && (
        <Text style={styles.label}>
          {description}
        </Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 28,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.5,
  },
  heading: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  name: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: '800',
  },
});