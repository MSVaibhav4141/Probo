import { BuyBox } from '@components/BuyBox/BuyBox'
import Events from '@components/events/Events'
import Tabs from '@components/events/Tabs/Tabs'
import { getServerSession } from 'next-auth'
import { authOption } from '../../../lib/auth'
import OrderBook from '@components/events/Orderbook/OrderBook'
import EventChart from '@components/events/EventChart/EventChart'


type Params = Promise<{ slug: string }>


export default async function EventPage({ params }: { params: Params }){
  const { slug : eventId } = await params;
  const session = await getServerSession(authOption)
console.log(process.env.NEXT_PUBLIC_SERVER_ENDPOINT, process.env.NEXT_PUBLIC_WS)
  const orderbook = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/get/orderbook/${eventId}`).then(res => res.json())
  const chart = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/get/chart/${eventId}?duration=0`).then(res => res.json())

  return (
    <div className="flex h-[100vh]">
      {/* Left side scrollable */}
<div className="w-[60vw] overflow-y-auto pr-4 no-scrollbar">
        <Events title='Bengaluru to win the match vs Kolkata?' />

        <Tabs eventId={eventId} tabsName={['Orderbook', 'Timeline', 'Overview']} />

        <div id="orderbook" className="scroll-mt-20">
          <OrderBook eventId={eventId} orderbook={orderbook} />
        </div>

        <div id="timeline" className="scroll-mt-20 mt-10">
          <EventChart eventId={eventId} prob={chart.probabilityStatus} />
        </div>
{/* <   StatsContainer team1="Mumbai" team2="Delhi" /> */}

        <div id="overview" className="scroll-mt-20 mt-10 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-sm text-gray-600">This event represents the live prediction market for the match outcome between Mumbai and Delhi. The orderbook and timeline provide real-time data on user predictions.</p>
        </div>
      </div>

      {/* Right side sticky BuyBox */}
      <div className="w-[40vw] pl-4 pr-4">
        <div className="sticky top-4">
          <BuyBox eventId={eventId} userId={session?.user.id} />
        </div>
      </div>
    </div>
  )
}



