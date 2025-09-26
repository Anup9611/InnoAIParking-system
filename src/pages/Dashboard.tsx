import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { BuildingSlotAllocation } from "@/components/dashboard/BuildingSlotAllocation";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const showHeader = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />
      
      <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {showHeader && <DashboardHeader />}
        
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
