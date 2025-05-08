
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { restaurantConfig, menuItems } from '@/data/mockData';
import MenuItemCard from '@/components/menu/MenuItemCard';

const Index: React.FC = () => {
  // Mostrar apenas os pratos especiais do dia
  const dailySpecials = menuItems.filter(item => item.isDailySpecial);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-bistro-dark/50 z-10"></div>
        <div 
          className="h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974')" }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-center mb-4">
            {restaurantConfig.name}
          </h1>
          <p className="text-lg md:text-xl max-w-lg text-center mb-8">
            Experimente nossa gastronomia de alta qualidade em um ambiente acolhedor e exclusivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-bistro-primary hover:bg-bistro-primary/90">
              <Link to="/menu">Ver Menu do Dia</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-bistro-dark">
              <Link to="/reservations">Reservar Mesa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Menu do Dia Preview */}
      <section className="py-16 px-4 bg-bistro-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-2">Menu do Dia</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira nossas especialidades selecionadas pelo chef para o cardápio de hoje.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailySpecials.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-bistro-primary hover:bg-bistro-primary/90">
              <Link to="/menu">Ver Menu Completo</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Sobre o Restaurante */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974" 
                alt="Interior do Restaurante" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Sobre o {restaurantConfig.name}</h2>
              <p className="text-muted-foreground">
                Fundado em 2015, o {restaurantConfig.name} tem se destacado pela excelência em gastronomia e hospitalidade.
                Nossa cozinha combina técnicas tradicionais com toques contemporâneos, utilizando sempre ingredientes frescos e de alta qualidade.
              </p>
              <p className="text-muted-foreground">
                Com um ambiente acolhedor e elegante, oferecemos o cenário perfeito para ocasiões especiais, jantares românticos ou reuniões de negócios.
                Nossa equipe está sempre pronta para proporcionar uma experiência gastronômica memorável.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Conheça Nossa História</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Reservas */}
      <section className="py-16 px-4 bg-bistro-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">Reserve sua Mesa</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Garanta sua experiência gastronômica em nosso restaurante. Faça sua reserva online e receba confirmação imediata.
          </p>
          <Button asChild size="lg" className="bg-white text-bistro-secondary hover:bg-bistro-accent hover:text-bistro-secondary">
            <Link to="/reservations">Fazer Reserva</Link>
          </Button>
        </div>
      </section>
      
      {/* Informações e Contato */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <h3 className="font-playfair text-xl font-semibold mb-3">Endereço</h3>
              <p className="text-muted-foreground">{restaurantConfig.address}</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <h3 className="font-playfair text-xl font-semibold mb-3">Horário</h3>
              <p className="text-muted-foreground">Segunda a Quinta: 11:30 - 22:00</p>
              <p className="text-muted-foreground">Sexta e Sábado: 11:30 - 23:00</p>
              <p className="text-muted-foreground">Domingo: 12:00 - 16:00</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-all">
              <h3 className="font-playfair text-xl font-semibold mb-3">Contato</h3>
              <p className="text-muted-foreground">Telefone: {restaurantConfig.phone}</p>
              <p className="text-muted-foreground">E-mail: {restaurantConfig.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
