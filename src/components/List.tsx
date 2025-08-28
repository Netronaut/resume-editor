import { Text, View } from '@react-pdf/renderer';
import { type PropsWithChildren } from 'react';
import { spacing } from './styles';

export function List({ children }: PropsWithChildren) {
  return <View style={{ gap: spacing[2] }}>{children}</View>;
}

export function ListItem({ children }: PropsWithChildren) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing[3], paddingLeft: spacing[3] }}>
      <Text>•</Text>
      {children}
    </View>
  );
}
