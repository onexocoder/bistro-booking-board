
// Tipos para itens de menu
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: MenuCategory;
  isAvailable: boolean;
  isDailySpecial: boolean;
  validUntil?: Date;
  dietaryInfo?: {
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
    containsAllergens?: string[];
  };
}

export type MenuCategory = 
  | 'appetizer'
  | 'main'
  | 'dessert'
  | 'drink'
  | 'special';

// Tipos para reservas
export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  time: string;
  partySize: {
    adults: number;
    children: number;
  };
  tableCount: number;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: Date;
}

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

// Tipos para configuração do restaurante
export interface RestaurantConfig {
  name: string;
  logoUrl?: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: { open: string; close: string } | { isClosed: true };
  };
  capacity: {
    tables: number;
    maxReservationsPerSlot: number;
  };
  theme: RestaurantTheme;
}

export interface RestaurantTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: {
    headings: string;
    body: string;
  };
  logo?: {
    url: string;
    width: number;
    height: number;
  };
}

// Tipos para notificações
export interface Notification {
  id: string;
  type: 'reservation' | 'menu' | 'system';
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any;
}

// Tipo para estatísticas do dashboard
export interface DashboardStats {
  totalReservationsToday: number;
  availableTables: number;
  totalTablesBooked: number;
  upcomingReservations: number;
  dailySpecialsSold?: number;
}
