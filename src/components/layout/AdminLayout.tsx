
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { getDashboardStats } from '@/data/mockData';

const AdminLayout: React.FC = () => {
  const stats = getDashboardStats();
  
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <div className="bg-muted/30 border-b border-border px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Mesas disponíveis:</span>
              <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {stats.availableTables}/{stats.totalTables}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Reservas hoje:</span>
              <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {stats.totalReservationsToday}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Atualizado: {new Date().toLocaleTimeString('pt-BR')}
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
