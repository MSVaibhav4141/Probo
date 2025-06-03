'use client'
import { Tab, Tabs } from "@components/ui/Tabs"
import InvestmentCard from "./InvestmentCard";
import { useState } from "react";

export const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("All");
const orderTabs = ["All", "Pending", "Matched", "Exited", "Cancelled", "Rejected"];
    return(
        <div>
<Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
  {orderTabs.map(tab => (
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


      <div className="space-y-4 mt-4">
      <InvestmentCard />
      </div>

        </div>
    )
}