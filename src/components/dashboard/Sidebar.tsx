import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  DoorOpen, 
  Shield, 
  FileText, 
  Radio, 
  Settings, 
  LogOut,
  ChevronLeft,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Building2, label: "Buildings", path: "/dashboard/buildings" },
  { icon: Users, label: "Tenants", path: "/dashboard/tenants" },
  { icon: DoorOpen, label: "Entry Gate", path: "/dashboard/entry-gate" },
  { icon: Shield, label: "Security", path: "/dashboard/security" },
  { icon: FileText, label: "Reports", path: "/dashboard/reports" },
  { icon: Radio, label: "Live Feed", path: "/dashboard/live-feed" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  return (
    <div className={`fixed top-0 left-0 h-full bg-secondary border-r border-border transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow-primary">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">InnoAIParking</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(!collapsed)}
          className="hover:bg-muted"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={true}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow-primary border-l-4 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          className={`w-full text-muted-foreground hover:text-foreground hover:bg-muted ${
            collapsed ? 'px-2' : 'justify-start gap-3'
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}