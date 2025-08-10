import { ExpenseRow } from '../types'
import { toNumber, convertToSEK, convertToBRL } from '../utils/money'

const emoji: Record<string,string> = {
  Restaurant: '🍽️',
  Transport: '🚌',
  Flight: '✈️',
  Activity: '🎟️',
  Other: '💳',
}

export default function Expenses({ rows, brlToSek }: { rows: ExpenseRow[], brlToSek: number }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Expenses</h2>
      <div className="space-y-2">
        {rows.map((r, i) => {
          const amt = toNumber(r.Amount)
          const sek = convertToSEK(amt, r['Currency (SEK/BRL)'], brlToSek)
          const brl = convertToBRL(amt, r['Currency (SEK/BRL)'], brlToSek)
          const cat = r['Category (Restaurant/Transport/Flight/Activity/Other)']
          return (
            <div key={i} className="flex items-center gap-3 border rounded-lg p-2">
              <div className="text-lg">{emoji[cat] || '💳'}</div>
              <div className="flex-1">
                <div className="font-medium">{r.Description || cat}</div>
                <div className="text-xs text-slate-500">{r.Date} · {r.City || '—'} · Paid by {r['Paid By (Bruno/Sebastian)']}</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-right">{sek.toFixed(2)} SEK</div>
                <div className="text-right text-slate-500">{brl.toFixed(2)} BRL</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
