'use client'

import dynamic from 'next/dynamic'

const PieChart = dynamic(() => import('./charts/PieChart'), { ssr: false })
const BarChart = dynamic(() => import('./charts/BarChart'), { ssr: false })

export default function ChartWrapper({ type, data, xKey, yKey }: {
  type: 'pie' | 'bar'
  data: any[]
  xKey?: string
  yKey?: string
}) {
  if (type === 'bar' && xKey && yKey) return <BarChart data={data} xKey={xKey} yKey={yKey} />
  if (type === 'pie') return <PieChart data={data} />
  return null
}

