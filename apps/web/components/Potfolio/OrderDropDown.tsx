"use client";

import { useState } from "react";
import { ExitOrder, MatchOrder } from "./types";

export default function OrderDropdown({
  orders,
  profit,
}: {
  orders: MatchOrder | ExitOrder;
  profit: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Narrowing types
  const isExitOrder = "return" in orders;


  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 border px-4 py-2 rounded-full font-light text-xs hover:bg-gray-100"
      >
        View details
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-80 bg-white rounded-xl shadow-xl p-4 border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-500 font-semibold">Yes</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">SETTLED</span>
          </div>

          <div className="text-sm text-gray-700 mb-2">
            <strong>Order ID:</strong> {orders.orderId}
            <br />
            <span className="text-xs text-gray-500">Jun 16, 2025 11:33</span>
          </div>

          <div className="space-y-1 text-sm">
            <Detail label="Order Type" value="Limit" />
            <Detail label="Qty" value={isExitOrder ? orders.exitQty : orders.qty} />
            <Detail
              label="Price"
              value={
                isExitOrder
                  ? (orders.investment / orders.exitQty).toFixed(2)
                  : (orders.investment / orders.qty).toFixed(2)
              }
            />
            <Detail label="Exit Qty" value={isExitOrder ? orders.exitQty : 0 } />
            <Detail label="Exit Price" value={isExitOrder ? orders.return : 0 } />
            <Detail label="Profit" value={profit} />
            <Detail label="Platform Fee" value="₹0" />
            <Detail label="Order Id" value={orders.orderId} />
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
