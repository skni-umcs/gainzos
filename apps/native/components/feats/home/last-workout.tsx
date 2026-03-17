import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Clock, ChevronRight, Dumbbell } from 'lucide-react-native';

export function LastWorkout() {
  const LAST_WORKOUT = {
    name: 'Push Day A',
    date: 'Wczoraj, 18:30',
    duration: '52 min',
    muscleGroups: ['Klatka', 'Barki', 'Triceps'],
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 22 }}>
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderWidth: 1,
          borderColor: 'rgba(180,111,255,0.15)',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={['#9b30ff', '#6600cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 2 }}
        />
        <View style={{ padding: 16 }}>
          {/* Row: title + chevron */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  backgroundColor: 'rgba(155,48,255,0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Dumbbell size={16} color="#9b30ff" />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'DMmono',
                    fontSize: 10,
                    color: 'rgba(180,111,255,0.6)',
                    letterSpacing: 1.2,
                  }}
                >
                  OSTATNI TRENING
                </Text>
                <Text
                  style={{ fontFamily: 'Syne-Bold', fontSize: 16, color: '#fff', marginTop: 1 }}
                >
                  {LAST_WORKOUT.name}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="rgba(180,111,255,0.5)" />
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: 'rgba(180,111,255,0.1)', marginBottom: 12 }} />

          {/* Meta row: date + duration */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Clock size={12} color="rgba(180,111,255,0.55)" />
              <Text style={{ fontFamily: 'DMmono', fontSize: 11, color: 'rgba(180,111,255,0.55)' }}>
                {LAST_WORKOUT.date}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Flame size={12} color="rgba(255,107,53,0.7)" />
              <Text style={{ fontFamily: 'DMmono', fontSize: 11, color: 'rgba(255,107,53,0.7)' }}>
                {LAST_WORKOUT.duration}
              </Text>
            </View>
          </View>

          {/* Muscle group pills */}
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {LAST_WORKOUT.muscleGroups.map((group, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: 'rgba(155,48,255,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(155,48,255,0.25)',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{ fontFamily: 'DMmono', fontSize: 11, color: 'rgba(200,160,255,0.9)' }}
                >
                  {group}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
