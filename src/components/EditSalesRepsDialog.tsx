
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSales } from '../contexts/SalesContext';
import { toast } from './ui/sonner';

interface EditSalesRepsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditSalesRepsDialog: React.FC<EditSalesRepsDialogProps> = ({ isOpen, onClose }) => {
  const { salesReps, updateSalesRep } = useSales();
  
  const handleUpdateName = (id: string, newName: string) => {
    if (!newName.trim()) return;
    
    updateSalesRep(id, { 
      name: newName,
      avatar: generateInitials(newName)
    });
  };
  
  const generateInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleSave = () => {
    toast.success("Sales rep names updated!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Sales Representatives</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {salesReps.map((rep) => (
            <div key={rep.id} className="grid grid-cols-6 items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center col-span-1">
                {rep.avatar}
              </div>
              
              <div className="col-span-5">
                <Label htmlFor={`rep-name-${rep.id}`} className="sr-only">
                  Sales Rep Name
                </Label>
                <Input
                  id={`rep-name-${rep.id}`}
                  defaultValue={rep.name}
                  onBlur={(e) => handleUpdateName(rep.id, e.target.value)}
                  placeholder="Enter sales rep name"
                />
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalesRepsDialog;
