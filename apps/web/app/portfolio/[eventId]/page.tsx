import { EventInvestments } from "@components/Potfolio/EventInvestments";
import { MatchPredictionCard } from "@components/Potfolio/PortfoliHeader";
import { Orders } from "@components/Potfolio/Orders";
import axios from "axios";

export default async function EventPortfolioPage({params}:{
  params:{
    eventId:string
  }
}) {

  const {eventId} = params
  const SERVER = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

  const {data} = await axios.get(`${SERVER}/get/event/order/${eventId}`)

  
  return (
    <div className="p-4 space-y-4">
      
    <MatchPredictionCard />
    <EventInvestments />

    <Orders />
     
    </div>
  );
}
