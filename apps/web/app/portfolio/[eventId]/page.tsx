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
    const {data} = await axios.get(`${SERVER}/get/event/order/${eventId}`,
      {headers:{
        Authorization: token
      }} 
    )

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
