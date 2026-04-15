import { Tabs } from 'expo-router';
import { ChartBar, Dock, Home, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { Header } from '@/components/layout/header';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: styles.scene,
          tabBarStyle: [
            styles.tabBar,
            { height: 60 + insets.bottom, paddingBottom: insets.bottom },
          ],
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
        }}
      >
        <Tabs.Screen
          name="analytics/index"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, size }) => <ChartBar color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="templates/index"
          options={{
            title: 'Templates',
            tabBarIcon: ({ color, size }) => <Dock color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="templates/creator/index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="workout/index"
          options={{
            title: 'Workout',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scene: { backgroundColor: 'transparent' },
  tabBar: {
    backgroundColor: colors.background,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
});
