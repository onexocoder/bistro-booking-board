
import { MenuItem, MenuCategory, Reservation, RestaurantConfig, Notification } from '@/types';

// Menu do restaurante
export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Bruschetta de Tomate e Manjericão',
    description: 'Pão italiano grelhado coberto com tomates frescos, manjericão, alho e azeite extra virgem.',
    price: 19.90,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
    category: 'appetizer',
    isAvailable: true,
    isDailySpecial: false,
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
  },
  {
    id: '2',
    name: 'Risoto de Funghi',
    description: 'Arroz arbóreo cremoso com mix de cogumelos selvagens, vinho branco, manteiga e parmesão.',
    price: 47.90,
    imageUrl: 'https://images.unsplash.com/photo-1633352615955-f0c99e8b7e5f',
    category: 'main',
    isAvailable: true,
    isDailySpecial: true,
    validUntil: new Date(new Date().setHours(23, 59, 59)),
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
    },
  },
  {
    id: '3',
    name: 'Filé Mignon ao Molho Madeira',
    description: 'Filé mignon grelhado, acompanhado de molho madeira, purê de batatas e legumes da estação.',
    price: 69.90,
    imageUrl: 'https://images.unsplash.com/photo-1546833998-877b37c2e4c6',
    category: 'main',
    isAvailable: true,
    isDailySpecial: false,
  },
  {
    id: '4',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Tradicional cheesecake de cream cheese com base de biscoito, coberto com calda de frutas vermelhas.',
    price: 24.90,
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    category: 'dessert',
    isAvailable: true,
    isDailySpecial: true,
    validUntil: new Date(new Date().setHours(23, 59, 59)),
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
  },
  {
    id: '5',
    name: 'Vinho Tinto Cabernet Sauvignon',
    description: 'Vinho tinto seco, encorpado, com notas de frutas vermelhas e especiarias.',
    price: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78a0b98',
    category: 'drink',
    isAvailable: true,
    isDailySpecial: false,
  },
];

// Reservas
export const reservations: Reservation[] = [
  {
    id: '1',
    customerName: 'João Silva',
    customerEmail: 'joao.silva@email.com',
    customerPhone: '(11) 99999-8888',
    date: new Date(),
    time: '19:30',
    partySize: {
      adults: 2,
      children: 0,
    },
    tableCount: 1,
    status: 'confirmed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: '2',
    customerName: 'Maria Oliveira',
    customerEmail: 'maria.oliveira@email.com',
    customerPhone: '(11) 97777-6666',
    date: new Date(),
    time: '20:00',
    partySize: {
      adults: 4,
      children: 2,
    },
    tableCount: 2,
    specialRequests: 'Precisamos de 2 cadeirinhas para crianças.',
    status: 'confirmed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '3',
    customerName: 'Carlos Santos',
    customerEmail: 'carlos.santos@email.com',
    customerPhone: '(11) 95555-4444',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '13:30',
    partySize: {
      adults: 6,
      children: 0,
    },
    tableCount: 2,
    specialRequests: 'Mesa próxima à janela, se possível.',
    status: 'pending',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
  },
];

// Configuração do restaurante
export const restaurantConfig: RestaurantConfig = {
  name: 'Bistro Gourmet',
  logoUrl: '/logo-placeholder.png',
  address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  phone: '(11) 3333-4444',
  email: 'contato@bistrogourmet.com',
  openingHours: {
    monday: { open: '11:30', close: '22:00' },
    tuesday: { open: '11:30', close: '22:00' },
    wednesday: { open: '11:30', close: '22:00' },
    thursday: { open: '11:30', close: '22:00' },
    friday: { open: '11:30', close: '23:00' },
    saturday: { open: '11:30', close: '23:00' },
    sunday: { open: '12:00', close: '16:00' },
  },
  capacity: {
    tables: 20,
    maxReservationsPerSlot: 4,
  },
  theme: {
    primaryColor: '#8B0000', // Bordô
    secondaryColor: '#4E3524', // Marrom
    accentColor: '#F5F5DC', // Creme
    fontFamily: {
      headings: 'Playfair Display',
      body: 'Lato',
    },
  },
};

// Notificações
export const notifications: Notification[] = [
  {
    id: '1',
    type: 'reservation',
    message: 'Nova reserva para hoje às 19:30 - João Silva (2 pessoas)',
    isRead: false,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 1)),
    data: {
      reservationId: '1',
    },
  },
  {
    id: '2',
    type: 'reservation',
    message: 'Nova reserva para hoje às 20:00 - Maria Oliveira (6 pessoas)',
    isRead: true,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    data: {
      reservationId: '2',
    },
  },
  {
    id: '3',
    type: 'menu',
    message: 'Item do menu "Risoto de Funghi" adicionado ao Menu do Dia',
    isRead: false,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
    data: {
      menuItemId: '2',
    },
  },
  {
    id: '4',
    type: 'system',
    message: 'O restaurante está próximo da capacidade máxima para hoje às 20:00',
    isRead: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
];

// Função para calcular estatísticas do dashboard
export const getDashboardStats = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const reservationsToday = reservations.filter(res => {
    const resDate = new Date(res.date);
    resDate.setHours(0, 0, 0, 0);
    return resDate.getTime() === today.getTime() && res.status !== 'cancelled';
  });
  
  const tablesBooked = reservationsToday.reduce((total, res) => total + res.tableCount, 0);
  const availableTables = restaurantConfig.capacity.tables - tablesBooked;
  
  const upcomingReservations = reservations.filter(res => {
    const resDate = new Date(res.date);
    resDate.setHours(0, 0, 0, 0);
    return resDate.getTime() >= today.getTime() && res.status === 'confirmed';
  }).length;
  
  return {
    totalReservationsToday: reservationsToday.length,
    availableTables,
    totalTablesBooked: tablesBooked,
    upcomingReservations,
  };
};

// Time slots para reservas
export const getAvailableTimeSlots = () => {
  const slots = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', 
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  
  // Simular disponibilidade para cada slot
  return slots.map(time => {
    const reservationsCount = reservations.filter(res => 
      res.time === time && res.status !== 'cancelled'
    ).length;
    
    const isAvailable = reservationsCount < restaurantConfig.capacity.maxReservationsPerSlot;
    
    return {
      time,
      isAvailable,
      remainingTables: Math.max(0, restaurantConfig.capacity.tables - reservationsCount)
    };
  });
};

// Helper para gerar IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
