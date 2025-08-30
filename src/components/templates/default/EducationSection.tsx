import { Text, View } from '@react-pdf/renderer'
import { useTranslations } from 'use-intl'
import { Headline } from './Headline'
import { List, ListItem } from './List'
import { Section } from './Section'

export function EducationSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('EducationSection')
  return (
    <Section level={2}>
      <Headline level={2}>{t('title')}</Headline>
      <List>
        {resume.education?.map((item, i) => (
          <ListItem key={i}>
            <View style={{ flexDirection: 'column' }}>
              <Text>{item.institution}</Text>
              <Text style={{ fontStyle: 'italic' }}>{item.area}</Text>
            </View>
          </ListItem>
        ))}
      </List>
    </Section>
  )
}
