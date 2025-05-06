
import React, { createContext, useContext, useState, ReactNode } from "react";
import { SalesRep } from "../types";
import { initialSalesReps } from "../utils/mockData";

interface SalesContextType {
  salesReps: SalesRep[];
  updateSalesRep: (id: string, updates: Partial<SalesRep>) => void;
  updateGoal: (id: string, newGoal: number) => void;
  updateSales: (id: string, newSales: number) => void;
  selectedRepId: string | null;
  setSelectedRepId: (id: string | null) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [salesReps, setSalesReps] = useState<SalesRep[]>(initialSalesReps);
  const [selectedRepId, setSelectedRepId] = useState<string | null>(null);

  const updateSalesRep = (id: string, updates: Partial<SalesRep>) => {
    setSalesReps(prevReps =>
      prevReps.map(rep =>
        rep.id === id
          ? { ...rep, ...updates, lastUpdated: new Date().toISOString() }
          : rep
      )
    );
  };

  const updateGoal = (id: string, newGoal: number) => {
    updateSalesRep(id, { weeklyGoal: newGoal });
  };

  const updateSales = (id: string, newSales: number) => {
    updateSalesRep(id, { currentSales: newSales });
  };

  return (
    <SalesContext.Provider
      value={{
        salesReps,
        updateSalesRep,
        updateGoal,
        updateSales,
        selectedRepId,
        setSelectedRepId
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = (): SalesContextType => {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};
