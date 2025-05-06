
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SalesRep } from '../types';
import ProgressBar from './ProgressBar';
import { formatCurrency } from '../utils/mockData';
import { Star, Award, Medal } from 'lucide-react';

interface LeaderboardTableProps {
  salesReps: SalesRep[];
  onSelectRep: (id: string) => void;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ salesReps, onSelectRep }) => {
  // Sort reps by percentage completion (highest to lowest)
  const sortedReps = [...salesReps].sort((a, b) => {
    const percentA = (a.currentSales / a.weeklyGoal) * 100;
    const percentB = (b.currentSales / b.weeklyGoal) * 100;
    return percentB - percentA;
  });

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="text-yellow-500 mr-1" />;
      case 2:
        return <Medal className="text-gray-400 mr-1" />;
      case 3:
        return <Medal className="text-amber-700 mr-1" />;
      default:
        return <span className="w-5 inline-block text-center">{rank}.</span>;
    }
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Rep</TableHead>
            <TableHead className="w-1/3">Progress</TableHead>
            <TableHead className="text-right">Sales / Weekly Target</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReps.map((rep, index) => {
            const percentage = Math.round((rep.currentSales / rep.weeklyGoal) * 100);
            return (
              <TableRow 
                key={rep.id}
                className={`CZK{percentage >= 100 ? 'bg-green-50' : ''}`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {getRankIcon(index + 1)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{rep.name}</div>
                </TableCell>
                <TableCell>
                  <ProgressBar 
                    value={rep.currentSales} 
                    max={rep.weeklyGoal} 
                    animate={false}
                    showPercentage={false}
                  />
                  <div className="text-xs mt-1">{percentage}%</div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-medium">{formatCurrency(rep.currentSales)}</span>
                  <span className="text-muted-foreground"> / {formatCurrency(rep.weeklyGoal)}</span>
                </TableCell>
                <TableCell>
                  <button 
                    onClick={() => onSelectRep(rep.id)}
                    className="text-xs px-2 py-1 bg-primary/80 text-white rounded hover:bg-primary transition-colors"
                  >
                    Update
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

// Create a Trophy component since it's not available in lucide-react
const Trophy: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default LeaderboardTable;
