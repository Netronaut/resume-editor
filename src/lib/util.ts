import { converter, formatHex } from 'culori'

export function sortByProp<T, K extends keyof T>(
  prop: K,
  direction: 'asc' | 'desc' = 'asc'
): (a: T, b: T) => number {
  return (a, b) => {
    const aVal = a[prop]
    const bVal = b[prop]

    if (aVal === bVal) return 0
    if (aVal == null) return direction === 'asc' ? 1 : -1
    if (bVal == null) return direction === 'asc' ? -1 : 1

    return (aVal < bVal ? -1 : 1) * (direction === 'asc' ? 1 : -1)
  }
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

const oklchToHex = converter('oklch')

export function colorOclToHex(oclColor: string) {
  return formatHex(oklchToHex(oclColor))
}
