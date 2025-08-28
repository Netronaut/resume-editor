import { PDFViewer } from '@react-pdf/renderer'
import { NextIntlClientProvider } from 'next-intl'
import resume from '../fnagel.de.json'
import { ResumeDocument } from './components/ResumeDocument'
import messages from './i18n/de.json'

export default function App() {
  const lang = 'de'
  return (
    <PDFViewer className="h-screen w-screen">
      <NextIntlClientProvider locale={lang} messages={messages}>
        <ResumeDocument resume={resume} />
      </NextIntlClientProvider>
    </PDFViewer>
  )
}
