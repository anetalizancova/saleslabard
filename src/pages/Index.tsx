
import React from 'react';
import Dashboard from '../components/Dashboard';
import { SalesProvider } from '../contexts/SalesContext';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  return (
    <SalesProvider>
      <div className="min-h-screen bg-background">
        <Dashboard />
        <Toaster position="top-right" />
      </div>
    </SalesProvider>
  );
};

export default Index;
