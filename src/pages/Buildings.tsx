import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Building {
  id: number;
  name: string;
  floors: number;
  totalSlots: number;
  occupied: number;
}

interface FormData {
  name: string;
  floors: string;
  totalSlots: string;
  occupied: string;
}

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([
    { id: 1, name: "Building A", floors: 5, totalSlots: 100, occupied: 75 },
    { id: 2, name: "Building B", floors: 3, totalSlots: 60, occupied: 45 },
    { id: 3, name: "Building C", floors: 7, totalSlots: 150, occupied: 120 },
  ]);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>({ id: 0, name: "", floors: 0, totalSlots: 0, occupied: 0 });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(0);

  const [formData, setFormData] = useState<FormData>({ name: "", floors: "", totalSlots: "", occupied: "0" });

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.floors || !formData.totalSlots) return;

    const newBuilding: Building = {
      id: isEdit ? selectedBuilding.id : Date.now(),
      name: formData.name,
      floors: parseInt(formData.floors),
      totalSlots: parseInt(formData.totalSlots),
      occupied: parseInt(formData.occupied),
    };

    if (isEdit) {
      setBuildings(buildings.map(b => b.id === selectedBuilding.id ? newBuilding : b));
    } else {
      setBuildings([...buildings, newBuilding]);
    }

    setOpen(false);
    setIsEdit(false);
    setFormData({ name: "", floors: "", totalSlots: "", occupied: "0" });
  };

  const handleEdit = (building: Building) => {
    setIsEdit(true);
    setSelectedBuilding(building);
    setFormData({
      name: building.name,
      floors: building.floors.toString(),
      totalSlots: building.totalSlots.toString(),
      occupied: building.occupied.toString(),
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setBuildingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setBuildings(buildings.filter(b => b.id !== buildingToDelete));
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Buildings</h1>
      </div>
      <Card className="border-border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span>Building Overview</span>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="transition-all duration-200 hover:scale-105">
                  Add Building
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border shadow-elevated max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEdit ? "Edit Building" : "Add Building"}</DialogTitle>
                  <DialogDescription>
                    {isEdit ? "Update the building details below." : "Enter the new building details."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddOrEdit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Building Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Building D"
                      className="transition-shadow duration-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      name="floors"
                      type="number"
                      value={formData.floors}
                      onChange={handleInputChange}
                      placeholder="e.g., 4"
                      className="transition-shadow duration-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSlots">Total Slots</Label>
                    <Input
                      id="totalSlots"
                      name="totalSlots"
                      type="number"
                      value={formData.totalSlots}
                      onChange={handleInputChange}
                      placeholder="e.g., 80"
                      className="transition-shadow duration-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupied">Occupied Slots (default 0)</Label>
                    <Input
                      id="occupied"
                      name="occupied"
                      type="number"
                      value={formData.occupied}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="transition-shadow duration-200 focus-visible:ring-primary"
                      min="0"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="transition-all duration-200 hover:scale-105">
                      {isEdit ? "Update" : "Add"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Manage and view building slot allocations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Floors</TableHead>
                <TableHead>Total Slots</TableHead>
                <TableHead>Occupied</TableHead>
                <TableHead>Occupancy %</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buildings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No buildings found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                buildings.map((building) => (
                  <TableRow key={building.id} className="transition-colors hover:bg-muted/50">
                    <TableCell className="font-medium">{building.name}</TableCell>
                    <TableCell>{building.floors}</TableCell>
                    <TableCell>{building.totalSlots}</TableCell>
                    <TableCell>{building.occupied}</TableCell>
                    <TableCell className="text-primary">
                      {((building.occupied / building.totalSlots) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 transition-all duration-200 hover:scale-105">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border shadow-elevated">
                          <DropdownMenuItem
                            onClick={() => handleEdit(building)}
                            className="cursor-pointer focus:bg-accent focus:text-accent-foreground transition-colors duration-200"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(building.id)}
                            className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground transition-colors duration-200 text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent className="bg-card border-border shadow-elevated">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the building from the list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="transition-all duration-200 hover:scale-105">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-destructive text-destructive-foreground transition-all duration-200 hover:scale-105"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default Buildings;
