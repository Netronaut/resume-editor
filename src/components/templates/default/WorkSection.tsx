import { sortByProp } from '@/lib/util'
import { Link, Text, View } from '@react-pdf/renderer'
import { useTranslations } from 'use-intl'
import { Headline } from './Headline'
import { List, ListItem } from './List'
import { Section } from './Section'
import { spacing } from './styles'
import { formatDate } from './util'

type JobSchema = NonNullable<ResumeSchema['work']>[number]

function Job({ job }: { job: JobSchema }) {
  const t = useTranslations('WorkSection')
  return (
    <Section level={2} wrap={false}>
      <View style={{ gap: spacing[2] }}>
        <Headline level={2}>{job.name}</Headline>
        <Text style={{ fontStyle: 'italic' }}>
          {job.position} {job.startDate && `(${job.startDate} – ${job.endDate ?? t('today')})`}
        </Text>
        {job.url && <Link src={job.url}>{job.url}</Link>}
      </View>

      {job.summary && <Text>{job.summary}</Text>}
      {job.highlights && (
        <List>
          {job.highlights.map((h, j) => (
            <ListItem key={j}>
              <Text>{h}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Section>
  )
}

export function WorkSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('WorkSection')
  const work = resume.work?.toSorted(sortByProp('startDate', 'desc')).map(item => ({
    ...item,
    startDate: formatDate(item.startDate, { month: '2-digit', year: 'numeric' }),
    endDate: formatDate(item.endDate, { month: '2-digit', year: 'numeric' }),
  }))

  if (!work || work.length === 0) {
    return
  }

  return (
    <Section level={1}>
      <View wrap={false} style={{ gap: spacing[6] }}>
        <Headline level={1}>{t('title')}</Headline>
        <Job job={work.shift() as JobSchema} />
      </View>
      <View style={{ gap: spacing[6] }}>
        {work.map((job, i) => (
          <Job key={i} job={job} />
        ))}
      </View>
    </Section>
  )
}
