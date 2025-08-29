import { PDFViewer } from '@react-pdf/renderer'
import { NextIntlClientProvider } from 'next-intl'
import { ResumeDocument } from './ResumeDocument'
import messages from '../i18n/de.json'

interface PDFPreviewProps {
  resumeData: ResumeSchema
}

export default function PDFPreview({ resumeData }: PDFPreviewProps) {
  return (
    <PDFViewer className="h-full w-full">
      <NextIntlClientProvider locale="de" messages={messages}>
        <ResumeDocument resume={resumeData} />
      </NextIntlClientProvider>
    </PDFViewer>
  )
}