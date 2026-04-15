import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { TemplateList } from '../../../components/templates/template-list';
import { ScreenTitle } from '@/components/ui/screen-title';

export default function TemplatesScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ScreenTitle title="Profile treningowe" description="BIBLIOTEKA TRENINGÓW" />
        <TemplateList onAddTemplate={() => router.push('/(tabs)/templates/creator')} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});