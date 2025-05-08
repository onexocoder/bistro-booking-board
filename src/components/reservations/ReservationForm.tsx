
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { restaurantConfig, getAvailableTimeSlots } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const ReservationForm: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState({ adults: 2, children: 0 });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const timeSlots = getAvailableTimeSlots();
  const { toast } = useToast();
  
  const totalGuests = partySize.adults + partySize.children;
  const estimatedTableCount = Math.ceil(totalGuests / 4);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário.",
        variant: "destructive",
      });
      return;
    }
    
    if (!name || !email || !phone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha seus dados de contato.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulando uma requisição
    setTimeout(() => {
      toast({
        title: "Sucesso!",
        description: "Sua reserva foi enviada. Em breve entraremos em contato para confirmação.",
      });
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">Faça sua Reserva</CardTitle>
        <CardDescription>
          Reserve sua mesa no {restaurantConfig.name}. Recomendamos reservas com pelo menos 2 horas de antecedência.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Data da Reserva</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label>Horário</Label>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    type="button"
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={cn(
                      "h-9",
                      !slot.isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adults">Adultos</Label>
                <div className="flex items-center mt-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setPartySize(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{partySize.adults}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setPartySize(prev => ({ ...prev, adults: Math.min(20, prev.adults + 1) }))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="children">Crianças</Label>
                <div className="flex items-center mt-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setPartySize(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{partySize.children}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setPartySize(prev => ({ ...prev, children: Math.min(10, prev.children + 1) }))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Total: {totalGuests} pessoas</span>
              </div>
              <div>
                <span className="text-sm">Mesas estimadas: {estimatedTableCount}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  className="mt-1.5"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="requests">Solicitações especiais (opcional)</Label>
              <Textarea
                id="requests"
                placeholder="Se precisar de cadeirinhas para crianças, preferências de mesa, etc."
                className="mt-1.5"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-bistro-primary hover:bg-bistro-primary/90" disabled={isLoading}>
            {isLoading ? "Processando..." : "Confirmar Reserva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
