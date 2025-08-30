import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../i18n/de.json'
import { ResumeDocument } from './templates/default/ResumeDocument'
import { Button } from './ui/button'

interface PDFDownloadProps {
  resumeData: ResumeSchema
  className?: string
}

export default function PDFDownload({ resumeData, className }: PDFDownloadProps) {
  const resumeDocument = (
    <NextIntlClientProvider locale="de" messages={messages}>
      <ResumeDocument resume={resumeData} />
    </NextIntlClientProvider>
  )

  return (
    <PDFDownloadLink
      document={resumeDocument}
      fileName={`${resumeData.basics?.name?.replace(/\s+/g, '_') || 'resume'}.pdf`}
      className={className}
    >
      {({ loading }) => (
        <Button disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? 'Generating...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
