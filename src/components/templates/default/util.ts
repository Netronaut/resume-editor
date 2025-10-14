import { converter, formatHex } from 'culori'

export const locale = 'de-DE'

export function formatDate(
  date: string | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
  }
): string | undefined {
  if (!date) {
    return
  }
  return Intl.DateTimeFormat(locale, options).format(new Date(date))
}

const oklchToHex = converter('oklch')

export function colorOclToHex(oclColor: string) {
  return formatHex(oklchToHex(oclColor))
}
