import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/useIsMobile'
import { json } from '@codemirror/lang-json'
import schema from '@jsonresume/schema/schema.json'
import CodeMirror from '@uiw/react-codemirror'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

const LazyPDFPreview = lazy(() => import('./PDFPreview'))

interface ResumeEditorProps {
  initialResumeData: ResumeSchema
  onBack: () => void
}

export default function ResumeEditor({ initialResumeData, onBack }: ResumeEditorProps) {
  const [resumeJson, setResumeJson] = useState(() => JSON.stringify(initialResumeData, null, 2))
  const [resumeData, setResumeData] = useState<ResumeSchema>(initialResumeData)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [isValidating, setIsValidating] = useState(false)
  const [pendingValidation, setPendingValidation] = useState<string | null>(null)

  const validator = useMemo(() => {
    const ajv = new Ajv({ strict: false, allErrors: true })
    addFormats(ajv)
    return ajv.compile<ResumeSchema>(schema)
  }, [])

  const validateAndUpdate = useCallback(
    (jsonString: string) => {
      setIsValidating(true)

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

        if (pendingValidation !== null && pendingValidation !== jsonString) {
          const nextValidation = pendingValidation
          setPendingValidation(null)
          validateAndUpdate(nextValidation)
        }
      }
    },
    [validator, pendingValidation]
  )

  const handleJsonChange = useCallback((value?: string) => {
    setResumeJson(value ?? '')
  }, [])

  useEffect(() => {
    if (isValidating) {
      setPendingValidation(resumeJson)
    } else {
      validateAndUpdate(resumeJson)
    }
  }, [resumeJson, isValidating, validateAndUpdate])

  return (
    <div className="flex h-screen flex-col gap-4 bg-neutral-50 max-sm:gap-0">
      <div className="container mx-auto flex flex-1 flex-col gap-4 overflow-hidden max-sm:gap-0 max-sm:px-0">
        {/* Header */}
        <header className="flex flex-shrink-0 flex-col gap-2 pt-2 max-sm:px-4 max-sm:pt-4">
          <div className="flex flex-col items-start gap-2">
            <Button variant="outline" onClick={onBack} className="flex-shrink-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Resume Editor</h1>
              <p className="text-sm text-neutral-600 sm:text-base">
                Edit your resume and see live validation feedback
              </p>
            </div>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-hidden max-sm:gap-1 sm:gap-6 lg:grid-cols-2">
          {/* Editor */}
          <Card className="flex h-full min-h-0 flex-col max-sm:rounded-none max-sm:border-0 max-sm:pb-0 max-sm:shadow-none">
            <CardHeader className="flex-shrink-0 max-sm:px-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-xl">Resume JSON</CardTitle>
                  <CardDescription className="text-xs sm:text-base">
                    Edit your resume data in JSON format
                  </CardDescription>
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
            <CardContent className="flex min-h-0 flex-1 flex-col max-sm:px-0">
              <div className="min-h-0 flex-1 overflow-hidden border-y sm:rounded-md sm:border">
                <CodeMirror
                  value={resumeJson}
                  onChange={handleJsonChange}
                  extensions={[json()]}
                  theme="light"
                  height="100%"
                  style={{
                    fontSize: '14px',
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                    height: '100%',
                  }}
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    highlightSelectionMatches: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Validation */}
          <Card className="flex h-full min-h-0 flex-col max-sm:rounded-none max-sm:border-0 max-sm:shadow-none">
            <CardHeader className="max-sm:-p-2 flex-shrink-0 max-sm:p-2 max-sm:pb-0">
              <CardTitle className="text-base sm:text-xl">Validation</CardTitle>
              <CardDescription className="text-xs sm:text-base">
                Real-time validation feedback using JSON Resume schema
              </CardDescription>
            </CardHeader>
            <CardContent className="max-sm:-p-2 flex flex-1 flex-col space-y-2 max-sm:p-2 max-sm:pt-0">
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
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Footer space */}
      <footer className="flex h-10 flex-shrink-0 items-center justify-center border-t bg-neutral-100 sm:h-16">
        <p className="text-xs text-neutral-600 sm:text-base">
          Resume Editor - JSON Resume Schema v1.2.1
        </p>
      </footer>
    </div>
  )
}
