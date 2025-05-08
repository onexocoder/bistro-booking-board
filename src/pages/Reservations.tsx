
import React from 'react';
import ReservationForm from '@/components/reservations/ReservationForm';
import { restaurantConfig } from '@/data/mockData';

const Reservations: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-bistro-dark/60 z-10"></div>
        <div 
          className="h-[300px] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070')" }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center">
            Reservas
          </h1>
        </div>
      </section>
      
      {/* Reservation Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-playfair font-semibold mb-2">Reserve sua Mesa</h2>
            <p className="text-muted-foreground">
              Para garantir uma experiência perfeita, recomendamos que faça sua reserva com antecedência.
              Estamos ansiosos para recebê-lo no {restaurantConfig.name}.
            </p>
          </div>
          
          <ReservationForm />
          
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Informações importantes:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Para grupos com mais de 8 pessoas, entre em contato diretamente pelo telefone: {restaurantConfig.phone}</li>
                <li>As reservas são mantidas por até 15 minutos após o horário marcado</li>
                <li>Em caso de cancelamento, pedimos que nos avise com pelo menos 4 horas de antecedência</li>
                <li>Para eventos e celebrações especiais, consulte nosso menu de eventos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
