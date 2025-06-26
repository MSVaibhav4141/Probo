import EventCard from "@components/events/EventCard";
import Tabs from "@components/events/EventTab";
import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import { prismaClient } from "@repo/prisma/prisma";
import DownloadAppCard from "@components/events/DownloadApp";
import EventsSectionHeader from "@components/events/EventSectionHeader";

export default async function EventsPage() {
     const session = await getServerSession(authOption);

  if (!session) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please log in to view events.
      </div>
    );
  }

    const events = await prismaClient.events.findMany({
    orderBy: { EndTime: "desc" },
  });

  return (
    <>
      <div>
        <Tabs />
        <div className="flex justify-center mt-4">
    
        <div>
         <EventsSectionHeader />
        <div className="flex justify-center flex-wrap">
            {events.map((i, key) => (
          <EventCard
          key={key}
            eventId={i.id}
            traders={713}
            question={i.title}
            description={`India's Public Administration, Defence & Other Services sector grew by 8.9% in FY24-25`}
            imageUrl="/shield.png" // store this locally or use external link
            yesPrice="₹7"
            noPrice="₹3"
          />
            ))}
        </div>
        </div>
        <div>
            <DownloadAppCard />
        </div>
        <div>
            </div>    
        </div>
      </div>
    </>
  );
}
