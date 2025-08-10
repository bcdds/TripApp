import { ItineraryRow } from '../types'
import { groupBy } from '../utils/group'

export default function Itinerary({ rows }: { rows: ItineraryRow[] }) {
  const byDate = groupBy(rows, r => r.Date)
  const dates = Object.keys(byDate).sort()

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Itinerary</h2>
        <div className="text-sm text-slate-500">Multiple legs per day supported</div>
      </div>
      <div className="space-y-4">
        {dates.map(d => (
          <div key={d}>
            <div className="text-sm font-medium text-slate-600">{d}</div>
            <div className="mt-2 space-y-2">
              {byDate[d].sort((a,b)=> (a['Start Time']||'').localeCompare(b['Start Time']||'')).map((r, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 border rounded-lg p-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">{r['Leg Type']||'Leg'}</span>
                  {(r.From && r.To) ? (
                    <div className="font-medium">{r.From} → {r.To}</div>
                  ) : (
                    <div className="font-medium">{r['Location/Place'] || r.City || '—'}</div>
                  )}
                  <div className="text-sm text-slate-500 ml-auto">{r['Start Time']}–{r['End Time']}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
