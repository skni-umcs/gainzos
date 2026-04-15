import { StyleSheet, Text, View } from 'react-native';
import { ActivityCard } from '@/components/home/activity-card';
import { colors } from '@/theme/colors';

const recentActivities = [
	{
		id: 1,
		templateName: 'Push Day',
		dayLabel: 'Poniedziałek',
		timeLabel: '18:40',
		burnedCalories: 420,
	},
	{
		id: 2,
		templateName: 'Pull Day',
		dayLabel: 'Środa',
		timeLabel: '19:05',
		burnedCalories: 390,
	},
	{
		id: 3,
		templateName: 'Leg Day',
		dayLabel: 'Piątek',
		timeLabel: '17:30',
		burnedCalories: 510,
	},
];

export function RecentActivity() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Ostatnie treningi</Text>

			<View style={styles.list}>
				{recentActivities.map((activity) => (
					<ActivityCard
						key={activity.id}
						templateName={activity.templateName}
						dayLabel={activity.dayLabel}
						timeLabel={activity.timeLabel}
						burnedCalories={activity.burnedCalories}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
        paddingTop: 18,
		gap: 10,
	},
	title: {
		color: colors.text,
		fontSize: 17,
		fontWeight: '800',
	},
	list: {
		gap: 8,
	},
});
