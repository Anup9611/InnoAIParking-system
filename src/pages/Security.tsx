import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield } from "lucide-react";

const Security: React.FC = () => {
  const alertsData = [
    { id: 1, time: "2023-10-01 08:30", type: "Unauthorized Access", description: "Attempted entry at gate 2", status: "Resolved" },
    { id: 2, time: "2023-10-01 10:15", type: "Vehicle Mismatch", description: "License plate not matching tenant", status: "Pending" },
    { id: 3, time: "2023-10-01 14:20", type: "System Alert", description: "Camera offline in building A", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Security</h1>
      </div>
      <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Alerts
          </CardTitle>
          <CardDescription>Monitor and manage security incidents.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertsData.map((alert) => (
                <TableRow key={alert.id} className="transition-colors hover:bg-muted/50">
                  <TableCell>{alert.time}</TableCell>
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === "Resolved" 
                        ? "bg-green-100 text-green-800" 
                        : alert.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {alert.status}
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

export default Security;
