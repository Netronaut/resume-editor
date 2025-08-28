import { PDFViewer as NoSSRPDFViewer } from '@react-pdf/renderer';
import { type ComponentProps } from 'react';

export function PDFViewer(props: ComponentProps<typeof NoSSRPDFViewer>) {
  return <NoSSRPDFViewer {...props} />;
}
