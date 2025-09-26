import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

const Tenants: React.FC = () => {
  const tenantsData = [
    { id: 1, name: "John Doe", unit: "A-101", contact: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", unit: "B-205", contact: "jane@example.com", status: "Active" },
    { id: 3, name: "Bob Johnson", unit: "C-312", contact: "bob@example.com", status: "Inactive" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
      </div>
      <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tenant Management
          </CardTitle>
          <CardDescription>View and manage tenant information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantsData.map((tenant) => (
                <TableRow key={tenant.id} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.unit}</TableCell>
                  <TableCell>{tenant.contact}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tenant.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {tenant.status}
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

export default Tenants;
