import { View } from '@react-pdf/renderer';
import type { PropsWithChildren } from 'react';
import { Headline } from './Headline';
import { spacing } from './styles';

export function TitleSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={{ gap: spacing[4] }}>
      <Headline level={2}>{title}</Headline>
      {children}
    </View>
  );
}
