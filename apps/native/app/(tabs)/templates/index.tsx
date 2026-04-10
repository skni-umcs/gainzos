import { ScrollView, StyleSheet } from 'react-native';
import { TemplateList } from '../../../components/templates/template-list';
import { ScreenTitle } from '@/components/ui/screen-title';

export default function TemplatesScreen() {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.container}>
      <ScreenTitle title="Profile treningowe" description="BIBLIOTEKA TRENINGÓW" />
      <TemplateList />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});