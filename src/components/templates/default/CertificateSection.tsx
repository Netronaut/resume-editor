import { Text } from '@react-pdf/renderer'
import { useTranslations } from 'next-intl'
import { Headline } from './Headline'
import { List, ListItem } from './List'
import { Section } from './Section'

export function CertificateSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('CertificateSection')
  return (
    <Section level={2}>
      <Headline level={2}>{t('title')}</Headline>
      <List>
        {resume.certificates?.map((item, i) => (
          <ListItem key={i}>
            <Text>{item.name}</Text>
          </ListItem>
        ))}
      </List>
    </Section>
  )
}
