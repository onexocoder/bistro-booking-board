
import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantConfig } from '@/data/mockData';
import { Mail, Phone } from 'lucide-react';

const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-bistro-secondary text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">{restaurantConfig.name}</h3>
            <p className="text-bistro-accent/90 mb-4">
              {restaurantConfig.address}
            </p>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2" />
              <span>{restaurantConfig.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{restaurantConfig.email}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Horário de Funcionamento</h3>
            <div className="space-y-1 text-bistro-accent/90">
              <p>Segunda a Quinta: 11:30 - 22:00</p>
              <p>Sexta e Sábado: 11:30 - 23:00</p>
              <p>Domingo: 12:00 - 16:00</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-bistro-accent/90">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Menu do Dia
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-white transition-colors">
                  Reservar Mesa
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sobre o Restaurante
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Área do Administrador
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-bistro-accent/30 text-center text-bistro-accent/70">
          <p>© {new Date().getFullYear()} {restaurantConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
