import { type Styles, View } from '@react-pdf/renderer';
import type { ComponentProps, PropsWithChildren } from 'react';
import { spacing } from './styles';

export function Section({
  children,
  level,
  ...props
}: PropsWithChildren<ComponentProps<typeof View> & { level: 1 | 2 }>) {
  const styles: Record<typeof level, Styles[string]> = {
    1: { gap: spacing[6] },
    2: { gap: spacing[4] },
  };
  return (
    <View style={styles[level]} {...props}>
      {children}
    </View>
  );
}
