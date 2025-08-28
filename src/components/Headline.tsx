import { type Styles, Text } from '@react-pdf/renderer';
import { type PropsWithChildren } from 'react';
import { spacing } from './styles';

export function Headline({ level, children }: PropsWithChildren<{ level: 1 | 2 | 3 }>) {
  const style: Record<typeof level, Styles[string]> = {
    1: {
      fontSize: spacing[5],
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    2: { fontSize: spacing[5] },
    3: { fontWeight: 'bold' },
  };
  return <Text style={style[level]}>{children}</Text>;
}
