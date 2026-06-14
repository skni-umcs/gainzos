import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Card, Text } from '@/components/ui';
import { WORKOUTS } from '@/lib/mock';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Local `YYYY-M-D` key — built the same way for cells and workouts so they match. */
function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Monday-first calendar cells for the given month; `null` pads the leading/trailing week. */
function buildMonthGrid(year: number, month: number) {
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/**
 * Month calendar highlighting the precise days the user trained.
 * The displayed month is anchored to the most recent workout so highlights are
 * always visible against mock data; swap `anchor` for `new Date()` once the API lands.
 */
export function WorkoutCalendar() {
  const { cells, label, count, workoutKeys, latestKey } = useMemo(() => {
    const dates = WORKOUTS.map((w) => new Date(w.createdAt)).sort((a, b) => b.getTime() - a.getTime());
    const anchor = dates[0] ?? new Date();
    const year = anchor.getFullYear();
    const month = anchor.getMonth();

    const inMonth = dates.filter((d) => d.getFullYear() === year && d.getMonth() === month);

    return {
      cells: buildMonthGrid(year, month),
      label: `${MONTHS[month]} ${year}`,
      count: inMonth.length,
      workoutKeys: new Set(dates.map(dayKey)),
      latestKey: dates[0] ? dayKey(dates[0]) : null,
    };
  }, []);

  return (
    <Card>
      <View style={styles.head}>
        <Text variant="label" style={styles.fieldLabel}>
          Workout calendar
        </Text>
        <Text variant="small" color={colors.text2} style={styles.month}>
          {label}
        </Text>
      </View>

      <View style={styles.weekdays}>
        {WEEKDAYS.map((d, i) => (
          <Text key={i} style={styles.weekday}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((date, i) => {
          if (!date) return <View key={i} style={styles.cell} />;
          const key = dayKey(date);
          const trained = workoutKeys.has(key);
          const isLatest = key === latestKey;

          return (
            <View key={i} style={styles.cell}>
              <View style={[styles.day, trained && styles.dayOn, isLatest && styles.dayLatest]}>
                <Text
                  variant="num"
                  size={13}
                  color={trained ? colors.onAccent : colors.textMut}
                  style={trained && styles.dayNumOn}
                >
                  {date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.foot}>
        <View style={styles.swatch} />
        <Text variant="small" color={colors.text2}>
          {count} {count === 1 ? 'session' : 'sessions'} this month
        </Text>
      </View>
    </Card>
  );
}

const CELL = 36;

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  fieldLabel: { marginBottom: 0 },
  month: { fontFamily: fontFamily.bodyBold },
  weekdays: { flexDirection: 'row', marginBottom: 6 },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.bodyBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.textFaint,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, height: CELL + 6, alignItems: 'center', justifyContent: 'center' },
  day: {
    width: CELL,
    height: CELL,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOn: { backgroundColor: colors.accent },
  dayLatest: { backgroundColor: colors.accentBr, borderWidth: 2, borderColor: colors.accentLine },
  dayNumOn: { fontFamily: fontFamily.bodyBold },
  foot: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  swatch: { width: 11, height: 11, borderRadius: radius.pill, backgroundColor: colors.accent },
});
