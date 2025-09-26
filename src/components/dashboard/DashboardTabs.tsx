import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Clock, Download, Building2, Users, Calendar } from "lucide-react";

const vehicleStatsData = [
  { hour: '6AM', entries: 5, exits: 2 },
  { hour: '8AM', entries: 15, exits: 3 },
  { hour: '10AM', entries: 25, exits: 8 },
  { hour: '12PM', entries: 30, exits: 12 },
  { hour: '2PM', entries: 35, exits: 18 },
  { hour: '4PM', entries: 20, exits: 25 },
  { hour: '6PM', entries: 8, exits: 30 },
  { hour: '8PM', entries: 3, exits: 15 },
];

const buildingData = [
  { name: 'Building A', value: 35, color: 'hsl(var(--parking-blue))' },
  { name: 'Building B', value: 25, color: 'hsl(var(--parking-teal))' },
  { name: 'Building C', value: 20, color: 'hsl(var(--parking-purple))' },
  { name: 'Building D', value: 15, color: 'hsl(var(--parking-orange))' },
  { name: 'Building E', value: 5, color: 'hsl(var(--parking-green))' },
];

const liveFeedData = [
  { gate: 'Main In', vehicle: 'None', status: 'Available', duration: 'N/A' },
  { gate: 'Main Out', vehicle: 'None', status: 'Available', duration: 'N/A' },
  { gate: 'B1 In', vehicle: 'None', status: 'Available', duration: 'N/A' },
  { gate: 'B1 Out', vehicle: 'None', status: 'Available', duration: 'N/A' },
  { gate: 'B2 In', vehicle: 'None', status: 'Available', duration: 'N/A' },
  { gate: 'B2 Out', vehicle: 'None', status: 'Available', duration: 'N/A' },
];

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="bg-gradient-card border-border">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader className="pb-3">
          <TabsList className="grid w-full grid-cols-5 bg-muted/20">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="day-wise" className="text-xs">Day-Wise Stats</TabsTrigger>
            <TabsTrigger value="live-feed" className="text-xs">Live Feed</TabsTrigger>
            <TabsTrigger value="building-info" className="text-xs">Building Info</TabsTrigger>
            <TabsTrigger value="tenants" className="text-xs">Tenants/Buildings</TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <TabsContent value="overview" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-parking-green" />
                  Vehicle Statistics
                </h3>
                <Badge variant="outline" className="bg-muted/50">
                  Today: September 25, 2024
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-foreground">Total Entries</h4>
                      <TrendingUp className="h-4 w-4 text-parking-green" />
                    </div>
                    <div className="text-3xl font-bold text-parking-green mb-2">89</div>
                    <p className="text-sm text-muted-foreground">Today, September 25, 2025</p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-foreground">Total Exits</h4>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="text-3xl font-bold text-destructive mb-2">35</div>
                    <p className="text-sm text-muted-foreground">Today, September 25, 2025</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/20">
                <CardHeader>
                  <CardTitle className="text-foreground">Traffic Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vehicleStatsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="entries" stroke="hsl(var(--parking-green))" strokeWidth={2} />
                        <Line type="monotone" dataKey="exits" stroke="hsl(var(--destructive))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="day-wise" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Vehicle Hourly Time-Stats
                </h3>
                <Button variant="outline" className="bg-parking-green text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Excel
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-muted/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
                    <p className="text-2xl font-bold text-parking-green">89</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Exits</p>
                    <p className="text-2xl font-bold text-destructive">35</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Peak Hour</p>
                    <p className="text-lg font-bold text-accent">2:00 PM - 3:00 PM</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/20">
                <CardContent className="p-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vehicleStatsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="entries" stroke="hsl(var(--parking-green))" strokeWidth={3} />
                        <Line type="monotone" dataKey="exits" stroke="hsl(var(--destructive))" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="live-feed" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Live Gate Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveFeedData.map((feed, index) => (
                  <Card key={index} className="bg-muted/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{feed.gate}</h4>
                        <Badge variant="outline" className="bg-parking-green text-white">
                          {feed.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          Vehicle: <span className="text-foreground">{feed.vehicle}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Duration: <span className="text-foreground">{feed.duration}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="building-info" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-parking-blue" />
                Building Distribution
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-muted/20">
                  <CardHeader>
                    <CardTitle className="text-foreground">Building Capacity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={buildingData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {buildingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {buildingData.map((building, index) => (
                    <Card key={index} className="bg-muted/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-foreground">{building.name}</span>
                          <span className="text-sm text-muted-foreground">{building.value}% capacity</span>
                        </div>
                        <Progress value={building.value} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tenants" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-parking-purple" />
                Tenants & Buildings Management
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Building A', 'Building B', 'Building C', 'Building D', 'Building E'].map((building, index) => (
                  <Card key={index} className="bg-muted/20">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground mb-3">{building}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Tenants:</span>
                          <span className="text-foreground font-medium">{12 + index * 3}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Slots:</span>
                          <span className="text-parking-green font-medium">{25 + index * 5}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Available:</span>
                          <span className="text-accent font-medium">{5 + index * 2}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}