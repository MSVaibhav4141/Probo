'use client'

import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#4ade80', '#fbbf24']

export default function CustomPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <PieChart width={250} height={250}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
        {data.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}
