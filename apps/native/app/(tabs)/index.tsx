import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';


export default function Index() {
  const { t } = useTranslation('translations', { keyPrefix: 'screens.home' });

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right', 'top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >


      </ScrollView>
    </SafeAreaView>
  );
}
