'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { ArrowRightLeft, Settings, Check } from 'lucide-react';

interface Props {
  eventId: string;
  prob: Array<{
    time: string;
    probabiltyYes: number;
    probabiltyNo: number;
    totalOrders: number;
    topOrder: 'yes' | 'no';
  }>;
}

export default function EventChart({ eventId, prob }: Props) {

  const [currentProbability, setCurrentProbability] = useState(true);   
  const [showSettings, setShowSettings] = useState(false);   
  const [showGrid, setShowGrid] = useState(true);    
  const [showVolume, setShowVolume] = useState(true);    


  const ToggleRow = ({
    label,
    checked,
    onClick,
  }: {
    label: string;
    checked: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-100"
    >
      {label}
      {checked && <Check className="w-4 h-4 text-blue-600" />}
    </button>
  );


  return (
    <div className="relative bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentProbability(p => !p)}
            className="p-2 rounded-sm bg-blue-50 hover:bg-blue-100"
            aria-label="Toggle YES / NO"
          >
            <ArrowRightLeft className="w-4 h-4 text-blue-600" />
          </button>

          <div className="mx-2">
            <div className="text-xs text-gray-500 font-medium">
              {currentProbability ? 'YES' : 'NO'}
            </div>
            <div
              className={`text-xl font-bold ${
                currentProbability ? 'text-blue-600' : 'text-red-500'
              }`}
            >
              {currentProbability
                ? `${(prob.at(-1)?.probabiltyYes ?? 0).toFixed(1)}% Probability`
                : `${(prob.at(-1)?.probabiltyNo ?? 0).toFixed(1)}% Probability`}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSettings(s => !s)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Chart settings"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>

          {showSettings && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10"
              onMouseLeave={() => setShowSettings(false)}
            >
              <ToggleRow
                label="Trade Volume"
                checked={showVolume}
                onClick={() => setShowVolume(v => !v)}
              />
              <ToggleRow
                label="Grids"
                checked={showGrid}
                onClick={() => setShowGrid(g => !g)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={prob}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="time" />
            <YAxis
              domain={[0, 1]}
              tickFormatter={v => v.toFixed(1)}
              width={30}
            />
            <Tooltip
              formatter={(v: number) => `${(v * 10).toFixed(1)} Points`}
            />
            <Area
              type="monotone"
              dataKey={currentProbability ? 'probabiltyYes' : 'probabiltyNo'}
              stroke={currentProbability ? '#2f87fc' : '#e46e5e'}
              fill={currentProbability ? '#bcd4fc' : '#fcdcd4'}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {showVolume && (
        <div className="w-full h-36 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={prob}
              margin={{ right: 50, left: 20, bottom: 5 }}
              barSize={40}
            >
              <XAxis
                tick={false}
                axisLine={false}
                dataKey="time"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis tick={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="totalOrders">
                {prob.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.topOrder === 'yes' ? '#bcd4fc' : '#fcdcd4'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
