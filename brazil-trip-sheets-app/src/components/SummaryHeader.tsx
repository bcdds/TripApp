import { round2 } from '../utils/money'

type Props = {
  totalSek: number
  totalBrl: number
  brunoSek: number
  brunoBrl: number
  sebSek: number
  sebBrl: number
}

export default function SummaryHeader(p: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-6">
      <Card title="Total">
        <BigMoney value={p.totalSek} currency="SEK" />
        <SmallMoney value={p.totalBrl} currency="BRL" />
      </Card>

      <Card title="Bruno paid">
        <BigMoney value={p.brunoSek} currency="SEK" />
        <SmallMoney value={p.brunoBrl} currency="BRL" />
      </Card>

      <Card title="Sebastian paid">
        <BigMoney value={p.sebSek} currency="SEK" />
        <SmallMoney value={p.sebBrl} currency="BRL" />
      </Card>
    </div>
  )
}

function Card({ title, children }: { title: string, children: any }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500 mb-1">{title}</div>
      <div>{children}</div>
    </div>
  )
}

function BigMoney({ value, currency }: { value: number, currency: string }) {
  return <div className="text-2xl font-semibold">{round2(value).toLocaleString()} <span className="text-base text-slate-600">{currency}</span></div>
}

function SmallMoney({ value, currency }: { value: number, currency: string }) {
  return <div className="text-sm text-slate-500">{round2(value).toLocaleString()} {currency}</div>
}
