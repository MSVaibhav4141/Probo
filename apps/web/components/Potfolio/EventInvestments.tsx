import { ArrowRightLeft, Plus } from "lucide-react"

export const EventInvestments = () => {
    return (
        <>
         <div className="bg-white p-3 rounded-xl">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-10">
          <div>
            <p className="text-lg font-semibold">₹10.00</p>
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