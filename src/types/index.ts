
export interface SalesRep {
  id: string;
  name: string;
  avatar: string;
  weeklyGoal: number;
  currentSales: number;
  lastUpdated: string;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
  progressLevel: "low" | "medium" | "high" | "achieved";
}
