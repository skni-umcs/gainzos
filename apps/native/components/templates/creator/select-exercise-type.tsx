import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ExerciseType } from '@/lib/types/exercise-type';
import { colors } from '@/theme/colors';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/react-query/api';

interface SelectExerciseTypeProps {
  onSelect: (exerciseType: ExerciseType) => void;
  selected?: ExerciseType | null;
}

export function SelectExerciseType({ onSelect, selected }: SelectExerciseTypeProps) {
  const placeholderImage = require('../../../assets/placeholder.png');

  const { data: exerciseTypes = [] } = useQuery({
    queryKey: ['exerciseTypes'],
    queryFn: () => api.exerciseTypes.getAll() as Promise<ExerciseType[]>,
  });

  return (
    <View>
      <View style={styles.gridContainer}>
        {exerciseTypes.map((exerciseType) => {
          const isSelected = selected?.id === exerciseType.id;
          return (
            <View key={exerciseType.id} style={styles.itemWrapper}>
              <Pressable
                onPress={() => onSelect(exerciseType)}
                style={({ pressed }) => [
                  styles.button,
                  isSelected && styles.buttonSelected,
                  pressed && styles.buttonPressed,
                ]}
              >
                <ImageBackground
                  source={placeholderImage}
                  style={styles.imageBackground}
                  imageStyle={styles.imageBackgroundInner}
                  resizeMode="cover"
                >
                  <View style={[styles.scrim, isSelected && styles.scrimSelected]} />
                  {isSelected && <View style={styles.selectedDot} />}
                  <Text style={styles.label} numberOfLines={2}>
                    {exerciseType.name}
                  </Text>
                </ImageBackground>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: 'DMmono',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    rowGap: 10,
  },
  itemWrapper: {
    width: '33.3333%',
    paddingHorizontal: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}70`,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.containerHighest,
  },
  buttonSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  imageBackground: {
    width: '100%',
    height: 90,
    justifyContent: 'flex-end',
  },
  imageBackgroundInner: {
    borderRadius: 13,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.base}88`,
  },
  scrimSelected: {
    backgroundColor: `${colors.primaryContainer}99`,
  },
  selectedDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontFamily: 'Syne_600SemiBold',
    lineHeight: 15,
    letterSpacing: 0.2,
    paddingHorizontal: 8,
    paddingBottom: 9,
    zIndex: 1,
  },
});