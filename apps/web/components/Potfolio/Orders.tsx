"use client";
import { Tab, Tabs } from "@components/ui/Tabs";
import { useState } from "react";
import InvestmentCardMatched from "./InvestmentCardMatched";
import { Ointerface } from "./types";
import InvestmentCardPending from "./InvestmentCardPending";
import InvestmentCardCancelled from "./InvestmentCardCancelled";
import InvestmentCardSettled from "./InvestmentCardSettled";
import InvestmentCardExited from "./InvestmentCardExit";

export const Orders = ({ data, eventId, isEventEnded , outcome}: { data: Ointerface, eventId: string, isEventEnded:boolean, outcome: string }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const orderTab = isEventEnded ? [
    "All",
    "Settled",
    "Cancelled",
    "Rejected",
  ] : [
    "All",
    "Pending",
    "Matched",
    "Exited",
    "Cancelled",
    "Rejected",
    ]

  return (
    <div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
        {orderTab.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            isActive={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
        
      {selectedTab === 'All' && (
        <div className="space-y-4 mt-4">
          {isEventEnded ? 
          <>
          <InvestmentCardCancelled cancelledOrder={data.cancelled} />
          <InvestmentCardSettled outcome={outcome} matchedOrder={data.matched} exitedOrder={data.exited} eventId={eventId} />
          </> : 
          <>
          <InvestmentCardPending pendingOrder={data.pending} />
          <InvestmentCardExited exitOrder={data.exited} />
          <InvestmentCardCancelled cancelledOrder={data.cancelled} />
          <InvestmentCardMatched matchedOrder={data.matched} eventId={eventId}/>
          </>}
      </div>
      )}
      <div>
      {selectedTab === "Pending" && (
        <>
        {data.pending.length === 0 && (
          <img src="/empty.png" alt="not found" className="mt-14 w-[300px] m-auto"/>
        )}
        <div className="space-y-4 mt-4">
          <InvestmentCardPending pendingOrder={data.pending} />
        </div>
        </>
      )}
      {selectedTab === "Matched" && (
        <>
        {data.matched.length === 0 && (
          <img src="/empty.png" alt="not found" className="mt-14 w-[300px] m-auto"/>
        )}
        <div className="space-y-4 mt-4">
        <InvestmentCardMatched matchedOrder={data.matched} eventId={eventId} />
        </div>
        </>
      )}
      {selectedTab === "Exited" && (
        <>
        {data.exited.length === 0 && (
          <img src="/empty.png" alt="not found" className="mt-14 w-[300px] m-auto"/>
        )}
        <div className="space-y-4 mt-4">
        <InvestmentCardExited exitOrder={data.exited} />
        </div>
        </>
      )}
      {selectedTab === "Settled" && (
        <>
        {data.matched.length === 0 && data.exited.length === 0 &&  (
          <img src="/empty.png" alt="not found" className="mt-14 w-[300px] m-auto"/>
        )}
        <div className="space-y-4 mt-4">
        <InvestmentCardSettled outcome={outcome} matchedOrder={data.matched} exitedOrder={data.exited} eventId={eventId} />
        </div>
        </>
      )}
      {selectedTab === "Cancelled" && (
        <>
        {data.cancelled.length === 0 && (
          <img src="/empty.png" alt="not found" className="mt-14 w-[300px] m-auto"/>
        )}
        <div className="space-y-4 mt-4">
          <InvestmentCardCancelled cancelledOrder={data.cancelled} />
        </div>
      </>
      )}
      </div>
    </div>
  );
};
