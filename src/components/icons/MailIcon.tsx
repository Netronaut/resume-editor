import { Path, Rect, Svg } from '@react-pdf/renderer';

export function MailIcon({ size = 24 }: { size?: number | string }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <Rect x="2" y="4" width="20" height="16" rx="2" />
    </Svg>
  );
}
