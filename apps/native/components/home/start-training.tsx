import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button';
import { colors } from '@/theme/colors';

export function StartTrainingButton() {
  return (
    <View style={styles.container}>
      <Button 
      onPress={() => console.log("DZIALA PRZYCISK")}
      gradient={[colors.primary, colors.primaryDim, colors.tertiary]}>
        Rozpocznij trening
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
});
