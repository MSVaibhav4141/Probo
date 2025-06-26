import { ArrowRightLeft, Plus } from "lucide-react"
import { Ointerface } from "./types"

 function calculateTotals(data: Ointerface) {
  let totalInvestment = 0;
  let totalReturn = 0;

  // Matched Orders
  for (const order of data.matched) {
    totalInvestment += order.investment;
    totalReturn += order.currentValue;
  }

  // Exited Orders
  for (const order of data.exited) {
    totalInvestment += order.investment;
    totalReturn += order.return;
  }

  // Cancelled Orders
  for (const order of data.cancelled) {
    totalInvestment += order.investment;
    // No return here
  }

  // Pending Orders (discriminated union)
  for (const order of data.pending) {
    totalInvestment += order.investment;
    if ("exitValue" in order) {
      totalReturn += order.exitValue;
    }
  }

  return { totalInvestment, totalReturn };
}

export const EventInvestments = ({data}:{data:Ointerface}) => {

  const {totalInvestment, totalReturn} = calculateTotals(data)
  
    return (
        <>
         <div className="bg-white p-3 rounded-xl">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-10">
          <div>
            <p className="text-lg font-semibold">₹{totalInvestment.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Invested</p>
          </div>
          <div>
            <p className="text-lg font-semibold">₹0.00</p>
            <p className="text-xs text-gray-500">Current value</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-600">-₹10.00</p>
            <p className="text-xs text-gray-500">Live returns</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition text-sm">
            Invest <Plus size={12} />
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition text-sm">
            Exit <ArrowRightLeft size={12} />
          </button>
        </div>
      </div>

      <hr className="my-4 border-dashed border-gray-400" />

      <p className="text-xs text-gray-500 flex items-center gap-2">
        <span role="img" aria-label="receipt">🧾</span> Exited returns ---
      </p>
    </div>
        </>
    )
}