import { StatCard } from './stat-card';
import { View } from 'react-native';
import { Flame, Trophy } from 'lucide-react-native';

export function StatsList() {
    const STATS = [
  {
    Icon: Flame,
    value: '120',
    label: 'Kcal spalone',
    accent: '#ff6b35',
    bg: ['#ff6b35', '#ff3d71'] as [string, string],
    topBar: ['#ff6b35', '#ff3d71'] as [string, string],
  },
  {
    Icon: Trophy,
    value: '12',
    label: 'Treningi łącznie',
    accent: '#10b981',
    bg: ['#10b981', '#059669'] as [string, string],
    topBar: ['#10b981', '#059669'] as [string, string],
  },
];

  return (
    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
      {STATS.map((stat, i) => (
        <StatCard
          key={i}
          Icon={stat.Icon}
          value={stat.value}
          label={stat.label}
          accent={stat.accent}
          bg={stat.bg}
          topBar={stat.topBar}
        />
      ))}
    </View>
  );
}
