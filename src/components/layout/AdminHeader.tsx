
import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { notifications } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AdminHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-6 justify-between">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-10 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notificações</div>
            {notifications.slice(0, 3).map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <p className={`text-sm ${notification.isRead ? 'text-muted-foreground' : 'font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      day: '2-digit', 
                      month: '2-digit' 
                    }).format(notification.createdAt)}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="justify-center font-medium">
              Ver todas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-2 pr-0" size="sm">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AG
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 text-left hidden sm:block">
                  <p className="text-sm font-medium">Admin</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferências</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
