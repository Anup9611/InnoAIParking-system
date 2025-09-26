import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const Reports: React.FC = () => {
  const reports = [
    { id: 1, title: "Occupancy Report", description: "Monthly parking slot occupancy statistics", type: "PDF" },
    { id: 2, title: "Tenant Report", description: "Detailed tenant information and lease status", type: "Excel" },
    { id: 3, title: "Security Report", description: "Security incidents and access logs", type: "PDF" },
    { id: 4, title: "Entry Gate Report", description: "Vehicle entry and exit records", type: "CSV" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="border-border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full transition-all duration-200 hover:bg-primary/90 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download {report.type}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
