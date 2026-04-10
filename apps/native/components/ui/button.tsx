import * as React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends PressableProps {
  textClassName?: string;
  gradient?: [string, string, ...string[]];
  children: React.ReactNode;
}

export function Button({
  textClassName,
  disabled,
  children,
  gradient = ['#ff7a18', '#ff3d00'],
  ...props
}: ButtonProps) {
  const textClass = cn('font-semibold text-white', textClassName);

  return (
    <Pressable style={{ width: '100%' }} disabled={disabled} {...props}>
      {(state) => {
        const isPressed = state.pressed;

        return (
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 14,
              alignItems: 'center',
              borderRadius: 12,
              opacity: isPressed ? 0.85 : 1,
              transform: [{ scale: isPressed ? 0.97 : 1 }],
              overflow: 'hidden',
            }}
          >
            {typeof children === 'string' || typeof children === 'number' ? (
              <Text className={textClass}>{children}</Text>
            ) : (
              children
            )}
          </LinearGradient>
        );
      }}
    </Pressable>
  );
}
