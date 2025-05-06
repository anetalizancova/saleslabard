
import React, { useState } from 'react';
import { useSales } from '../contexts/SalesContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesRepCard from './SalesRepCard';
import LeaderboardTable from './LeaderboardTable';
import UpdateSalesDialog from './UpdateSalesDialog';
import EditSalesRepsDialog from './EditSalesRepsDialog';
import { Trophy, Star, UserCog } from 'lucide-react';
import { Button } from './ui/button';

const Dashboard: React.FC = () => {
  const { salesReps, setSelectedRepId, selectedRepId } = useSales();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditRepsOpen, setIsEditRepsOpen] = useState(false);
  
  const handleSelectRep = (id: string) => {
    setSelectedRepId(id);
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Small delay to prevent visual issues
    setTimeout(() => {
      setSelectedRepId(null);
    }, 300);
  };
  
  const achievedGoalsCount = salesReps.filter(
    rep => (rep.currentSales / rep.weeklyGoal) >= 1
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Laba Sales Sparkle
          </h1>
          <p className="text-gray-500">Tracking and celebrating sales success</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 py-2 px-4 bg-secondary/20 rounded-lg">
            <Trophy className="text-secondary h-5 w-5" />
            <span className="font-semibold">{achievedGoalsCount} of {salesReps.length} targets achieved</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsEditRepsOpen(true)}
          >
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Sales Reps</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="cards">Individual Views</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesReps.map((rep) => (
              <SalesRepCard 
                key={rep.id} 
                salesRep={rep} 
                onSelect={() => handleSelectRep(rep.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <LeaderboardTable 
            salesReps={salesReps}
            onSelectRep={handleSelectRep}
          />
        </TabsContent>
      </Tabs>
      
      <UpdateSalesDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
      />
      
      <EditSalesRepsDialog
        isOpen={isEditRepsOpen}
        onClose={() => setIsEditRepsOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
