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
