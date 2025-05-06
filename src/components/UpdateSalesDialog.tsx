
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSales } from '../contexts/SalesContext';
import { toast } from './ui/sonner';

interface UpdateSalesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateSalesDialog: React.FC<UpdateSalesDialogProps> = ({ isOpen, onClose }) => {
  const { salesReps, selectedRepId, updateGoal, updateSales } = useSales();
  const selectedRep = salesReps.find(rep => rep.id === selectedRepId);
  
  const [weeklyGoal, setWeeklyGoal] = useState<number>(selectedRep?.weeklyGoal || 0);
  const [currentSales, setCurrentSales] = useState<number>(selectedRep?.currentSales || 0);
  
  // Reset form when selected rep changes
  React.useEffect(() => {
    if (selectedRep) {
      setWeeklyGoal(selectedRep.weeklyGoal);
      setCurrentSales(selectedRep.currentSales);
    }
  }, [selectedRep]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRepId && weeklyGoal >= 0 && currentSales >= 0) {
      updateGoal(selectedRepId, weeklyGoal);
      updateSales(selectedRepId, currentSales);
      toast.success("Sales data updated successfully!");
      onClose();
    }
  };
  
  if (!selectedRep) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Sales for {selectedRep.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weekly-goal" className="text-right">
                Weekly Target
              </Label>
              <Input
                id="weekly-goal"
                type="number"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                className="col-span-3"
                min={0}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-sales" className="text-right">
                Current Sales
              </Label>
              <Input
                id="current-sales"
                type="number"
                value={currentSales}
                onChange={(e) => setCurrentSales(Number(e.target.value))}
                className="col-span-3"
                min={0}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSalesDialog;
