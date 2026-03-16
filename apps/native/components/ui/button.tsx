import * as React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

import { cn } from '@/lib/utils/cn';

interface ButtonProps extends PressableProps {
  textClassName?: string;
}

function Button({
  className,
  textClassName,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const textClass = cn('font-medium', textClassName);

  return (
    <Pressable
      className={cn('items-center justify-center rounded-md px-4 py-2', disabled && 'opacity-50', className)}
      disabled={disabled}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text className={textClass}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export { Button };
