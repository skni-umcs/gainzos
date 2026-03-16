import { Text } from 'react-native';

interface ScreenTitleProps {
  icon?: React.ReactNode;
  title: string;
}

export function ScreenTitle({ icon, title }: ScreenTitleProps) {
  return (
    <Text className="mb-4 mt-2 text-2xl font-bold text-text-primary">
      {icon && icon}
      {title}
    </Text>
  );
}
