import { Tabs, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ChartColumnBig, Home, Layers, User } from 'lucide-react-native';
import { colors } from '@/theme';
import { Header } from '@/components/layout/header';
import { TabBar } from '@/components/layout/tab-bar';

export default function TabLayout() {
  // Profile opens on its own full-bleed cover, so it skips the global header.
  const showHeader = usePathname() !== '/profile';

  return (
    <View style={styles.container}>
      {showHeader && <Header />}
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: styles.scene,
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
          name="templates/index"
          options={{
            title: 'Plans',
            tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="analytics/index"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, size }) => <ChartColumnBig color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scene: { backgroundColor: colors.bg },
});
