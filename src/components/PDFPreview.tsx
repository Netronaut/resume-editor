import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { useEffect, useState } from 'react'
import messages from '../i18n/de.json'
import { ResumeDocument } from './ResumeDocument'
import { Button } from './ui/button'

interface PDFPreviewProps {
  resumeData: ResumeSchema
}

export default function PDFPreview({ resumeData }: PDFPreviewProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  const resumeDocument = (
    <NextIntlClientProvider locale="de" messages={messages}>
      <ResumeDocument resume={resumeData} />
    </NextIntlClientProvider>
  )

  if (isMobile) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-900">PDF Preview</h3>
          <p className="text-sm text-neutral-600">Download the PDF to view on mobile devices</p>
        </div>
        <PDFDownloadLink
          document={resumeDocument}
          fileName={`${resumeData.basics?.name?.replace(/\s+/g, '_') || 'resume'}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? 'Generating...' : 'Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    )
  }

  return (
    <PDFViewer className="h-full w-full" showToolbar={true}>
      {resumeDocument}
    </PDFViewer>
  )
}
