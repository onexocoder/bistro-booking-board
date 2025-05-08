
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardStats, reservations, menuItems } from '@/data/mockData';
import { Users, Calendar, MenuIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminDashboard: React.FC = () => {
  const stats = getDashboardStats();
  const upcomingReservations = reservations.filter(r => {
    const resDate = new Date(r.date);
    resDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return resDate.getTime() >= today.getTime() && r.status === 'confirmed';
  }).slice(0, 5);

  const dailySpecials = menuItems.filter(item => item.isDailySpecial).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle. Confira os dados do dia.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalReservationsToday}</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mesas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.availableTables}</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mesas Reservadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalTablesBooked}</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximas Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.upcomingReservations}</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-playfair">Próximas Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReservations.length > 0 ? (
                upcomingReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{reservation.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(reservation.date), "dd 'de' MMMM", { locale: ptBR })} • {reservation.time}
                      </p>
                      <p className="text-sm">
                        {reservation.partySize.adults + reservation.partySize.children} pessoas • {reservation.tableCount} {reservation.tableCount > 1 ? 'mesas' : 'mesa'}
                      </p>
                    </div>
                    <div>
                      <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                        {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Nenhuma reserva próxima.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-playfair">Menu do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailySpecials.length > 0 ? (
                dailySpecials.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="font-medium text-primary">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.price)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Nenhum item especial configurado para hoje.</p>
              )}
              <div className="pt-2">
                <a href="/admin/menu" className="text-primary hover:underline text-sm font-medium">
                  Gerenciar menu do dia →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
