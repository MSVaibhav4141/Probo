'use client'

import { useEffect, useState } from "react";
import { useWebsocket } from "./useWebsocket";

interface OrderbookSide {
  price: number;
  quantity: number;
}

interface IOrderbookEvent {
  eventId: string;
  orderbook: {
    yes: OrderbookSide[];
    no: OrderbookSide[];
  };
}

const OrderBook = ({ orderbook, eventId }: { orderbook: IOrderbookEvent; eventId: string }) => {
  const [message, setMessage] = useState<IOrderbookEvent | null>(orderbook);
  const liveMessage = useWebsocket('ws://localhost:8080', eventId);

  useEffect(() => {
    if (liveMessage) {
      setMessage(liveMessage);
    }
  }, [liveMessage]);

  const maxQty = Math.max(
    ...(message?.orderbook.yes.map(o => o.quantity) || []),
    ...(message?.orderbook.no.map(o => o.quantity) || []),
    1
  );

  const getWidthPercent = (qty: number) => {
    const percent = (qty / maxQty) * 100;
    return percent < 5 ? 5 : percent;
  };

  return (
    <div className="bg-white p-4 rounded-md shadow text-sm">
      <div className="flex justify-between font-semibold mb-2 px-2">
        <div className="text-right text-blue-600">Yes</div>
        <div className="text-right text-red-600">No</div>
      </div>

      <div className="flex justify-between gap-4">
        {/* YES side (left) */}
        <div className="flex flex-col gap-1 w-1/2 items-end">
          {message?.orderbook.yes.map((i, index) => (
            <div key={index} className="relative w-full h-6 flex items-center justify-end pr-2">
              {/* Quantity text (always visible, not overlapped) */}
              <div className="w-[50px] text-left z-10">{i.price}</div>

              {/* Bar - right aligned */}
              <div className="relative flex-1 h-full flex justify-end">
                <div
                  className="absolute right-0 top-0 bottom-0 bg-blue-300 rounded-sm"
                  style={{ width: `${getWidthPercent(i.quantity)}%` }}
                />
                {/* Price inside bar, aligned to right */}
                <span className="z-10 pr-2 text-black">{i.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* NO side (right) */}
        <div className="flex flex-col gap-1 w-1/2 items-end">
          {message?.orderbook.no.map((i, index) => (
            <div key={index} className="relative w-full h-6 flex items-center justify-end pr-2">
              {/* Quantity text (always visible, not overlapped) */}
              <div className="w-[50px] text-left z-10">{i.price}</div>

              {/* Bar - right aligned */}
              <div className="relative flex-1 h-full flex justify-end">
                <div
                  className="absolute right-0 top-0 bottom-0 bg-red-300 rounded-sm"
                  style={{ width: `${getWidthPercent(i.quantity)}%` }}
                />
                {/* Price inside bar */}
                <span className="z-10 pr-2 text-black">{i.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
