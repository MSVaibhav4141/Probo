'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CustomBarChart({ data, xKey, yKey }: {
  data: any[]
  xKey: string
  yKey: string
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  )
}