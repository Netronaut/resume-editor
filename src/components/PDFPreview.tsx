import { PDFViewer } from '@react-pdf/renderer'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../i18n/de.json'
import { ResumeDocument } from './templates/default/ResumeDocument'

interface PDFPreviewProps {
  resumeData: ResumeSchema
}

export default function PDFPreview({ resumeData }: PDFPreviewProps) {
  const resumeDocument = (
    <NextIntlClientProvider locale="de" messages={messages}>
      <ResumeDocument resume={resumeData} />
    </NextIntlClientProvider>
  )

  return (
    <PDFViewer className="h-full w-full" showToolbar={true}>
      {resumeDocument}
    </PDFViewer>
  )
}
