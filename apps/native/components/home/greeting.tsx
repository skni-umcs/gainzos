import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export function Greeting() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Cześć,{' '}
        <Text style={styles.name}>Damian</Text>
        <Text style={styles.heading}>!</Text>
      </Text>
      <Text style={styles.label}>GOTOWY NA TRENING?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 12,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.5,
  },
  heading: {
    color: colors.text,
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