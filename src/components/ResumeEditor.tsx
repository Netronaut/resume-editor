import { Download, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState, Suspense, lazy } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EnhancedJsonEditor } from './EnhancedJsonEditor'
import { ErrorBoundary } from './ErrorBoundary'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import schema from '@jsonresume/schema/schema.json'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const LazyPDFPreview = lazy(() => import('./PDFPreview'))

interface ResumeEditorProps {
  initialResumeData: ResumeSchema
  onBack: () => void
}

export function ResumeEditor({ initialResumeData, onBack }: ResumeEditorProps) {
  const [resumeJson, setResumeJson] = useState(() => JSON.stringify(initialResumeData, null, 2))
  const [resumeData, setResumeData] = useState<ResumeSchema>(initialResumeData)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [pendingValidation, setPendingValidation] = useState<string | null>(null)

  // Set up AJV validator
  const validator = useMemo(() => {
    const ajv = new Ajv({ strict: false, allErrors: true })
    addFormats(ajv)
    return ajv.compile<ResumeSchema>(schema)
  }, [])

  // Validate and update resume data
  const validateAndUpdate = useCallback(
    (jsonString: string) => {
      setIsValidating(true)

      // Use setTimeout to make it async for the queuing system
      setTimeout(() => {
        try {
          const parsed = JSON.parse(jsonString)
          const valid = validator(parsed)

          if (valid) {
            setResumeData(parsed)
            setValidationErrors([])
            setIsValid(true)
          } else {
            const errors =
              validator.errors?.map(error => {
                const path = error.instancePath || 'root'
                const message = error.message || 'Invalid value'
                return `${path}: ${message}`
              }) || []
            setValidationErrors(errors)
            setIsValid(false)
          }
        } catch {
          setValidationErrors(['Invalid JSON syntax'])
          setIsValid(false)
        } finally {
          setIsValidating(false)

          // Check if there's a pending validation to run
          if (pendingValidation !== null && pendingValidation !== jsonString) {
            const nextValidation = pendingValidation
            setPendingValidation(null)
            validateAndUpdate(nextValidation)
          }
        }
      }, 0)
    },
    [validator, pendingValidation]
  )

  const handleJsonChange = useCallback((value: string) => {
    setResumeJson(value)
  }, [])

  const handleTextareaInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    // This is for the enhanced editor's onInput event
    const target = e.target as HTMLTextAreaElement
    setResumeJson(target.value)
  }, [])

  // Smart validation trigger - immediate if not validating, queued if validating
  useEffect(() => {
    if (isValidating) {
      // If currently validating, queue this validation
      setPendingValidation(resumeJson)
    } else {
      // If not validating, start validation immediately
      validateAndUpdate(resumeJson)
    }
  }, [resumeJson, isValidating, validateAndUpdate])

  const downloadJson = useCallback(() => {
    if (!isValid) return

    const blob = new Blob([resumeJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.basics?.name || 'resume'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [resumeJson, resumeData.basics?.name, isValid])

  return (
    <div className="flex h-screen flex-col bg-neutral-50">
      <div className="container mx-auto flex flex-1 flex-col overflow-hidden p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Resume Editor</h1>
              <p className="text-neutral-600">Edit your resume and see live validation feedback</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button disabled={!isValid}>
                  <Download className="mr-2 h-4 w-4" />
                  Preview PDF
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[80vh] max-w-4xl">
                <DialogHeader>
                  <DialogTitle>PDF Preview</DialogTitle>
                  <DialogDescription>Preview of your resume as PDF</DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                  {isValid && (
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
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={downloadJson} disabled={!isValid}>
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Editor */}
          <Card className="flex min-h-0 flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resume JSON</CardTitle>
                  <CardDescription>Edit your resume data in JSON format</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      <span className="text-sm font-medium">Valid</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      <span className="text-sm font-medium">
                        {validationErrors.length} error{validationErrors.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col">
              <EnhancedJsonEditor
                value={resumeJson}
                onChange={handleJsonChange}
                onInput={handleTextareaInput}
                className="min-h-0 flex-1"
                placeholder="Enter your resume JSON here..."
              />
            </CardContent>
          </Card>

          {/* Validation */}
          <Card className="flex min-h-0 flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Validation</CardTitle>
              <CardDescription>
                Real-time validation feedback using JSON Resume schema
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 overflow-y-auto">
              {isValid ? (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Your resume is valid! You can now export it to PDF or download the JSON.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your resume has validation errors. Fix them to enable PDF export.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Validation Errors:</h4>
                    <div className="space-y-1">
                      {validationErrors.map((error, index) => (
                        <div
                          key={index}
                          className="rounded border bg-red-50 p-2 text-sm text-red-600"
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="border-t pt-4">
                <h4 className="mb-2 text-sm font-medium">Schema Information:</h4>
                <p className="text-sm text-neutral-600">
                  Your resume is validated against the{' '}
                  <a
                    href="https://jsonresume.org/schema/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    JSON Resume v1.2.1 schema
                  </a>
                  . Make sure all required fields are present and correctly formatted.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer space */}
      <div className="flex h-16 flex-shrink-0 items-center justify-center border-t bg-neutral-100">
        <p className="text-sm text-neutral-600">Resume Editor - JSON Resume Schema v1.2.1</p>
      </div>
    </div>
  )
}
