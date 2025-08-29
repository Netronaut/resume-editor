import { Text, View } from '@react-pdf/renderer'
import { useTranslations } from 'use-intl'
import { sortByProp } from '../lib/util'
import { Headline } from './Headline'
import { List, ListItem } from './List'
import { Section } from './Section'
import { spacing } from './styles'
import { formatDate } from './util'

type ProjectSchema = NonNullable<ResumeSchema['projects']>[number]

function Project({ project }: { project: ProjectSchema }) {
  return (
    <View style={{ gap: spacing[3] }} wrap={false}>
      <View style={{ gap: spacing[2] }}>
        <Headline level={2}>
          {project.name} – {project.startDate}
        </Headline>
        <Text style={{ fontStyle: 'italic' }}>{project.roles?.join(', ')}</Text>
      </View>

      <List>
        {project.highlights?.map((h, j) => (
          <ListItem key={j}>
            <Text>{h}</Text>
          </ListItem>
        ))}
      </List>
    </View>
  )
}

export function ProjectsSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('ProjectsSection')
  const projects = resume.projects?.toSorted(sortByProp('startDate', 'desc')).map(p => ({
    ...p,
    startDate: formatDate(p.startDate),
    endDate: formatDate(p.endDate),
  }))

  if (!projects || projects?.length === 0) {
    return
  }

  return (
    <Section level={1}>
      <View wrap={false} style={{ gap: spacing[6] }}>
        <Headline level={1}>{t('title')}</Headline>
        <Project project={projects.shift() as ProjectSchema} />
      </View>
      <View style={{ gap: spacing[6] }}>
        {projects.map((item, i) => (
          <Project key={i} project={item} />
        ))}
      </View>
    </Section>
  )
}
