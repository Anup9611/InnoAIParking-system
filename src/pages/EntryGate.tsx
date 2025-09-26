import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DoorOpen } from "lucide-react";

const EntryGate: React.FC = () => {
  const entryLogs = [
    { id: 1, time: "2023-10-01 09:15", vehicle: "ABC-123", tenant: "John Doe", action: "Entry" },
    { id: 2, time: "2023-10-01 10:30", vehicle: "XYZ-456", tenant: "Jane Smith", action: "Exit" },
    { id: 3, time: "2023-10-01 11:45", vehicle: "DEF-789", tenant: "Bob Johnson", action: "Entry" },
  ];

  const stats = {
    entriesToday: 15,
    exitsToday: 12,
    totalVehicles: 27,
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <DoorOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Entry Gate</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Entries Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.entriesToday}</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Exits Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.exitsToday}</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalVehicles}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DoorOpen className="h-5 w-5" />
            Recent Entry Logs
          </CardTitle>
          <CardDescription>Monitor vehicle entries and exits.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entryLogs.map((log) => (
                <TableRow key={log.id} className="transition-colors hover:bg-muted/50">
                  <TableCell>{log.time}</TableCell>
                  <TableCell className="font-medium">{log.vehicle}</TableCell>
                  <TableCell>{log.tenant}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.action === "Entry" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {log.action}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryGate;
