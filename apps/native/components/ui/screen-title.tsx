import { Text, View } from 'react-native';

interface ScreenTitleProps {
  icon?: React.ReactNode;
  title: string;
}

export function ScreenTitle({ icon, title }: ScreenTitleProps) {
  return (
    <View className="flex flex-row gap-4 justify-start items-center mb-4">
      {icon}
      <Text className="text-3xl font-bold text-text-primary">{title}</Text>
    </View>
  );
}
