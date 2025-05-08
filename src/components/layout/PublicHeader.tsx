
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { restaurantConfig } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';

const PublicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Menu do Dia', href: '/menu' },
    { label: 'Reservas', href: '/reservations' },
    { label: 'Sobre', href: '/about' },
    { label: 'Contato', href: '/contact' },
  ];

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold">{restaurantConfig.name}</h1>
          </Link>

          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-bistro-primary hover:bg-bistro-primary/90">
              <Link to="/reservations">Reservar Mesa</Link>
            </Button>
          </nav>

          {/* Botão de menu para mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-bistro-primary hover:bg-bistro-primary/90">
                <Link to="/reservations" onClick={() => setIsMenuOpen(false)}>
                  Reservar Mesa
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
