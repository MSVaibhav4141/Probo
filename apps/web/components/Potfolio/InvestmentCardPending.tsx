'use client';

import { useState } from 'react';
import { ChevronDown, Minus, Plus, ArrowRightLeft, CircleXIcon } from 'lucide-react';
import ExitDropdownCard from './DropDownCard';
import { MatchOrder, PendingOrder } from './types';
import CancelledDropdownCard from './CancelDropdownCard';

export default function InvestmentCardPending({pendingOrder}:{pendingOrder: PendingOrder[]}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exitPrice, setExitPrice] = useState(5);
  const [quantity, setQuantity] = useState(2);
  const [index, setIndex] = useState<number>(-1)
  const investment = 10;
  const exitValue = exitPrice * quantity;
  return (  
    <>
    {
    pendingOrder.map((i, key) => {
        if('buyPrice' in i){
           return(
                <div key={key} className={`bg-white rounded-xl shadow p-4 w-full mb-4 relative z-${pendingOrder.length - key}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-lg">{i.side}</span>
          <div className="text-center">
            <p className="font-semibold">₹{i.investment}</p>
            <p className="text-xs text-gray-500">Investment</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">₹{i.buyPrice}</p>
            <p className="text-xs text-gray-500">Buy Price</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">---</p>
            <p className="text-xs text-gray-500">Advanced Options</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
                setShowDropdown(!showDropdown)
                setIndex(key)
            }
            }
            className="flex items-center gap-1 border px-4 py-2 rounded-full font-light text-xs hover:bg-gray-100"
          >
           {i.investment/ i.buyPrice} unmatched <CircleXIcon className='text-red-400' size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <span className="text-xl">⋮</span>
          </button>
        </div>
      </div>
         {showDropdown && key === index && (
              <div className='absolute -transform-y-1/2 top-[80%] right-0 w-[340px] z-1000 ' key={key}>
                  <CancelledDropdownCard orderId={i.orderId} investment={i.investment} buyprice={i.buyPrice} qty={i.investment/ i.buyPrice} />
              </div>
            )}
    </div>  
           )
        
        }

                if('exitValue' in i){
          return (
            <div key={key} className="bg-white rounded-xl shadow p-4 w-full mb-4 relative z-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-lg">{i.side}</span>
          <div className="text-center">
            <p className="font-semibold">₹{i.investment}</p>
            <p className="text-xs text-gray-500">Investment</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">₹{i.exitValue}</p>
            <p className="text-xs text-gray-500">Exit value</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">---</p>
            <p className="text-xs text-gray-500">Advanced Options</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
                setShowDropdown(!showDropdown)
                setIndex(key)}}
            className="flex items-center gap-1 border px-4 py-2 rounded-full font-medium font-light text-xs hover:bg-gray-100"
          >
           {i.qty} exititing <CircleXIcon className='text-red-400' size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <span className="text-xl">⋮</span>
          </button>
        </div>
      </div>

      {showDropdown && key === index && (
              <div className='absolute -transform-y-1/2 top-[80%] right-0 w-[340px]' key={key}>
                 <CancelledDropdownCard exit={true} orderId={i.orderId} investment={i.investment} buyprice={i.investment / i.qty} qty={i.qty} />
              </div>
            )}
    </div>   
           )
        }
})
    }
    </>
  );
}
