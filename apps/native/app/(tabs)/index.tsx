import { View } from 'react-native';
import { QuoteCard } from '@/components/feats/home/quote-card';
import { ScreenTitle } from '@/components/ui/screen-title';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1  px-6 ">
        <ScreenTitle title={t('welcomeBack')} />
        <QuoteCard quote={t('quote')} />
      </View>
    </SafeAreaView>
  );
}
