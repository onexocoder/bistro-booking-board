
import React, { useState } from 'react';
import { restaurantConfig as initialConfig } from '@/data/mockData';
import { RestaurantConfig, RestaurantTheme } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const AdminSettings: React.FC = () => {
  const [config, setConfig] = useState<RestaurantConfig>(initialConfig);
  const { theme, updateTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<RestaurantTheme>(theme);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  
  const predefinedThemes = [
    {
      name: 'Bistro Clássico',
      theme: {
        primaryColor: '#8B0000', // Bordô
        secondaryColor: '#4E3524', // Marrom
        accentColor: '#F5F5DC', // Creme
        fontFamily: {
          headings: 'Playfair Display',
          body: 'Lato',
        },
      },
    },
    {
      name: 'Contemporâneo',
      theme: {
        primaryColor: '#1A365D', // Azul escuro
        secondaryColor: '#2D3748', // Cinza azulado
        accentColor: '#EDF2F7', // Cinza claro
        fontFamily: {
          headings: 'Montserrat',
          body: 'Roboto',
        },
      },
    },
    {
      name: 'Italiano',
      theme: {
        primaryColor: '#107A46', // Verde
        secondaryColor: '#991B1B', // Vermelho
        accentColor: '#FFF9E6', // Creme claro
        fontFamily: {
          headings: 'Cormorant Garamond',
          body: 'Open Sans',
        },
      },
    },
    {
      name: 'Asiático',
      theme: {
        primaryColor: '#C53030', // Vermelho
        secondaryColor: '#2D3748', // Cinza escuro
        accentColor: '#F0FFF4', // Verde claro
        fontFamily: {
          headings: 'Noto Serif',
          body: 'Noto Sans',
        },
      },
    },
  ];
  
  const handleSaveSettings = () => {
    // Aqui você faria uma chamada para a API para salvar as configurações
    updateTheme(selectedTheme);
    alert('Configurações salvas com sucesso!');
  };
  
  const handleThemeChange = (index: number) => {
    setSelectedTheme(predefinedThemes[index].theme);
  };
  
  const handleCustomThemeChange = (field: keyof RestaurantTheme, value: any) => {
    setSelectedTheme((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Personalize o painel e o site público do seu restaurante
        </p>
      </div>
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="theme">Tema e Aparência</TabsTrigger>
          <TabsTrigger value="capacity">Capacidade</TabsTrigger>
          <TabsTrigger value="integration">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Restaurante</CardTitle>
              <CardDescription>
                Configure as informações básicas do seu estabelecimento que serão exibidas para os clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                <Input
                  id="restaurant-name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="restaurant-logo">URL do Logo</Label>
                <Input
                  id="restaurant-logo"
                  value={config.logoUrl || ''}
                  onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="restaurant-address">Endereço</Label>
                <Input
                  id="restaurant-address"
                  value={config.address}
                  onChange={(e) => setConfig({ ...config, address: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurant-phone">Telefone</Label>
                  <Input
                    id="restaurant-phone"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="restaurant-email">E-mail</Label>
                  <Input
                    id="restaurant-email"
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>
                Configure os horários em que seu restaurante estará aberto para reservas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                  const dayConfig = config.openingHours[day];
                  const isOpen = !('isClosed' in dayConfig);
                  
                  return (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-28">
                        <Label className="capitalize">{day}</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-1">
                        {isOpen ? (
                          <>
                            <Input
                              type="time"
                              value={'open' in dayConfig ? dayConfig.open : '09:00'}
                              onChange={(e) => {
                                const newHours = { ...config.openingHours };
                                newHours[day] = { 
                                  open: e.target.value,
                                  close: 'close' in dayConfig ? dayConfig.close : '18:00'
                                };
                                setConfig({
                                  ...config,
                                  openingHours: newHours,
                                });
                              }}
                              className="w-24"
                            />
                            <span>até</span>
                            <Input
                              type="time"
                              value={'close' in dayConfig ? dayConfig.close : '18:00'}
                              onChange={(e) => {
                                const newHours = { ...config.openingHours };
                                newHours[day] = { 
                                  open: 'open' in dayConfig ? dayConfig.open : '09:00',
                                  close: e.target.value
                                };
                                setConfig({
                                  ...config,
                                  openingHours: newHours,
                                });
                              }}
                              className="w-24"
                            />
                          </>
                        ) : (
                          <span className="text-muted-foreground">Fechado</span>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newHours = { ...config.openingHours };
                          if (isOpen) {
                            newHours[day] = { isClosed: true };
                          } else {
                            newHours[day] = { open: '09:00', close: '18:00' };
                          }
                          setConfig({
                            ...config,
                            openingHours: newHours,
                          });
                        }}
                        size="sm"
                      >
                        {isOpen ? 'Marcar como fechado' : 'Definir horário'}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-bistro-primary hover:bg-bistro-primary/90">
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema Predefinido</CardTitle>
              <CardDescription>
                Escolha um dos temas predefinidos ou personalize conforme sua necessidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {predefinedThemes.map((presetTheme, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border rounded-md overflow-hidden ${
                      JSON.stringify(selectedTheme) === JSON.stringify(presetTheme.theme)
                        ? 'ring-2 ring-primary'
                        : ''
                    }`}
                    onClick={() => handleThemeChange(index)}
                  >
                    <div 
                      className="h-20" 
                      style={{ backgroundColor: presetTheme.theme.primaryColor }}
                    />
                    <div 
                      className="h-10" 
                      style={{ backgroundColor: presetTheme.theme.secondaryColor }}
                    />
                    <div className="p-3 text-center">
                      <span className="text-sm font-medium">{presetTheme.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Personalização de Cores</CardTitle>
              <CardDescription>
                Defina cores personalizadas para o seu tema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex mt-1.5">
                    <Input
                      id="primary-color"
                      type="color"
                      value={selectedTheme.primaryColor}
                      onChange={(e) => handleCustomThemeChange('primaryColor', e.target.value)}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      value={selectedTheme.primaryColor}
                      onChange={(e) => handleCustomThemeChange('primaryColor', e.target.value)}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex mt-1.5">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={selectedTheme.secondaryColor}
                      onChange={(e) => handleCustomThemeChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      value={selectedTheme.secondaryColor}
                      onChange={(e) => handleCustomThemeChange('secondaryColor', e.target.value)}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Cor de Destaque</Label>
                  <div className="flex mt-1.5">
                    <Input
                      id="accent-color"
                      type="color"
                      value={selectedTheme.accentColor}
                      onChange={(e) => handleCustomThemeChange('accentColor', e.target.value)}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      value={selectedTheme.accentColor}
                      onChange={(e) => handleCustomThemeChange('accentColor', e.target.value)}
                      className="flex-1 ml-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tipografia</CardTitle>
              <CardDescription>
                Escolha as fontes para títulos e textos do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heading-font">Fonte para Títulos</Label>
                  <select
                    id="heading-font"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-1.5"
                    value={selectedTheme.fontFamily.headings}
                    onChange={(e) => {
                      handleCustomThemeChange('fontFamily', {
                        ...selectedTheme.fontFamily,
                        headings: e.target.value,
                      });
                    }}
                  >
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Cormorant Garamond">Cormorant Garamond</option>
                    <option value="Noto Serif">Noto Serif</option>
                    <option value="Merriweather">Merriweather</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="body-font">Fonte para Textos</Label>
                  <select
                    id="body-font"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-1.5"
                    value={selectedTheme.fontFamily.body}
                    onChange={(e) => {
                      handleCustomThemeChange('fontFamily', {
                        ...selectedTheme.fontFamily,
                        body: e.target.value,
                      });
                    }}
                  >
                    <option value="Lato">Lato</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Noto Sans">Noto Sans</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-bold" style={{ fontFamily: selectedTheme.fontFamily.headings }}>
                    Visualização de Título
                  </h3>
                  <p style={{ fontFamily: selectedTheme.fontFamily.body }}>
                    Este é um exemplo de como o texto vai aparecer no seu site com as fontes selecionadas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-bistro-primary hover:bg-bistro-primary/90">
              Aplicar Tema
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="capacity" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Capacidade</CardTitle>
              <CardDescription>
                Configure a capacidade do restaurante e limite de reservas por horário.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-tables">Total de Mesas</Label>
                    <Input
                      id="total-tables"
                      type="number"
                      min="1"
                      value={config.capacity.tables}
                      onChange={(e) => setConfig({
                        ...config,
                        capacity: {
                          ...config.capacity,
                          tables: parseInt(e.target.value)
                        }
                      })}
                      className="mt-1.5"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Número total de mesas disponíveis no restaurante.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="max-reservations">Máximo de Reservas por Horário</Label>
                    <Input
                      id="max-reservations"
                      type="number"
                      min="1"
                      value={config.capacity.maxReservationsPerSlot}
                      onChange={(e) => setConfig({
                        ...config,
                        capacity: {
                          ...config.capacity,
                          maxReservationsPerSlot: parseInt(e.target.value)
                        }
                      })}
                      className="mt-1.5"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Número máximo de reservas permitidas em cada horário.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-bistro-primary hover:bg-bistro-primary/90">
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações e Notificações</CardTitle>
              <CardDescription>
                Configure como deseja receber notificações de novas reservas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="webhook-url">URL do Webhook (Zapier, Make, etc)</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://hooks.zapier.com/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Use webhooks para integrar com ferramentas como Zapier e Make para notificações.
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Obter notificações via:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-push" className="rounded" defaultChecked />
                    <Label htmlFor="notify-push">Notificações Push (Navegador)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-email" className="rounded" defaultChecked />
                    <Label htmlFor="notify-email">E-mail</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-webhook" className="rounded" />
                    <Label htmlFor="notify-webhook">Webhook</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API para Integração</CardTitle>
              <CardDescription>
                Utilize nossa API para integrar com seu sistema existente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md">
                <code className="text-sm">
                  <pre className="whitespace-pre-wrap">
{`// Exemplo de como chamar nossa API (REST)
fetch('https://api.bistroboard.com/v1/reservations', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                  </pre>
                </code>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Para obter sua API Key, entre em contato com o suporte.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-bistro-primary hover:bg-bistro-primary/90">
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
