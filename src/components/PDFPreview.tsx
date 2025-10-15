import { defaultLocale, pdfMessages } from '@/config'
import { PDFViewer } from '@react-pdf/renderer'
import { NextIntlClientProvider } from 'next-intl'
import { ResumeDocument } from './templates/default/ResumeDocument'

interface PDFPreviewProps {
  resumeData: ResumeSchema
}

export default function PDFPreview({ resumeData }: PDFPreviewProps) {
  const resumeDocument = (
    <NextIntlClientProvider locale={defaultLocale} messages={pdfMessages}>
      <ResumeDocument resume={resumeData} />
    </NextIntlClientProvider>
  )

  return (
    <PDFViewer className="h-full w-full" showToolbar={true}>
      {resumeDocument}
    </PDFViewer>
  )
}
