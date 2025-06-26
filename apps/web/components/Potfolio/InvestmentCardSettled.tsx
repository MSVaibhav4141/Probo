'use client';

import { useState } from 'react';
import { ChevronDown, Minus, Plus, ArrowRightLeft } from 'lucide-react';
import ExitDropdownCard from './DropDownCard';
import { ExitOrder, MatchOrder } from './types';
import OrderDropdown from './OrderDropDown';

export default function InvestmentCardSettled({matchedOrder, exitedOrder, eventId, outcome}:{matchedOrder: MatchOrder[],exitedOrder: ExitOrder[] , eventId:string, outcome:string}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exitPrice, setExitPrice] = useState(5);
  const [quantity, setQuantity] = useState(2);

  const investment = 10;
  const exitValue = exitPrice * quantity;

  console.log("Tjos os ", matchedOrder, exitedOrder)     
  console.log(outcome)
  return (  
    <>
    {
    // matchedOrder.map((i, key) => (
    //     <div className="bg-white rounded-xl shadow p-4 w-full mb-4 relative">
    //   {/* Main row */}
    //   <div className="flex justify-between items-center">
    //     <div className="flex items-center gap-6">
    //       <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-lg">{i.side}</span>
    //       <div className="text-center">
    //         <p className="font-semibold">₹{i.investment.toFixed(1)}</p>
    //         <p className="text-xs text-gray-500">Investment</p>
    //       </div>
    //       <div className="text-center">
    //         <p className="font-semibold">{outcome === i.side ? `₹${(10 * i.qty - i.investment).toFixed(1)}` : `-₹${i.investment.toFixed(1)}`}</p>
    //         <p className="text-xs text-gray-500">Returns</p>
    //       </div>
    //     </div>

    //     <div className="flex items-center gap-2">
    //         <OrderDropdown orders={i} profit={outcome === i.side ? `₹${(10 * i.qty - i.investment).toFixed(1)}` : `-₹${i.investment.toFixed(1)}`}/>
    //     </div>
    //   </div>

    // </div>
    // ))
    }
    {
    exitedOrder.map((i, key) => (
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
            <p className="font-semibold">{`₹${(i.return).toFixed(1)}`}</p>
            <p className="text-xs text-gray-500">Returns</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <OrderDropdown orders={i} profit={`₹${(i.return).toFixed(1)}`}/>
        </div>
      </div>

    </div>
    ))
    }
    </>
  );
}
