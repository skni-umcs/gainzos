import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WEEK_DATA = [
  { day: 'Pon', minutes: 35 },
  { day: 'Wt', minutes: 50 },
  { day: 'Śr', minutes: 0 },
  { day: 'Czw', minutes: 20 },
  { day: 'Pt', minutes: 45 },
  { day: 'Sob', minutes: 60 },
  { day: 'Nd', minutes: 15 },
];

const TODAY_INDEX = WEEK_DATA.length - 1;
const BAR_MAX_VALUE = Math.max(...WEEK_DATA.map(d => d.minutes), 60);
const BAR_MAX_HEIGHT = 80;

export function WeeklyActivityChart() {
    return (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderWidth: 1,
            borderColor: 'rgba(180,111,255,0.12)',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 22,
          }}
        >
          <LinearGradient
            colors={['#7c22d4', '#9b30ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 2 }}
          />
          <View style={{ padding: 16 }}>
            <Text
              style={{
                fontFamily: 'DMmono',
                fontSize: 10,
                color: 'rgba(180,111,255,0.6)',
                letterSpacing: 1.2,
                marginBottom: 16,
              }}
            >
              AKTYWNOŚĆ · OSTATNIE 7 DNI
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: BAR_MAX_HEIGHT + 28,
              }}
            >
              {WEEK_DATA.map((d, i) => {
                const isToday = i === TODAY_INDEX;
                const hasData = d.minutes > 0;
                const barHeight = hasData
                  ? Math.max((d.minutes / (BAR_MAX_VALUE * 1.9)) * BAR_MAX_HEIGHT, 6)
                  : 4;

                return (
                  <View key={i} style={{ alignItems: 'center', gap: 6, flex: 1 }}>
                    {/* minute label above bar */}
                    {hasData && (
                      <Text
                        style={{
                          fontFamily: 'DMmono',
                          fontSize: 9,
                          color: isToday ? '#c084fc' : 'rgba(180,111,255,0.45)',
                        }}
                      >
                        {d.minutes}
                      </Text>
                    )}

                    {/* bar */}
                    <View style={{ flex: 1, justifyContent: 'flex-end', width: '70%' }}>
                      {hasData ? (
                        <LinearGradient
                          colors={
                            isToday
                              ? ['#c084fc', '#7c22d4']
                              : ['rgba(155,48,255,0.7)', 'rgba(100,20,180,0.4)']
                          }
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={{ height: barHeight, borderRadius: 5 }}
                        />
                      ) : (
                        <View
                          style={{
                            height: barHeight,
                            borderRadius: 5,
                            backgroundColor: 'rgba(180,111,255,0.08)',
                            borderWidth: 1,
                            borderColor: 'rgba(180,111,255,0.1)',
                          }}
                        />
                      )}
                    </View>

                    {/* day label */}
                    <Text
                      style={{
                        fontFamily: 'DMmono',
                        fontSize: 10,
                        color: isToday ? '#c084fc' : 'rgba(180,111,255,0.45)',
                        fontWeight: isToday ? '600' : '400',
                      }}
                    >
                      {d.day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
    )
}