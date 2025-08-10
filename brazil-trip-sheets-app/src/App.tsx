import { useEffect, useMemo, useState } from 'react'
import { CONFIG } from './config'
import { fetchCSV } from './utils/csv'
import { getCurrencyPair, toNumber, convertToSEK, convertToBRL } from './utils/money'
import type { RatesRow, ItineraryRow, LodgingRow, ExpenseRow } from './types'
import SummaryHeader from './components/SummaryHeader'
import Itinerary from './components/Itinerary'
import Lodgings from './components/Lodgings'
import Expenses from './components/Expenses'

function useData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rates, setRates] = useState<RatesRow[]>([])
  const [itinerary, setItinerary] = useState<ItineraryRow[]>([])
  const [lodgings, setLodgings] = useState<LodgingRow[]>([])
  const [expenses, setExpenses] = useState<ExpenseRow[]>([])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const [r, i, l, e] = await Promise.all([
          fetchCSV<RatesRow>(CONFIG.RATES_CSV),
          fetchCSV<ItineraryRow>(CONFIG.ITINERARY_CSV),
          fetchCSV<LodgingRow>(CONFIG.LODGINGS_CSV),
          fetchCSV<ExpenseRow>(CONFIG.EXPENSES_CSV),
        ])
        setRates(r); setItinerary(i); setLodgings(l); setExpenses(e)
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { loading, error, rates, itinerary, lodgings, expenses }
}

export default function App() {
  const { loading, error, rates, itinerary, lodgings, expenses } = useData()

  const brlToSek = useMemo(() => {
    const r = rates.find(x => (x.Pair || '').toUpperCase().includes('BRL->SEK'))
    const val = r ? toNumber(r.Rate) : 0
    return val
  }, [rates])

  const { sekToBrl } = useMemo(() => getCurrencyPair(brlToSek), [brlToSek])

  const totals = useMemo(() => {
    let totalSek = 0, totalBrl = 0
    let brunoSek = 0, sebSek = 0

    const handle = (amt: number, cur: string, who: string, splitType?: string, splitB?: any, splitS?: any) => {
      const sek = convertToSEK(amt, cur, brlToSek)
      const brl = convertToBRL(amt, cur, brlToSek)
      totalSek += sek; totalBrl += brl

      if (splitType && splitType.toLowerCase() === 'split') {
        const bPct = (toNumber(splitB) || 50) / 100
        const sPct = (toNumber(splitS) || 50) / 100
        brunoSek += sek * bPct
        sebSek   += sek * sPct
      } else { // personal
        if ((who||'').toLowerCase() === 'bruno') brunoSek += sek
        else if ((who||'').toLowerCase() === 'sebastian') sebSek += sek
      }
    }

    lodgings.forEach(l => {
      const amt = toNumber(l.Amount)
      const cur = l['Currency (SEK/BRL)']
      const who = l['Paid By (Bruno/Sebastian)']
      const splitWith = (l['Split With (Both/Bruno/Sebastian/None)']||'').toLowerCase()
      const sek = convertToSEK(amt, cur, brlToSek)
      const brl = convertToBRL(amt, cur, brlToSek)
      totalSek += sek; totalBrl += brl
      if (splitWith === 'both') { brunoSek += sek/2; sebSek += sek/2 }
      else if ((who||'').toLowerCase() === 'bruno') brunoSek += sek
      else if ((who||'').toLowerCase() === 'sebastian') sebSek += sek
    })

    expenses.forEach(e => handle(
      toNumber(e.Amount),
      e['Currency (SEK/BRL)'],
      e['Paid By (Bruno/Sebastian)'],
      e['Split Type (Split/Personal)'],
      e['Split % Bruno'],
      e['Split % Sebastian'],
    ))

    return { totalSek, totalBrl, brunoSek, sebSek }
  }, [lodgings, expenses, brlToSek])

  if (loading) return <div className="p-6">Loading…</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Trip to Brazil 2025</h1>
        <div className="text-slate-500 text-sm">Data source: Google Sheets (CSV). BRL→SEK rate from Rates sheet.</div>
      </header>

      <SummaryHeader
        totalSek={totals.totalSek}
        totalBrl={totals.totalBrl}
        brunoSek={totals.brunoSek}
        brunoBrl={totals.brunoSek * (sekToBrl || 0)}
        sebSek={totals.sebSek}
        sebBrl={totals.sebSek * (sekToBrl || 0)}
      />

      <div className="grid gap-6">
        <Itinerary rows={itinerary} />
        <Lodgings rows={lodgings} brlToSek={brlToSek} />
        <Expenses rows={expenses} brlToSek={brlToSek} />
      </div>

      <footer className="text-center text-xs text-slate-400 mt-10">
        Built with React + Tailwind. Paste your Google Sheets CSV links in <code>src/config.ts</code>.
      </footer>
    </div>
  )
}
