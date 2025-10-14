import { Image as PDFImage } from '@react-pdf/renderer'

export function Image({ size = '165', resume }: { size?: string; resume: ResumeSchema }) {
  if (!resume.basics?.image) {
    return
  }
  return (
    <PDFImage src={resume.basics.image} style={{ width: size, height: size, borderRadius: 50 }} />
  )
}
