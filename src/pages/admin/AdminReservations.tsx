
import React, { useState } from 'react';
import { reservations as initialReservations } from '@/data/mockData';
import { Reservation, ReservationStatus } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | 'all'>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Filtrar reservas
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerPhone.includes(searchQuery);
    
    const matchesDate = selectedDate
      ? new Date(reservation.date).setHours(0, 0, 0, 0) === new Date(selectedDate).setHours(0, 0, 0, 0)
      : true;
    
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });
  
  // Ordenar reservas por data/hora
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const dateA = new Date(a.date).setHours(0, 0, 0, 0);
    const dateB = new Date(b.date).setHours(0, 0, 0, 0);
    
    if (dateA !== dateB) return dateA - dateB;
    
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    
    if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
    return timeA[1] - timeB[1];
  });
  
  // Atualizar status da reserva
  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
    
    if (selectedReservation?.id === id) {
      setSelectedReservation(prev => prev ? { ...prev, status } : null);
    }
  };
  
  // Status badge com cores diferentes
  const getStatusBadge = (status: ReservationStatus) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    
    switch (status) {
      case 'confirmed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Confirmada</span>;
      case 'pending':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>Pendente</span>;
      case 'cancelled':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelada</span>;
      case 'completed':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Concluída</span>;
      default:
        return null;
    }
  };
  
  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };
  
  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDate(undefined);
    setSelectedStatus('all');
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold">Reservas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie e acompanhe todas as reservas do seu restaurante
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "dd 'de' MMM, yyyy", { locale: ptBR })
              ) : (
                <span>Filtrar por data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start">
              <span>Status: {selectedStatus === 'all' ? 'Todos' : 
                selectedStatus === 'confirmed' ? 'Confirmadas' :
                selectedStatus === 'pending' ? 'Pendentes' :
                selectedStatus === 'cancelled' ? 'Canceladas' : 'Concluídas'
              }</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedStatus('all')}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('confirmed')}>
              Confirmadas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('pending')}>
              Pendentes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('cancelled')}>
              Canceladas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('completed')}>
              Concluídas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" onClick={clearFilters} size="sm">
          Limpar filtros
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Data e Hora</TableHead>
              <TableHead className="hidden md:table-cell">Pessoas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReservations.length > 0 ? (
              sortedReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{reservation.customerName}</p>
                      <p className="text-sm text-muted-foreground">{reservation.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{format(new Date(reservation.date), 'dd/MM/yyyy')}</p>
                      <p className="text-sm text-muted-foreground">{reservation.time}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p>{reservation.partySize.adults + reservation.partySize.children} pessoas</p>
                    <p className="text-sm text-muted-foreground">{reservation.tableCount} {reservation.tableCount > 1 ? 'mesas' : 'mesa'}</p>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(reservation.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {format(new Date(reservation.createdAt), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Ações <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleViewDetails(reservation)}>
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, 'confirmed')}>
                          Confirmar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, 'completed')}>
                          Marcar como concluída
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, 'cancelled')}>
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma reserva encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Detalhes da Reserva */}
      {selectedReservation && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes da Reserva</DialogTitle>
              <DialogDescription>
                Reserva #{selectedReservation.id.slice(0, 8)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
                  <p className="font-medium">{selectedReservation.customerName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div className="py-1">{getStatusBadge(selectedReservation.status)}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Contato</h4>
                <p>{selectedReservation.customerEmail}</p>
                <p>{selectedReservation.customerPhone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
                  <p>{format(new Date(selectedReservation.date), 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Hora</h4>
                  <p>{selectedReservation.time}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Grupo</h4>
                <p>
                  {selectedReservation.partySize.adults} adultos, {selectedReservation.partySize.children} crianças 
                  ({selectedReservation.partySize.adults + selectedReservation.partySize.children} total)
                </p>
                <p>{selectedReservation.tableCount} {selectedReservation.tableCount > 1 ? 'mesas' : 'mesa'}</p>
              </div>
              
              {selectedReservation.specialRequests && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Solicitações Especiais</h4>
                  <p>{selectedReservation.specialRequests}</p>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant={selectedReservation.status === 'confirmed' ? 'secondary' : 'default'}
                  onClick={() => updateReservationStatus(selectedReservation.id, 'confirmed')}
                  disabled={selectedReservation.status === 'confirmed'}
                >
                  Confirmar
                </Button>
                <Button
                  variant={selectedReservation.status === 'cancelled' ? 'secondary' : 'destructive'}
                  onClick={() => updateReservationStatus(selectedReservation.id, 'cancelled')}
                  disabled={selectedReservation.status === 'cancelled'}
                >
                  Cancelar
                </Button>
              </div>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminReservations;
