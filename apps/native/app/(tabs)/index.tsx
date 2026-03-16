import { View } from 'react-native';
import { QuoteCard } from '@/components/feats/home/quote-card';
import { ScreenTitle } from '@/components/ui/screen-title';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react-native';

export default function Index() {
  const { t } = useTranslation('translations', { keyPrefix: 'screens.home' });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6 py-6 ">
        <ScreenTitle icon={<Home size={24} color="white" />} title={t('welcomeBack')} />
        <QuoteCard quote={t('quote')} />
      </View>
    </SafeAreaView>
  );
}
