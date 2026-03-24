export const dynamic = "force-dynamic";

import { EventInvestments } from "@components/Potfolio/EventInvestments";
import { MatchPredictionCard } from "@components/Potfolio/PortfoliHeader";
import { Orders } from "@components/Potfolio/Orders";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOption } from "../../../lib/auth";
import { prismaClient } from "@repo/prisma/prisma";

export default async function EventPortfolioPage({params}:{
  params:Promise<{
    eventId:string
  }>
}) {
  const session = await getServerSession(authOption)

  if(!session){
      return(<>
       Signin
    </>)}

    const token = session.backendToken;
    const {eventId} = await params
    const SERVER = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
    console.log(token)
    let data;
    try {
    const res = await axios.get(`${SERVER}/get/event/order/${eventId}`, {
      headers: { Authorization: token },
    });
    data = res.data;
  } catch (err) {
    // Log full error to your server logs
    console.error("🔥 Error fetching event orders:", err);

    // Render graceful fallback UI
    return (
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-red-600">
          Unable to load your orders right now.
        </h2>
        <p className="text-sm text-gray-500">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }


    const result = await prismaClient.events.findUnique({
      where:{
        id: eventId
      }
    })
    
    if(!result){
      return <>Page doesn't exsist</>
    }

    const isEventEnded = new Date(result.EndTime) <= new Date() ? true : false;

  return (
    <div className="p-4 space-y-4">
      
    <MatchPredictionCard name={result.title}/>
    <EventInvestments data={data}/>

    <Orders data={data} eventId={eventId} isEventEnded={isEventEnded} outcome={result.outCome}/>
     
    </div>
  );
}
