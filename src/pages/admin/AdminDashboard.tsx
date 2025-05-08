
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDashboardStats, reservations, menuItems, getAvailableTimeSlots } from '@/data/mockData';
import { 
  Users, Calendar, MenuIcon, TrendingUp, ChevronRight, 
  Clock, BarChart3, Utensils, Percent 
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dados de exemplo para os gráficos
const weeklyData = [
  { name: 'Seg', reservations: 12, revenue: 1800 },
  { name: 'Ter', reservations: 19, revenue: 2400 },
  { name: 'Qua', reservations: 15, revenue: 2100 },
  { name: 'Qui', reservations: 25, revenue: 3500 },
  { name: 'Sex', reservations: 32, revenue: 4200 },
  { name: 'Sáb', reservations: 38, revenue: 5100 },
  { name: 'Dom', reservations: 28, revenue: 3800 },
];

// Dados de ocupação por horário
const occupancyData = getAvailableTimeSlots().map(slot => ({
  time: slot.time,
  occupancy: 100 - (slot.remainingTables / 20 * 100) // Assumindo que o total de mesas é 20
}));

const AdminDashboard: React.FC = () => {
  const stats = getDashboardStats();
  
  // Pega as reservas recentes
  const recentReservations = [...reservations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  const dailySpecials = menuItems.filter(item => item.isDailySpecial);

  // Calculate sales performance (mock data)
  const totalRevenue = weeklyData.reduce((sum, day) => sum + day.revenue, 0);
  const avgRevenuePerReservation = totalRevenue / weeklyData.reduce((sum, day) => sum + day.reservations, 0);
  const topSellingItems = menuItems
    .slice(0, 3)
    .map((item, index) => ({ ...item, sales: 25 - (index * 5) }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel administrativo. Confira os dados do restaurante.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </span>
        </div>
      </div>

      {/* Cards com principais métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              Ocupação Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{Math.round((stats.totalTablesBooked / stats.totalTables) * 100)}%</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalTablesBooked} de {stats.totalTables} mesas ocupadas
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Itens no Menu do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{dailySpecials.length}</div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MenuIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Desempenho Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalRevenue)}
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes seções do dashboard */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>
        
        {/* Tab: Visão Geral */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Reservas recentes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-playfair text-lg">Reservas Recentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReservations.length > 0 ? (
                    recentReservations.map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{reservation.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(reservation.date), "dd 'de' MMMM", { locale: ptBR })} • {reservation.time}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            reservation.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          } font-medium`}>
                            {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                          </div>
                          <span className="text-sm mt-1">
                            {reservation.partySize.adults + reservation.partySize.children} pessoas
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Nenhuma reserva recente.</p>
                  )}
                  
                  <div className="pt-2">
                    <a href="/admin/reservations" className="text-primary hover:underline text-sm font-medium flex items-center">
                      Ver todas reservas
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Menu do Dia */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-playfair text-lg">Menu do Dia</CardTitle>
                <MenuIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailySpecials.length > 0 ? (
                    dailySpecials.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
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
                    <a href="/admin/menu" className="text-primary hover:underline text-sm font-medium flex items-center">
                      Gerenciar menu do dia
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Gráfico de ocupação */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Ocupação por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    occupancy: {
                      label: "Ocupação (%)",
                      color: "#8B0000",
                    }
                  }}
                >
                  <BarChart data={occupancyData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={(props) => (
                      <ChartTooltipContent {...props} />
                    )} />
                    <Bar dataKey="occupancy" fill="#8B0000" name="occupancy" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab: Reservas */}
        <TabsContent value="reservations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Todas as Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Pessoas</TableHead>
                    <TableHead>Mesas</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.slice(0, 5).map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        {reservation.customerName}
                        <div className="text-xs text-muted-foreground">{reservation.customerPhone}</div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>
                        {reservation.partySize.adults + reservation.partySize.children}
                        {reservation.partySize.children > 0 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({reservation.partySize.children} crianças)
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{reservation.tableCount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          reservation.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : reservation.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        } font-medium`}>
                          {reservation.status === 'confirmed' ? 'Confirmada' : 
                           reservation.status === 'pending' ? 'Pendente' : 'Cancelada'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <a href="/admin/reservations" className="text-primary hover:underline text-sm font-medium flex items-center">
                  Gerenciar todas reservas
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab: Menu */}
        <TabsContent value="menu" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Itens do Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Menu do Dia</TableHead>
                    <TableHead>Disponível</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.name}
                        <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                      </TableCell>
                      <TableCell>
                        {item.category === 'appetizer' ? 'Entrada' : 
                         item.category === 'main' ? 'Prato Principal' :
                         item.category === 'dessert' ? 'Sobremesa' : 
                         item.category === 'drink' ? 'Bebida' : 'Especial'}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.price)}
                      </TableCell>
                      <TableCell>
                        {item.isDailySpecial ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                            Sim
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">
                            Não
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.isAvailable ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                            Sim
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">
                            Não
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <a href="/admin/menu" className="text-primary hover:underline text-sm font-medium flex items-center">
                  Gerenciar menu completo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab: Desempenho */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          {/* Gráfico de Desempenho */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Desempenho Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    reservations: {
                      label: "Reservas",
                      color: "#4E3524",
                    },
                    revenue: {
                      label: "Receita (R$)",
                      color: "#8B0000",
                    }
                  }}
                >
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4E3524" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8B0000" />
                    <Tooltip content={(props) => (
                      <ChartTooltipContent {...props} />
                    )} />
                    <Bar dataKey="reservations" fill="#4E3524" yAxisId="left" name="reservations" />
                    <Bar dataKey="revenue" fill="#8B0000" yAxisId="right" name="revenue" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Métricas de Desempenho */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receita Média por Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(avgRevenuePerReservation)}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Percent className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Ocupação Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">78%</div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Crescimento Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">+12%</div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Itens mais vendidos */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Itens Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellingItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.category === 'appetizer' ? 'Entrada' : 
                          item.category === 'main' ? 'Prato Principal' :
                          item.category === 'dessert' ? 'Sobremesa' : 
                          item.category === 'drink' ? 'Bebida' : 'Especial'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.sales} vendidos
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
