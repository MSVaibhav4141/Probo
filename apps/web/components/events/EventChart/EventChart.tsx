'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const EventChart = ({eventId, prob}:{eventId:string, prob:any}) => {
  const [currentProbability, swapProb] = useState(true); // true for yes and false for no

 

  console.log(prob.totalYes > prob.totalNo, prob.totalNo, prob)
    return(
      <>
      <div style={{ width: '100%', height: 300 }}>
        <button onClick={() => swapProb(prev => !prev)}>Swap</button>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={prob}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={currentProbability ? "probabiltyYes" : "probabiltyNo"} stroke={currentProbability ? '#2f87fc' : '#e46e5e'} fill={currentProbability ? "#bcd4fc" : '#fcdcd4'} />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      <div style={{ width: '100%', height: 150, marginTop:'30px'}}>
         <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={prob}
          margin={{
            right: 50,
            left: 20,
            bottom: 5,
          }}
          barSize={45}
        >
          <XAxis tick={false} axisLine={false} dataKey="time" scale="point" padding={{ left: 10, right: 10 }}/>
          <YAxis tick={false} axisLine={false}/>
          <Tooltip  />
          <Bar dataKey={'totalOrders'}>
            {prob.map((entry:any, index:any) => (
              <Cell
              key={index}
              fill={entry.topOrder ===  'yes' ? '#bcd4fc' : '#fcdcd4'}
              />
            ))}
          </Bar>
         
        </BarChart>
      </ResponsiveContainer>
      </div>
      </>
    )
    
}

export default EventChart