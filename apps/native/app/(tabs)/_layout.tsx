import { Tabs } from 'expo-router';
import { ChartBar, Dock, Home, User } from 'lucide-react-native';
import { StyleSheet, View, Platform } from 'react-native';
import { colors } from '@/theme/colors';
import { Header } from '@/components/layout/header';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: styles.scene,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textDisabled,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
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
          name="templates/index"
          options={{
            title: 'Templates',
            tabBarIcon: ({ color, size }) => <Dock color={color} size={size} />,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scene: { backgroundColor: 'transparent' },
  tabBar: {
    backgroundColor: colors.containerHigh,
    borderRadius: 22,
    marginBottom: Platform.OS === 'ios' ? 0 : 12,
    height: 60,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
});
