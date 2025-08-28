import { Text, View } from '@react-pdf/renderer';
import { useTranslations } from 'use-intl';
import { Headline } from './Headline';
import { List, ListItem } from './List';
import { Section } from './Section';

export function LanguagesSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('LanguagesSection');
  return (
    <Section level={2}>
      <Headline level={2}>{t('title')}</Headline>
      <List>
        {resume.languages?.map((l, i) => (
          <ListItem key={i}>
            <View style={{ flexDirection: 'column' }}>
              <Text>{l.language}</Text>
              <Text style={{ fontStyle: 'italic' }}>{l.fluency}</Text>
            </View>
          </ListItem>
        ))}
      </List>
    </Section>
  );
}
