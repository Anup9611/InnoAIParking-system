import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const Reports: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<string>("month");

  const reports = [
    { id: 1, title: "Occupancy Report", description: "Monthly parking slot occupancy statistics", type: "PDF" },
    { id: 2, title: "Tenant Report", description: "Detailed tenant information and lease status", type: "Excel" },
    { id: 3, title: "Security Report", description: "Security incidents and access logs", type: "PDF" },
    { id: 4, title: "Entry Gate Report", description: "Vehicle entry and exit records", type: "CSV" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
      </div>

      {/* Date & Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Calendar Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-background text-foreground border-border hover:bg-muted"
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "PP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-background text-foreground border border-border rounded-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-background text-foreground"
            />
          </PopoverContent>
        </Popover>

        {/* Select Filter */}
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] bg-background text-foreground border-border">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground border border-border">
            <SelectItem value="day" className="hover:bg-primary hover:text-primary-foreground">
              Day-wise
            </SelectItem>
            <SelectItem value="month" className="hover:bg-primary hover:text-primary-foreground">
              Month-wise
            </SelectItem>
            <SelectItem value="year" className="hover:bg-primary hover:text-primary-foreground">
              Year-wise
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Generate Button */}
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Generate {filter.charAt(0).toUpperCase() + filter.slice(1)} Report
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="border-border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
          >
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
