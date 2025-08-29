import { Upload, FileText } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FileUploadProps {
  onFileUploaded: (resumeData: ResumeSchema) => void
  onError: (error: string) => void
}

export function FileUpload({ onFileUploaded, onError }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const processFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith('.json')) {
        onError('Please upload a JSON file')
        return
      }

      setIsProcessing(true)
      try {
        const text = await file.text()
        const resumeData = JSON.parse(text)
        onFileUploaded(resumeData)
      } catch {
        onError('Invalid JSON file. Please check the file format.')
      } finally {
        setIsProcessing(false)
      }
    },
    [onFileUploaded, onError]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragActive(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile]
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold text-neutral-900">Resume Editor</h1>
          <p className="text-lg text-neutral-600">Upload your JSON Resume file to get started</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>
              Drag and drop your resume.json file here or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-neutral-300 hover:border-neutral-400'
              } ${isProcessing ? 'pointer-events-none opacity-50' : ''} `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isProcessing ? (
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
                  ) : (
                    <div className="rounded-full bg-neutral-100 p-3">
                      {isDragActive ? (
                        <Upload className="h-6 w-6 text-blue-500" />
                      ) : (
                        <FileText className="h-6 w-6 text-neutral-600" />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-lg font-medium text-neutral-900">
                    {isProcessing
                      ? 'Processing file...'
                      : isDragActive
                        ? 'Drop your file here'
                        : 'Drop your resume.json file here'}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    or click the button below to browse
                  </p>
                </div>

                <div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".json"
                    onChange={handleFileSelect}
                    disabled={isProcessing}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isProcessing}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-neutral-500">
              <p>
                <strong>Tip:</strong> Your resume should follow the{' '}
                <a
                  href="https://jsonresume.org/schema/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  JSON Resume schema
                </a>{' '}
                format.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
