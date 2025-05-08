
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { menuItems as initialMenuItems, generateId } from '@/data/mockData';
import { MenuItem, MenuCategory } from '@/types';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import MenuItemCard from '@/components/menu/MenuItemCard';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'main',
    isAvailable: true,
    isDailySpecial: false,
  });

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditItem = (item: MenuItem) => {
    setCurrentMenuItem(item);
    setIsEditing(true);
  };

  const handleAddOrUpdateItem = () => {
    if (!currentMenuItem.name || !currentMenuItem.description || currentMenuItem.price <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (isEditing && currentMenuItem.id) {
      // Editar item existente
      setMenuItems(prev => 
        prev.map(item => 
          item.id === currentMenuItem.id ? { ...item, ...currentMenuItem } as MenuItem : item
        )
      );
    } else {
      // Adicionar novo item
      const newItem: MenuItem = {
        id: generateId(),
        name: currentMenuItem.name,
        description: currentMenuItem.description,
        price: currentMenuItem.price,
        category: currentMenuItem.category as MenuCategory,
        isAvailable: currentMenuItem.isAvailable || true,
        isDailySpecial: currentMenuItem.isDailySpecial || false,
        imageUrl: currentMenuItem.imageUrl,
        dietaryInfo: currentMenuItem.dietaryInfo,
      };
      setMenuItems(prev => [...prev, newItem]);
    }

    resetForm();
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Tem certeza que deseja remover este item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setCurrentMenuItem({
      name: '',
      description: '',
      price: 0,
      category: 'main',
      isAvailable: true,
      isDailySpecial: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Menu do Dia</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os itens do menu e configure o menu do dia
          </p>
        </div>
        <Button 
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="bg-bistro-primary hover:bg-bistro-primary/90"
        >
          <Plus size={16} className="mr-2" />
          Novo Item
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar itens do menu..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as MenuCategory | 'all')}
            >
              <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="appetizer">Entradas</TabsTrigger>
                <TabsTrigger value="main">Principais</TabsTrigger>
                <TabsTrigger value="dessert">Sobremesas</TabsTrigger>
                <TabsTrigger value="drink">Bebidas</TabsTrigger>
                <TabsTrigger value="special">Especiais</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="relative group">
                  <MenuItemCard item={item} variant="default" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit size={16} className="mr-1" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 size={16} className="mr-1" /> Remover
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum item encontrado. Tente ajustar os filtros ou adicione novos itens.
                </p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <Card className="md:w-1/3">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-playfair font-semibold">
                  {currentMenuItem.id ? 'Editar Item' : 'Novo Item'}
                </h2>
                
                <div>
                  <Label htmlFor="name">Nome do Item</Label>
                  <Input
                    id="name"
                    placeholder="Nome do prato"
                    value={currentMenuItem.name}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, name: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Ingredientes e descrição do prato"
                    value={currentMenuItem.description}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, description: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={currentMenuItem.price}
                      onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, price: parseFloat(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                      value={currentMenuItem.category}
                      onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, category: e.target.value as MenuCategory })}
                    >
                      <option value="appetizer">Entrada</option>
                      <option value="main">Prato Principal</option>
                      <option value="dessert">Sobremesa</option>
                      <option value="drink">Bebida</option>
                      <option value="special">Especial</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="imageUrl">URL da Imagem (opcional)</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={currentMenuItem.imageUrl || ''}
                    onChange={(e) => setCurrentMenuItem({ ...currentMenuItem, imageUrl: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isAvailable" className="cursor-pointer">Disponível no Cardápio</Label>
                    <Switch
                      id="isAvailable"
                      checked={currentMenuItem.isAvailable}
                      onCheckedChange={(checked) => setCurrentMenuItem({ ...currentMenuItem, isAvailable: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isDailySpecial" className="cursor-pointer">Incluir no Menu do Dia</Label>
                    <Switch
                      id="isDailySpecial"
                      checked={currentMenuItem.isDailySpecial}
                      onCheckedChange={(checked) => setCurrentMenuItem({ ...currentMenuItem, isDailySpecial: checked })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-bistro-primary hover:bg-bistro-primary/90"
                    onClick={handleAddOrUpdateItem}
                  >
                    {currentMenuItem.id ? 'Atualizar' : 'Adicionar'} Item
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
