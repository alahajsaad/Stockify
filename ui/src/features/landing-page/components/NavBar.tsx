import { useState } from "react";
import { useIsMobile } from "../../../hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";

import { Menu, Package, X } from 'lucide-react';
import { Button } from "src/components/ui";

type NavBarProps = {
  setIsOpenLoginForm: (isOpen: boolean) => void;
};

const NavBar: React.FC<NavBarProps> = ({ setIsOpenLoginForm }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginForm = () => {
    setIsOpenLoginForm(true);
  };

  const navigateToSignUpPage = () => {
    navigate('/SignUp');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
         <Link to="/" className="flex items-center justify-center gap-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="ml-3 font-bold text-lg">Stockify</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/fonctionnalites" 
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Fonctionnalités
          </Link>
          <Link 
            to="/tarifs" 
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Tarifs
          </Link>
          <Link 
            to="/temoignages" 
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Témoignages
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!isMobile && (
            <>
              <Button onClick={openLoginForm}>Se connecter</Button>
              <Button onClick={navigateToSignUpPage}>S'inscrire</Button>
            </>
          )}
          
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
            <Link 
              to="/fonctionnalites" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link 
              to="/tarifs" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              to="/temoignages" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Témoignages
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              onClick={() => {
                openLoginForm();
                setMobileMenuOpen(false);
              }} 
              className="w-full sm:hidden mt-2"
            >
              Se connecter
            </Button>
            <Button 
              onClick={() => {
                navigateToSignUpPage();
                setMobileMenuOpen(false);
              }} 
              className="w-full sm:hidden mt-2"
            >
              S'inscrire
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;