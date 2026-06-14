import { useState, type ComponentProps } from 'react';
import { View, StyleSheet, TextInput, Switch, Alert, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Trash2, LogOut } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Button, Card, Pad, Screen, Text } from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import { USER, METRICS } from '@/lib/mock';

function ageOf(birth: Date): number {
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Labelled text input styled on the surface-3 fill (no borders). */
function Field({ label, ...input }: { label: string } & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text variant="label" style={styles.fieldLabel}>
        {label}
      </Text>
      <TextInput style={styles.input} placeholderTextColor={colors.textFaint} {...input} />
    </View>
  );
}

function Toggle({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <Text variant="small" color={colors.text} style={styles.toggleLabel}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surface4, true: colors.accent }}
        thumbColor={colors.white}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();

  const [username, setUsername] = useState(USER.username);
  const [email, setEmail] = useState(USER.email);
  const [birthDate, setBirthDate] = useState(new Date(METRICS.birthDate));
  const [showPicker, setShowPicker] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [metricUnits, setMetricUnits] = useState(true);

  const onChangeBirth = (_event: DateTimePickerEvent, selected?: Date) => {
    // Android closes its dialog on selection; iOS keeps the inline spinner open.
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (selected) setBirthDate(selected);
  };

  // Mock — persistence arrives once auth + the API are wired.
  const onSave = () => Alert.alert('Saved', 'Your settings have been updated.');

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      'This permanently deletes your account and all of your data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.replace('/(tabs)') },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <BackHeader title="Settings" />

      <Screen contentStyle={styles.scrollPad}>
        <Pad style={styles.body}>
          <Card style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>
              Account
            </Text>
            <Field label="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.field}>
              <Text variant="label" style={styles.fieldLabel}>
                Date of birth
              </Text>
              <Pressable style={styles.dateField} onPress={() => setShowPicker(true)}>
                <Text variant="body" color={colors.text} style={styles.dateValue}>
                  {formatDate(birthDate)}
                </Text>
                <Text variant="small" color={colors.textMut}>
                  {ageOf(birthDate)} yrs
                </Text>
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  maximumDate={new Date()}
                  onChange={onChangeBirth}
                />
              )}
              {Platform.OS === 'ios' && showPicker && (
                <Button variant="secondary" block onPress={() => setShowPicker(false)}>
                  Done
                </Button>
              )}
            </View>
          </Card>

          <Card style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>
              Change password
            </Text>
            <Field
              label="Current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="••••••••"
            />
            <Field
              label="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="••••••••"
            />
            <Field
              label="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="••••••••"
            />
          </Card>

          <Card style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>
              Preferences
            </Text>
            <Toggle label="Push notifications" value={notifications} onValueChange={setNotifications} />
            <Toggle label="Metric units (kg, cm)" value={metricUnits} onValueChange={setMetricUnits} />
          </Card>

          <Button block onPress={onSave}>
            Save changes
          </Button>

          <Card style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>
              Danger zone
            </Text>
            <Button
              variant="ghost"
              block
              onPress={onDeleteAccount}
              icon={<Trash2 size={17} strokeWidth={2.2} color={colors.error} />}
              textStyle={styles.dangerText}
            >
              Delete account
            </Button>
          </Card>

          <Button
            variant="ghost"
            block
            onPress={() => router.replace('/(tabs)')}
            icon={<LogOut size={17} strokeWidth={2.2} color={colors.text2} />}
          >
            Log out
          </Button>
        </Pad>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scrollPad: { paddingBottom: 32 },
  body: { gap: 16 },
  section: { gap: 14 },
  sectionLabel: { marginBottom: 0 },
  field: { gap: 7 },
  fieldLabel: { marginBottom: 0 },
  input: {
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontSize: 15,
  },
  dateField: {
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateValue: { fontFamily: fontFamily.bodySemiBold },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleLabel: { fontFamily: fontFamily.bodySemiBold },
  dangerText: { color: colors.error },
});
