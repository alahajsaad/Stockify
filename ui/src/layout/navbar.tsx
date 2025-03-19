import  { useState } from 'react';


import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <p>Logo</p>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Fonctionnalités
          </a>
          <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Tarifs
          </a>
          <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Témoignages
          </a>
          <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-primary hover:bg-primary/90">
            Se connecter
          </button>
          
          {/* Mobile menu toggle */}
          {isMobile && (
            <button 
              className="ml-2 md:hidden text-gray-700 p-1 rounded-md hover:bg-gray-100"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Fonctionnalités
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Tarifs
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Témoignages
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;