import { LodgingRow } from '../types'
import { toNumber, convertToSEK, convertToBRL } from '../utils/money'

export default function Lodgings({ rows, brlToSek }: { rows: LodgingRow[], brlToSek: number }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Lodgings</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((r, i) => {
          const amt = toNumber(r.Amount)
          const sek = convertToSEK(amt, r['Currency (SEK/BRL)'], brlToSek)
          const brl = convertToBRL(amt, r['Currency (SEK/BRL)'], brlToSek)
          return (
            <div key={i} className="border rounded-lg p-3">
              <div className="font-medium">{r['Property Name'] || '—'}</div>
              <div className="text-sm text-slate-500">{r.City} · {r['Platform (Booking/Airbnb/etc.)']||''}</div>
              <div className="text-sm text-slate-600 mt-1">{r['Check-in']} → {r['Check-out']} ({r.Nights || '?'} nights)</div>
              <div className="mt-2 text-sm">
                <span className="font-medium">{sek.toFixed(2)} SEK</span>
                <span className="text-slate-500 ml-2">{brl.toFixed(2)} BRL</span>
              </div>
              <div className="text-xs mt-1">Paid by: {r['Paid By (Bruno/Sebastian)'] || '—'} • Split: {r['Split With (Both/Bruno/Sebastian/None)'] || '—'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
