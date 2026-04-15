import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/avatar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.leftGroup}>
          <View
            style={[
              styles.logoContainer,
              {
                borderColor: `${colors.success}33`,
                backgroundColor: `${colors.success}12`,
              },
            ]}
          >
            <Image source={require('@/assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.brandRow}>
            <Text style={[styles.brandMain, { color: colors.text }]}>GAINZ</Text>
            <Text style={[styles.brandSub, { color: colors.textSecondary }]}>OS</Text>
          </View>
        </View>

        {/* Right: avatar */}
        <View style={styles.rightGroup}>
          <Avatar />
        </View>
      </View>

      {/* Bottom accent line */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', `${colors.success}59`, 'rgba(0,0,0,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.borderLine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 8,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  logo: {
    width: 22,
    height: 22,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  brandMain: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2.5,
  },
  brandSub: {
    fontSize: 17,
    fontWeight: '300',
    letterSpacing: 2.5,
    opacity: 0.9,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  borderLine: {
    height: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
