'use client'
import { TabButton } from "./TabButton"
import ValueToggeler from "./ValueToggeler"
import { useEffect, useState } from "react"
import useProboStore from "../../store/store"
import { SessionProvider, useSession } from "next-auth/react"
import axios from "axios"

const BuyBoxSession = ({ eventId, userId, probabilityNo, probabilityYes }: { eventId: string, userId: string, probabilityYes:number, probabilityNo: number }) => {
  const [price, setPrice] = useState(0.5);
  const [qty, setQty] = useState(2);
  const [availableQty, setAvailableQty] = useState(0);
  const { getBalance, balance, placeOrder, setOrderFeedback } = useProboStore();
  const [bal, setBal] = useState(0);
  const [isBalance, setBalance] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false)
  const session = useSession();
  const [side, setSide] = useState('yes');
  const type = 'buy';

  console.log(session)
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


  useEffect(() => {
  axios.post('/api/stocksQty', {
    eventId,
    price,
    type,
    side
  },{
    headers:{
      'Content-Type' : 'application/json'
    }
  }
).then(res => {
  setAvailableQty(res.data.qty)
})


  }, [price, side])
  const buyBid = async () => {
  if(session.data?.backendToken){
    const data =  await placeOrder({ eventId, price, type, side, qty, backendToken:session.data?.backendToken });
    
    if(data){
      setOrderSuccess(true)
      setTimeout(() => {
        setOrderSuccess(false)
      }, 2000);
    }
  }
}

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-md text-sm overflow-hidden relative">
      
      {orderSuccess && (
      <div className="w-[100%] h-[100%] bg-white absolute top-0 left-0 flex items-center justify-center flex-col">
      <img src="/success.gif" className=" top-0 left-0 w-[150px] h-[150px] object-contain "></img>
      <p className="text-success">Bid Submitted</p>
      </div>
      )}
      <TabButton currentState={side} setState={setSide} probabiltyNo={probabilityNo} probabilityYes={probabilityYes} />

      <div className="mt-3">
        <p className="text-xs font-semibold border border-gray-300 px-3 py-1 rounded-2xl inline-block">Set price</p>
      </div>

      <div className="mt-4 space-y-4">
        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Price</p>
            <p className="text-gray-500 text-xs">{availableQty} qty available</p>
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
        className={`mt-4 w-full py-2 rounded-md font-semibold text-white cursor-pointer ${isBalance ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Place order
      </button>
    </div>
  );
}

export const BuyBox = ({ eventId, userId, prob }: { eventId: string, userId: string | any, prob: {probabiltyYes:number, probabiltyNo: number} }) => {
  console.log(prob.probabiltyNo, prob.probabiltyYes, 'akdhsbjhfbshudbjfdsbfjsvdjvfjdsvfj')
  return (
    <SessionProvider>
      <BuyBoxSession eventId={eventId} userId={userId} probabilityYes={prob.probabiltyYes} probabilityNo={prob.probabiltyNo} />
    </SessionProvider>
  );
}
