import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Download, Building2, Users, Car } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const buildingData = [
  { name: 'Building A', tenantSlots: 25, basementSlots: 15, total: 40 },
  { name: 'Building B', tenantSlots: 18, basementSlots: 12, total: 30 },
  { name: 'Building C', tenantSlots: 12, basementSlots: 8, total: 20 },
  { name: 'Building D', tenantSlots: 22, basementSlots: 18, total: 40 },
  { name: 'Building E', tenantSlots: 8, basementSlots: 12, total: 20 },
];

export function BuildingSlotAllocation() {
  const [filterType, setFilterType] = useState("basement");

  const handleDownloadExcel = () => {
    // Simulate Excel download
    console.log("Downloading Excel report...");
  };

  const totalBuildings = buildingData.length;
  const totalTenants = buildingData.reduce((sum, building) => sum + Math.floor(building.tenantSlots * 0.8), 0);
  const totalReservedSlots = buildingData.reduce((sum, building) => sum + building.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Building Slot Allocations</h2>
          <p className="text-muted-foreground">Individual parking slot distribution across buildings</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 bg-muted/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basement">By Basement</SelectItem>
              <SelectItem value="tenant">By Tenant</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleDownloadExcel}
            className="bg-parking-green hover:bg-parking-green/80 text-white border-parking-green"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-primary">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary-foreground" />
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Buildings</p>
                <p className="text-2xl font-bold text-primary-foreground">{totalBuildings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary-foreground" />
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Tenants</p>
                <p className="text-2xl font-bold text-primary-foreground">{totalTenants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-parking-orange">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-white" />
              <div>
                <p className="text-white/80 text-sm">Total Reserved Slots</p>
                <p className="text-2xl font-bold text-white">{totalReservedSlots}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">
            Slot Distribution - {filterType === "basement" ? "Individual Basement Bars" : "Individual Tenant Bars"}
          </CardTitle>
          <p className="text-muted-foreground">
            Each bar represents a unique {filterType === "basement" ? "basement" : "tenant"} in a building
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey={filterType === "basement" ? "basementSlots" : "tenantSlots"}
                  fill="hsl(var(--parking-teal))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}