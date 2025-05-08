
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Public pages
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminSettings from "./pages/admin/AdminSettings";

// Context
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservations" element={<Reservations />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
