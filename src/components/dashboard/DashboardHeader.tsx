import { AlertCircle, Bell, Clock, LogOut, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const navigate = useNavigate();

  interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    unread: boolean;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        title: "New Parking Alert",
        message: "Building A parking lot is 90% full.",
        timestamp: "2 minutes ago",
        unread: true,
      },
      {
        id: 2,
        title: "Security Breach",
        message: "Unauthorized access detected at Entry Gate 1.",
        timestamp: "10 minutes ago",
        unread: true,
      },
      {
        id: 3,
        title: "Maintenance Update",
        message: "Elevator in Building B is back online.",
        timestamp: "1 hour ago",
        unread: true,
      },
    ];
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => n.unread).length);
  }, []);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
    toast.success("Notification marked as read");
  };

  const badgeText = unreadCount > 99 ? '99+' : unreadCount.toString();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative transition-all duration-200 hover:scale-105">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                    {badgeText}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-card border-border shadow-elevated max-h-96 overflow-y-auto" align="end" sideOffset={10}>
              <DropdownMenuLabel className="font-normal text-foreground p-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                </div>
              </DropdownMenuLabel>
              {notifications.length === 0 ? (
                <DropdownMenuItem className="p-3 text-center text-muted-foreground">
                  No new notifications
                </DropdownMenuItem>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={`cursor-pointer p-3 focus:bg-accent focus:text-accent-foreground transition-colors duration-200 ${notification.unread ? 'bg-accent/10' : ''}`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <AlertCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${notification.unread ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground leading-tight truncate">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all duration-200">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">John Doe</p>
                  <p className="text-muted-foreground">Administrator</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card border-border shadow-elevated" align="end" sideOffset={10}>
              <DropdownMenuLabel className="font-normal text-foreground">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={() => navigate('/dashboard/settings')}
                className="cursor-pointer focus:bg-accent focus:text-accent-foreground transition-colors duration-200"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                onClick={() => navigate('/login')} 
                className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground transition-colors duration-200 text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
