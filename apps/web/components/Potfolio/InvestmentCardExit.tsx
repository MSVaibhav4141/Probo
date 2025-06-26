'use client';

import { useState } from 'react';
import { ChevronDown, Minus, Plus, ArrowRightLeft } from 'lucide-react';
import ExitDropdownCard from './DropDownCard';
import { ExitOrder, MatchOrder } from './types';

export default function InvestmentCardExited({exitOrder}:{exitOrder: ExitOrder[]}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exitPrice, setExitPrice] = useState(5);
  const [quantity, setQuantity] = useState(2);

  const investment = 10;
  const exitValue = exitPrice * quantity;
  return (  
    <>
    {
    exitOrder.map((i, key) => (
        <div className="bg-white rounded-xl shadow p-4 w-full mb-4 relative">
      {/* Main row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-lg">{i.side}</span>
          <div className="text-center">
            <p className="font-semibold">₹{i.investment.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Investment</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">₹{i.return.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Returns</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">---</p>
            <p className="text-xs text-gray-500">Advanced Options</p>
          </div>
        </div>

          <div className="flex items-center gap-2">
          <button
           disabled={i.exited}
            className="cursor-not-allowed flex items-center gap-1 border px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100"
          >
            Exit <ArrowRightLeft size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <span className="text-xl">⋮</span>
          </button>
        </div>
      </div>

    </div>
    ))
    }
    </>
  );
}
