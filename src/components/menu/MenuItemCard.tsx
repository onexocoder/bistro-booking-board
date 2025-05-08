
import React from 'react';
import { MenuItem } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item,
  variant = 'default',
  onClick
}) => {
  const isCompact = variant === 'compact';
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick ? "cursor-pointer" : "",
        !item.isAvailable && "opacity-60"
      )}
      onClick={onClick}
    >
      {item.imageUrl && !isCompact && (
        <div className="relative w-full aspect-[4/3]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          {item.isDailySpecial && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-bistro-primary">Especial do Dia</Badge>
            </div>
          )}
        </div>
      )}
      
      <CardContent className={cn("p-4", isCompact && "py-3")}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={cn("font-playfair font-semibold", isCompact ? "text-base" : "text-lg")}>
              {item.name}
            </h3>
            {!isCompact && (
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className={cn("font-medium text-bistro-primary", isCompact ? "text-base" : "text-lg")}>
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
        
        {!isCompact && item.dietaryInfo && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.dietaryInfo.isVegetarian && (
              <Badge variant="outline" className="text-xs">Vegetariano</Badge>
            )}
            {item.dietaryInfo.isVegan && (
              <Badge variant="outline" className="text-xs">Vegano</Badge>
            )}
            {item.dietaryInfo.isGlutenFree && (
              <Badge variant="outline" className="text-xs">Sem Glúten</Badge>
            )}
          </div>
        )}
      </CardContent>
      
      {isCompact && item.isDailySpecial && (
        <CardFooter className="px-4 pt-0 pb-3">
          <Badge variant="secondary" className="text-xs">Especial do Dia</Badge>
        </CardFooter>
      )}
    </Card>
  );
};

export default MenuItemCard;
