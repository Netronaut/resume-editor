import { Text, View } from '@react-pdf/renderer'
import colors from 'tailwindcss/colors'
import { useTranslations } from 'use-intl'
import { colorOclToHex } from '../lib/util'
import { Headline } from './Headline'
import { Section } from './Section'

const Tag = ({ label }: { label: string }) => (
  <View
    style={{
      backgroundColor: colorOclToHex(colors.zinc[100]),
      borderRadius: 2,
      marginBottom: 4,
      marginRight: 4,
      paddingHorizontal: 4,
      paddingVertical: 2,
    }}
  >
    <Text style={{ fontSize: 9 }}>{label}</Text>
  </View>
)

export const SkillsSection = ({ resume }: { resume: ResumeSchema }) => {
  const t = useTranslations('SkillsSection')
  const { skills } = resume

  if (!skills || skills.length === 0) {
    return
  }

  return (
    <Section level={1}>
      <Headline level={1}>{t('title')}</Headline>
      {skills.map((group, i) => (
        <Section key={i} wrap={false} level={2}>
          <Headline level={2}>{group.name}</Headline>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
            {group.keywords?.map((item, i) => (
              <Tag key={i} label={item} />
            ))}
          </View>
        </Section>
      ))}
    </Section>
  )
}
