
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bistro-accent/30 p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-5xl font-playfair font-bold text-bistro-primary">404</h1>
        <h2 className="text-2xl font-playfair">Página não encontrada</h2>
        <p className="text-muted-foreground">
          A página "{location.pathname}" que você está procurando não existe ou foi movida.
        </p>
        <div className="pt-4">
          <Button asChild className="bg-bistro-primary hover:bg-bistro-primary/90">
            <Link to="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
