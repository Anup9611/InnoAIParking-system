import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bike, Car, ArrowUpDown, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  progress: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  available: number;
  occupied: number;
  total: number;
  onClick: () => void;
}

function StatsCard({ title, value, subtitle, progress, icon: Icon, gradient, available, occupied, total, onClick }: StatsCardProps) {
  return (
    <Card 
      className="bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient} shadow-glow-primary group-hover:scale-110 transition-transform`}>
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-2">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {subtitle}
        </p>
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2 bg-muted"
          />
          <div className="flex justify-between text-xs">
            <span className="text-parking-green">Available: {available}</span>
            <span className="text-destructive">Occupied: {occupied}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const stats = [
    {
      id: "4wheeler",
      title: "4-Wheeler Parking",
      value: "37 / 40",
      subtitle: "Real-time availability",
      progress: 92.5,
      icon: Car,
      gradient: "bg-gradient-primary",
      available: 3,
      occupied: 37,
      total: 40,
    },
    {
      id: "2wheeler",
      title: "2-Wheeler Parking", 
      value: "41 / 41",
      subtitle: "Real-time availability",
      progress: 100,
      icon: Bike,
      gradient: "bg-gradient-secondary",
      available: 0,
      occupied: 41,
      total: 41,
    },
    {
      id: "entries",
      title: "Entries & Exits Today",
      value: "124",
      subtitle: "Updated just now",
      progress: 65,
      icon: ArrowUpDown,
      gradient: "bg-parking-teal",
      available: 89,
      occupied: 35,
      total: 124,
    },
  ];

  const getDetailedData = (cardId: string) => {
    const baseData = {
      basement1: { available: 7, occupied: 3, total: 10 },
      basement2: { available: 10, occupied: 0, total: 10 },
    };

    switch (cardId) {
      case "4wheeler":
        return {
          title: "4-Wheeler Parking Details",
          basements: baseData,
          totalCapacity: 40,
        };
      case "2wheeler":
        return {
          title: "2-Wheeler Parking Details", 
          basements: {
            basement1: { available: 5, occupied: 0, total: 5 },
            basement2: { available: 6, occupied: 0, total: 6 },
          },
          totalCapacity: 41,
        };
      case "entries":
        return {
          title: "Today's Traffic Analysis",
          entries: 89,
          exits: 35,
          peakHour: "2:00 PM - 3:00 PM",
          currentInside: 54,
        };
      default:
        return null;
    }
  };

  const detailedData = selectedCard ? getDetailedData(selectedCard) : null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            {...stat}
            onClick={() => setSelectedCard(stat.id)}
          />
        ))}
      </div>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="bg-gradient-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {detailedData?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedCard === "entries" ? (
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-parking-green" />
                      <span className="text-sm font-medium">Total Entries</span>
                    </div>
                    <div className="text-2xl font-bold text-parking-green">{detailedData.entries}</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
                      <span className="text-sm font-medium">Total Exits</span>
                    </div>
                    <div className="text-2xl font-bold text-destructive">{detailedData.exits}</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/20 col-span-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Peak Hour</span>
                    </div>
                    <div className="text-lg font-bold text-accent">{detailedData.peakHour}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Currently inside: {detailedData.currentInside} vehicles
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(detailedData?.basements || {}).map(([basement, data]) => (
                  <Card key={basement} className="bg-muted/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium capitalize">
                          {basement.replace(/(\d+)/, " $1")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((data.occupied / data.total) * 100)}% occupied
                        </span>
                      </div>
                      <Progress value={(data.occupied / data.total) * 100} className="mb-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-parking-green">Available: {data.available}</span>
                        <span className="text-destructive">Occupied: {data.occupied}</span>
                        <span className="text-muted-foreground">Total: {data.total}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}