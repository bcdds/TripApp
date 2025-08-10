export function toNumber(x: any): number {
  if (x === null || x === undefined || x === '') return 0
  if (typeof x === 'number') return x
  const n = Number(String(x).replace(/[^0-9.,-]/g, '').replace(',', '.'))
  return isNaN(n) ? 0 : n
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

export type CurrencyPair = { brlToSek: number, sekToBrl: number }

export function getCurrencyPair(rateBrlToSek: number): CurrencyPair {
  const brlToSek = rateBrlToSek || 0
  const sekToBrl = brlToSek ? (1 / brlToSek) : 0
  return { brlToSek, sekToBrl }
}

export function convertToSEK(amount: number, currency: string, brlToSek: number): number {
  if (currency === 'SEK') return amount
  if (currency === 'BRL') return amount * brlToSek
  return amount
}

export function convertToBRL(amount: number, currency: string, brlToSek: number): number {
  if (currency === 'BRL') return amount
  if (currency === 'SEK') return brlToSek ? amount / brlToSek : 0
  return amount
}
