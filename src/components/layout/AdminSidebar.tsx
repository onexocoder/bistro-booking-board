
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Menu as MenuIcon, Settings, Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { notifications } from '@/data/mockData';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      path: '/admin',
    },
    {
      icon: <MenuIcon size={20} />,
      label: 'Menu do Dia',
      path: '/admin/menu',
    },
    {
      icon: <Calendar size={20} />,
      label: 'Reservas',
      path: '/admin/reservations',
    },
    {
      icon: <Settings size={20} />,
      label: 'Configurações',
      path: '/admin/settings',
    },
  ];

  return (
    <div className={cn(
      "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="text-sidebar-foreground font-playfair font-bold text-lg">
            Bistro Board
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sidebar-foreground hover:bg-sidebar-accent ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="mt-6 flex-1 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center w-full rounded-md text-sm transition-colors",
            "text-sidebar-foreground hover:bg-sidebar-accent/50",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
        >
          <Bell size={20} />
          {!collapsed && (
            <span className="ml-3 flex-1 text-left">Notificações</span>
          )}
          {unreadNotifications > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadNotifications}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
