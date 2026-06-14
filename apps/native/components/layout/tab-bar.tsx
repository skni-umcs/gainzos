import type { ComponentProps } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from '@/components/ui';

/** Props expo-router passes to a custom `tabBar`, derived from the Tabs component. */
type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/** Custom bottom tab bar: blurred surface, accent pill behind the active icon. */
export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView intensity={28} tint="dark" style={[styles.bar, { paddingBottom: insets.bottom + 6 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const color = focused ? colors.accentBr : colors.textMut;
        const label = options.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {options.tabBarIcon?.({ focused, color, size: 21 })}
            </View>
            <Text style={[styles.label, { color }]}>{label}</Text>
          </Pressable>
        );
      })}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: 'rgba(20,20,23,0.86)',
  },
  item: { flex: 1, alignItems: 'center', gap: 4 },
  iconWrap: {
    width: 46,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: colors.accentSoft },
  label: { fontFamily: fontFamily.bodyBold, fontSize: 10.5, letterSpacing: 0.2 },
});
