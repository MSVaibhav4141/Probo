'use client';

import { useState } from 'react';
import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ExitDropdownCard({exitPrice, quantity , investment, side, orderId, eventId}:{exitPrice:number, quantity: number, investment: number, side:string, orderId:string, eventId: string}) {
  const [showOrderBook, setShowOrderBook] = useState(false);  
  const buyPrice = investment / quantity;
  const [exitQty, setExitQty] = useState(quantity);
  const [exitPriceByUser, setExitPrice] = useState(exitPrice);
  const exitValue = exitPriceByUser * exitQty;

  console.log('Order ID is :-', orderId)
  const handleExit = async(side: string,exitQty: number,orderId:string) => {
    console.log({
        eventId,
        price:exitPriceByUser,
        type: 'sell',
        side,
        qty: exitQty,
        exitFromOrderId: orderId
    })
    const {data} = await axios.post(`/api/sell/${eventId}`, {
        eventId,
        price:exitPriceByUser,
        type: 'sell',
        side,
        qty: exitQty,
        exitFromOrderId: orderId
    })

  }
  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-md mx-auto shadow-md border border-gray-200">
      {/* Header */}
      <div className="border-dashed border rounded-xl px-4 py-2 text-sm flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500">Investment</p>
          <p className="font-medium">₹{investment.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-gray-500">Quantity</p>
          <p className="font-medium">{quantity}</p>
        </div>
        <div>
          <p className="text-gray-500">Buy price</p>
          <p className="font-medium">₹{buyPrice.toFixed(1)}</p>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-4 mb-4 text-sm font-medium">
        <button className="bg-gray-100 px-4 py-2 rounded-full border border-gray-300">Set exit price</button>
        <button className="text-gray-500">Instant Exit</button>
      </div>

      {/* Exit price section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
        {/* Exit Price */}
        <div>
          <label className="text-sm font-semibold mb-1 block">Exit Price</label>
          <p className="text-xs text-gray-400 mb-2">0 qty available</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExitPrice((prev) => Math.max(0.5, prev - 0.5))}
              className="border rounded-lg px-3 py-1"
            >
              <Minus size={16} />
            </button>
            <div className="px-3 py-1 border rounded-lg text-base font-semibold">₹{exitPriceByUser.toFixed(1)}</div>
            <button
              onClick={() => setExitPrice((prev) => Math.min(9.5, prev + 0.5))}
              className="border rounded-lg px-3 py-1"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-semibold mb-1 block">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExitQty((prev) => Math.max(1, prev - 1))}
              className="border rounded-lg px-3 py-1"
            >
              <Minus size={16} />
            </button>
            <div className="px-4 py-1 border rounded-lg text-base font-semibold">{exitQty}</div>
            <button
              onClick={() => setExitQty((prev) => Math.min(quantity, prev + 1))}
              className="border rounded-lg px-3 py-1"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Exit Value */}
        <div className="text-right text-sm font-semibold">
          Exit value <span className="ml-2">₹{exitValue.toFixed(1)}
            {exitValue-buyPrice*exitQty !== 0 && (
              <span className={`${exitValue-buyPrice*exitQty > 0 ? 'text-green-400':'text-red-400'}`}>({exitValue-buyPrice*exitQty})</span>
            )} 
            </span>
        </div>
      </div>

      {/* Order Book Toggle */}
      <div className="mt-4 border border-gray-200 rounded-xl p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setShowOrderBook(!showOrderBook)}
      >
        <div className="flex items-center gap-2 font-semibold text-sm">
          <span className="text-red-500">📘</span> Order book
        </div>
        {showOrderBook ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {/* Optional: Expandable content if needed */}
      {showOrderBook && (
        <div className="mt-2 p-2 text-sm text-gray-500">
          {/* Order book details here */}
          No data available.
        </div>
      )}

      {/* Exit Button */}
      <button onClick={() => handleExit(side,exitQty,orderId)} className="mt-4 w-full bg-black text-white py-2 rounded-xl font-semibold hover:opacity-90 transition">
        Exit
      </button>
    </div>
  );
}
