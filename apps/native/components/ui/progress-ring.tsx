import { useEffect, useRef, ReactNode } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/theme/colors';

interface ProgressRingStyles {
  wrapper?: ViewStyle;
  centerContent?: ViewStyle;
}

export interface InnerRingConfig {
  value: number;
  max: number;
  strokeWidth?: number;
  gap?: number;
  gradientColors?: [string, string];
  trackColor?: string;
}

interface ProgressRingProps {
  value: number;
  max: number;

  size?: number;
  strokeWidth?: number;

  styles?: ProgressRingStyles;

  trackColor?: string;
  gradientColors?: [string, string];

  innerRing?: InnerRingConfig;

  children?: ReactNode; // 🔥 najważniejsze
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function RingArc({
  cx,
  cy,
  radius,
  strokeWidth,
  circumference,
  progress,
  gradientId,
  trackColor = 'rgba(255,255,255,0.07)',
  animDuration = 1200,
}: any) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: animDuration,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        rotation="-90"
        origin={`${cx}, ${cy}`}
      />
    </>
  );
}

export function ProgressRing({
  value,
  max,
  size = 160,
  strokeWidth = 12,
  styles: styleOverrides,
  trackColor = 'rgba(255,255,255,0.07)',
  gradientColors,
  innerRing,
  children,
}: ProgressRingProps) {
  const progress = Math.min(value / max, 1);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const [gradStart, gradEnd] =
    gradientColors ?? [colors.primary, colors.secondary];

  // inner ring
  const innerSW = innerRing?.strokeWidth ?? 8;
  const innerGap = innerRing?.gap ?? 10;
  const innerRadius =
    radius - strokeWidth / 2 - innerGap - innerSW / 2;

  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerProgress = innerRing
    ? Math.min(innerRing.value / innerRing.max, 1)
    : 0;

  const [innerGradStart, innerGradEnd] =
    innerRing?.gradientColors ?? ['#00e5a0', '#00b4d8'];

  return (
    <View style={[defaultStyles.wrapper, styleOverrides?.wrapper]}>
      <Svg width={size} height={size} style={defaultStyles.svg}>
        <Defs>
          <LinearGradient id="outerGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={gradStart} />
            <Stop offset="100%" stopColor={gradEnd} />
          </LinearGradient>

          {innerRing && (
            <LinearGradient id="innerGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={innerGradStart} />
              <Stop offset="100%" stopColor={innerGradEnd} />
            </LinearGradient>
          )}
        </Defs>

        {/* Outer */}
        <RingArc
          cx={center}
          cy={center}
          radius={radius}
          strokeWidth={strokeWidth}
          circumference={circumference}
          progress={progress}
          gradientId="outerGrad"
          trackColor={trackColor}
        />

        {/* Inner */}
        {innerRing && (
          <RingArc
            cx={center}
            cy={center}
            radius={innerRadius}
            strokeWidth={innerSW}
            circumference={innerCircumference}
            progress={innerProgress}
            gradientId="innerGrad"
            trackColor={innerRing.trackColor}
            animDuration={900}
          />
        )}
      </Svg>

      {/* Center */}
      <View
        style={[
          defaultStyles.centerContent,
          { width: size, height: size },
          styleOverrides?.centerContent,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});