import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, RefreshCw } from "lucide-react";

const LiveFeed: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const cameras = [
    { id: 1, name: "Entry Gate Camera", src: "/placeholder.svg" },
    { id: 2, name: "Building A Parking", src: "/placeholder.svg" },
    { id: 3, name: "Building B Parking", src: "/placeholder.svg" },
    { id: 4, name: "Security Booth", src: "/placeholder.svg" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Radio className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Live Feed</h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Monitor live camera feeds in real-time.</p>
        <Button onClick={handleRefresh} disabled={refreshing} className="transition-all duration-200">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? "Refreshing..." : "Refresh Feeds"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="border-border shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{camera.name}</CardTitle>
              <CardDescription>Live video stream</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <img
                  src={camera.src}
                  alt={camera.name}
                  className="w-full h-full object-cover opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
