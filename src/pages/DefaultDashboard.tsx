import React from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { BuildingSlotAllocation } from "@/components/dashboard/BuildingSlotAllocation";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const DefaultDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      <BuildingSlotAllocation />
      <DashboardTabs />
    </div>
  );
};

export default DefaultDashboard;
