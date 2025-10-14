import { Loader2 } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import PDFDownload from './PDFDownload'

const LazyPDFPreview = lazy(() => import('./PDFPreview'))

interface PDFPreviewSectionProps {
  resumeData: ResumeSchema
  isMobile: boolean
}

export default function PDFPreviewSection({ resumeData, isMobile }: PDFPreviewSectionProps) {
  if (isMobile) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-900">PDF Preview</h3>
          <p className="text-sm text-neutral-600">Download the PDF to view on mobile devices</p>
        </div>
        <PDFDownload resumeData={resumeData} />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading PDF preview...</span>
          </div>
        }
      >
        <LazyPDFPreview resumeData={resumeData} />
      </Suspense>
    </ErrorBoundary>
  )
}
