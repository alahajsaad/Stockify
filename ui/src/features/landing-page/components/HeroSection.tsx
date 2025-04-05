import { Building, ShoppingCart, Package, BarChart4 } from 'lucide-react';
import { Button } from 'src/components/ui';

const HeroSection : React.FC = () => {

    return (
        <div className="relative h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="absolute top-40 right-[10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-teal-100 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
              Stockify
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 leading-relaxed animate-slide-up">
            Gérez votre stock, vos ventes et vos achats de manière intelligente et optimisée
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button className="rounded-full px-8 py-6 text-lg">Commencer gratuitement</Button>
              
            <Button className="rounded-full px-8 py-6 text-lg">Voir la démo</Button>
              
          </div>
          
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-gray-500 mb-4">Utilisé par des entreprises de toutes tailles</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {/* Entreprises fictives avec logos et noms */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-md rounded-full flex items-center justify-center text-primary">
                  <Building className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs text-gray-600 mt-2">TechCorp</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-md rounded-full flex items-center justify-center text-teal-500">
                  <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs text-gray-600 mt-2">ShopMaster</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-md rounded-full flex items-center justify-center text-blue-500">
                  <Package className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs text-gray-600 mt-2">LogiFast</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-md rounded-full flex items-center justify-center text-purple-500">
                  <BarChart4 className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs text-gray-600 mt-2">DataPro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default HeroSection ;