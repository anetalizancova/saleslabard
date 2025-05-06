
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { SalesRep } from '../types';
import ProgressBar from './ProgressBar';
import QuoteCard from './QuoteCard';
import Celebration from './Celebration';
import { formatCurrency } from '../utils/mockData';

interface SalesRepCardProps {
  salesRep: SalesRep;
  onSelect: () => void;
}

const SalesRepCard: React.FC<SalesRepCardProps> = ({ salesRep, onSelect }) => {
  const { name, avatar, weeklyGoal, currentSales } = salesRep;
  const progress = (currentSales / weeklyGoal) * 100;
  const isGoalAchieved = progress >= 100;

  return (
    <Card className="overflow-hidden h-full relative animate-slide-up sales-rep-card">
      {isGoalAchieved && <Celebration isActive={isGoalAchieved} />}
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-4">
          <Avatar className={`${isGoalAchieved ? 'border-2 border-green-500' : ''} bg-primary text-white`}>
            <div>{avatar}</div>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="font-medium">Weekly Target: {formatCurrency(weeklyGoal)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-4">
          <ProgressBar value={currentSales} max={weeklyGoal} />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">Current Sales</span>
          <span className="text-lg font-bold">{formatCurrency(currentSales)}</span>
        </div>
        
        <QuoteCard progressPercentage={progress} />
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-muted/50 flex justify-end">
        <button 
          onClick={onSelect}
          className="text-sm px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Update
        </button>
      </CardFooter>
      
      {isGoalAchieved && (
        <div className="absolute top-0 right-0 m-2">
          <div className="animate-float">
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              🏆 Goal Achieved!
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SalesRepCard;
