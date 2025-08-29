import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ValidationPanelProps {
  isValid: boolean
  validationErrors: string[]
}

export default function ValidationPanel({ isValid, validationErrors }: ValidationPanelProps) {
  return (
    <div className="space-y-2">
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
                <div key={index} className="rounded border bg-red-50 p-2 text-sm text-red-600">
                  {error}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
