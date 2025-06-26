'use client';

import { useState } from 'react';
import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface IData {
    investment: number,
    qty: number,
    buyprice: number,
    orderId:string
    exit?:boolean
}

export default function CancelledDropdownCard({investment ,qty,buyprice, orderId, exit}:IData) {
  const [exitQty, setExitQty] = useState(qty);


  const handleCancel = async(orderId: string) => {
    if(exit){
          const data = await axios.post('/api/cancelorder', {
  orderId,
  qty : exitQty,
  exit
}

)
    }else{
      
      const data = await axios.post('/api/cancelorder', {
   orderId,
   qty : exitQty
 })
    }
alert('Order is deleted');

  }
  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-md mx-auto shadow-md border border-gray-200">
      {/* Header */}
      <div className="border-dashed border rounded-xl px-4 py-2 text-xs flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500">Investment</p>
          <p className="font-medium">₹{investment}</p>
        </div>
        <div>
          <p className="text-gray-500">Quantity</p>
          <p className="font-medium">{qty}</p>
        </div>
        <div>
          <p className="text-gray-500">Buy price</p>
          <p className="font-medium">₹{buyprice}</p>
        </div>
      </div>


      {/* Exit price section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
        {/* Exit Price */}
        <div className='flex items-center justify-between'>
          <label className="text-xs font-semibold mb-1 flex">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExitQty((prev) => Math.max(1, prev - 1))}
              className="border rounded-lg px-1 py-1"
            >
              <Minus size={16} />
            </button>
            <div className="px-3 py-1 border rounded-lg text-xs font-semibold">{exitQty}</div>
            <button
              onClick={() => setExitQty((prev) => Math.min(prev+1, (qty)))}
              className="border rounded-lg px-1 py-1"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>


      {/* Exit Button */}
      <button 
      onClick={() => handleCancel(orderId)}
      className="text-xs mt-4 w-full bg-black text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
        Cancel
      </button>
    </div>
  );
}
