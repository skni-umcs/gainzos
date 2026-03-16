import { Tabs } from "expo-router";
import { ChartBar, Dock, Home, User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";


export default function TabLayout() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#22073d", "#12061f", colors.bgApp]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: styles.scene,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.tabIconActive,
          tabBarInactiveTintColor: colors.tabIconInactive,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="analytics/index"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, size }) => <ChartBar color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="templates/index"
          options={{
            title: "Templates",
            tabBarIcon: ({ color, size }) => <Dock color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="workout/index"
          options={{
            title: "Workout",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    backgroundColor: "transparent",
  },
  tabBar: {
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 1,
    borderColor: colors.tabBarBorder,
    elevation: 5,
  },
});