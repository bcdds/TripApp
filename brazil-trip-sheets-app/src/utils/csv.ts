import Papa from 'papaparse'

export async function fetchCSV<T = any>(url: string): Promise<T[]> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  const text = await res.text()
  const parsed = Papa.parse<T>(text, { header: true, skipEmptyLines: true })
  if (parsed.errors.length) console.warn(parsed.errors)
  return parsed.data
}
