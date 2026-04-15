import { StyleSheet, Text, View } from 'react-native';
import { Dumbbell } from 'lucide-react-native';
import { colors } from '@/theme/colors';

interface ActivityCardProps {
	templateName: string;
	dayLabel: string;
	timeLabel: string;
	burnedCalories: number;
}

export function ActivityCard({
	templateName,
	dayLabel,
	timeLabel,
	burnedCalories,
}: ActivityCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.leftIconWrap}>
				<Dumbbell size={18} color={colors.primary} strokeWidth={2.2} />
			</View>

			<View style={styles.content}>
				<Text style={styles.templateName} numberOfLines={1}>
					{templateName}
				</Text>
				<Text style={styles.metaText}>
					{dayLabel} • {timeLabel}
				</Text>
			</View>

			<View style={styles.caloriesWrap}>
				<Text style={styles.caloriesValue}>{burnedCalories}</Text>
				<Text style={styles.caloriesLabel}>kcal</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surface,
		paddingHorizontal: 12,
		paddingVertical: 11,
		gap: 10,
	},
	leftIconWrap: {
		width: 36,
		height: 36,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: `${colors.primary}55`,
		backgroundColor: `${colors.primary}14`,
	},
	content: {
		flex: 1,
		gap: 2,
	},
	templateName: {
		color: colors.text,
		fontSize: 15,
		fontWeight: '700',
	},
	metaText: {
		color: colors.textSecondary,
		fontSize: 12,
		fontWeight: '500',
	},
	caloriesWrap: {
		alignItems: 'flex-end',
		minWidth: 56,
	},
	caloriesValue: {
		color: colors.warning,
		fontSize: 16,
		fontWeight: '800',
		lineHeight: 18,
	},
	caloriesLabel: {
		color: colors.textSecondary,
		fontSize: 11,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
});
