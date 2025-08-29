import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { FileUpload } from './components/FileUpload'

const LazyResumeEditor = lazy(() => import('./components/ResumeEditor'))

type AppState = 'upload' | 'edit'

export default function App() {
  const [state, setState] = useState<AppState>('upload')
  const [resumeData, setResumeData] = useState<ResumeSchema | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUploaded = (data: ResumeSchema) => {
    setResumeData(data)
    setState('edit')
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleBack = () => {
    setState('upload')
    setResumeData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen">
      {error && (
        <div className="fixed top-4 left-1/2 z-50 max-w-md -translate-x-1/2 transform">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {state === 'upload' && (
        <FileUpload onFileUploaded={handleFileUploaded} onError={handleError} />
      )}

      {state === 'edit' && resumeData && (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading resume editor...</span>
              </div>
            }
          >
            <LazyResumeEditor initialResumeData={resumeData} onBack={handleBack} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
