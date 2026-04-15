import '@/global.css';
import '@/i18n';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, asyncStoragePersister } from '@/lib/react-query/query-client';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
      }}
    >
      <SafeAreaProvider>
        <PortalProvider>
          <RootLayoutNav />
        </PortalProvider>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <LinearGradient
      colors={[colors.gradient.start, colors.gradient.mid, colors.gradient.end]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </LinearGradient>
  );
}
