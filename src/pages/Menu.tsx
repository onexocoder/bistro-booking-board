
import React, { useState } from 'react';
import { menuItems } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/menu/MenuItemCard';

const Menu: React.FC = () => {
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'daily', label: 'Especiais do Dia' },
    { id: 'appetizer', label: 'Entradas' },
    { id: 'main', label: 'Pratos Principais' },
    { id: 'dessert', label: 'Sobremesas' },
    { id: 'drink', label: 'Bebidas' },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredItems = menuItems.filter(item => {
    if (selectedCategory === 'all') return item.isAvailable;
    if (selectedCategory === 'daily') return item.isDailySpecial && item.isAvailable;
    return item.category === selectedCategory && item.isAvailable;
  });
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-bistro-dark/60 z-10"></div>
        <div 
          className="h-[300px] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=2070')" }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center">
            Nosso Menu
          </h1>
        </div>
      </section>
      
      {/* Menu Selection */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <Tabs 
              defaultValue="all"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <div className="flex justify-center mb-4">
                <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-8">
                  {selectedCategory === 'daily' && (
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-playfair font-semibold">Especiais do Dia</h2>
                      <p className="text-muted-foreground">
                        Pratos exclusivos preparados pelo nosso chef, disponíveis apenas hoje.
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">
                          Nenhum item disponível nesta categoria.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Dietary Information */}
      <section className="py-8 px-4 bg-bistro-accent/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-playfair font-semibold mb-4">Informações Nutricionais</h3>
            <p className="text-muted-foreground mb-6">
              Temos opções para diversas preferências dietéticas. Se você tiver alguma alergia ou restrição alimentar,
              informe à nossa equipe e faremos o possível para atendê-lo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="py-2 px-4 bg-white rounded shadow-sm border">
                <span className="font-medium">V</span> - Vegetariano
              </div>
              <div className="py-2 px-4 bg-white rounded shadow-sm border">
                <span className="font-medium">VG</span> - Vegano
              </div>
              <div className="py-2 px-4 bg-white rounded shadow-sm border">
                <span className="font-medium">GF</span> - Sem Glúten
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
