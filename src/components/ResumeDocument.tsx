import { Document, Page, Text, View } from '@react-pdf/renderer'
import { useTranslations } from 'next-intl'
import colors from 'tailwindcss/colors'
import { colorOclToHex } from '../lib/util'
import { CertificateSection } from './CertificateSection'
import { ContactSection } from './ContactSection'
import { EducationSection } from './EducationSection'
import { HeaderInfo } from './HeaderInfo'
import { LanguagesSection } from './LanguagesSection'
import { ProjectsSection } from './ProjectsSection'
import { SkillsSection } from './SkillsSection'
import { spacing } from './styles'
import { WorkSection } from './WorkSection'

export function ResumeDocument({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('ResumeDocument')
  return (
    <Document
      author={resume.basics?.name}
      subject={t('subject', { label: String(resume.basics?.label) })}
    >
      <Page
        size="A4"
        style={{
          padding: 30,
          fontSize: spacing[4],
          fontFamily: 'Helvetica',
          color: colorOclToHex(colors.zinc[900]),
        }}
      >
        <HeaderInfo resume={resume} />
        <View style={{ marginTop: 260, flexDirection: 'row' }}>
          <View
            style={{
              width: '33%',
              minHeight: '100%',
              paddingRight: '7%',
              borderRight: '1 solid #ccc',
              display: 'flex',
              gap: spacing[6],
            }}
          >
            <ContactSection resume={resume} />
            <LanguagesSection resume={resume} />
            <EducationSection resume={resume} />
            <CertificateSection resume={resume} />
          </View>

          <View
            style={{
              paddingLeft: '7%',
              width: '63%',
              display: 'flex',
              gap: spacing[8],
            }}
          >
            <SkillsSection resume={resume} />
            <WorkSection resume={resume} />
            <ProjectsSection resume={resume} />
          </View>
        </View>

        <View fixed style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          <Text style={{ color: colorOclToHex(colors.zinc[500]) }}>
            {t('footer-note', { name: String(resume.basics?.name) })}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
