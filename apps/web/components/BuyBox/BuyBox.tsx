'use client'
import { TabButton } from "./TabButton"
import ValueToggeler from "./ValueToggeler"
import { useEffect, useState } from "react"
import useProboStore from "../../store/store"
import { SessionProvider, useSession } from "next-auth/react"

const BuyBoxSession = ({ eventId, userId }: { eventId: string, userId: string }) => {
  const [price, setPrice] = useState(0.5);
  const [qty, setQty] = useState(2);
  const { getBalance, balance, placeOrder } = useProboStore();
  const [bal, setBal] = useState(0);
  const [isBalance, setBalance] = useState(true);
  const session = useSession();
  const [side, setSide] = useState('yes');
  const type = 'buy';

  useEffect(() => {
    getBalance(userId).then(res => {
      setBal(res);
      setBalance(price * qty <= res);
    });
  }, []);

  useEffect(() => {
    const balanceReq = price * qty;
    setBalance(balanceReq <= balance);
  }, [price, qty]);

  const buyBid = async () => {
    await placeOrder({ eventId, price, type, side, qty });
  }

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-md text-sm">
      <TabButton currentState={side} setState={setSide} />

      <div className="mt-3">
        <p className="text-xs font-semibold border border-gray-300 px-3 py-1 rounded-2xl inline-block">Set price</p>
      </div>

      <div className="mt-4 space-y-4">
        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Price</p>
            <p className="text-gray-500 text-xs">35 qty available</p>
          </div>
          <ValueToggeler gap={0.5} min={0.5} max={9.5} value={price} setValue={setPrice} />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Quantity</p>
          <ValueToggeler gap={1} min={1} max={10} value={qty} setValue={setQty} />
        </div>

        {/* Calculation */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-left">
            <p className="text-base font-semibold">₹{(price * qty).toFixed(1)}</p>
            <p className="text-xs text-gray-400">You put</p>
          </div>
          <div className="text-right">
            <p className="text-green-600 font-semibold">₹{(qty * 10).toFixed(1)}</p>
            <p className="text-xs text-gray-400">You get</p>
          </div>
        </div>

        {!isBalance && (
          <div className="text-red-500 text-sm">Not sufficient balance</div>
        )}
      </div>

      <button
        disabled={!isBalance}
        onClick={buyBid}
        className={`mt-4 w-full py-2 rounded-md font-semibold text-white ${isBalance ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Place order
      </button>
    </div>
  );
}

export const BuyBox = ({ eventId, userId }: { eventId: string, userId: string | any }) => {
  return (
    <SessionProvider>
      <BuyBoxSession eventId={eventId} userId={userId} />
    </SessionProvider>
  );
}
