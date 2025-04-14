import React from 'react';
import { Package, PackageCheck, PackageOpen, PackageSearch } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  duration?: number;
  iconSize?: number;
  orbitRadius?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Chargement de l'inventaire...", 
  duration = 3, 
  iconSize = 34, 
  orbitRadius = 80 
}) => {
  // Calculate positions and delays for circular animation
  const calculateAnimationProps = (index: number, total: number) => {
    return {
      animationDuration: `${duration}s`,
      animationDelay: `${(duration / total) * index}s`,
      transformOrigin: `center ${orbitRadius}px`,
      left: `calc(50% - ${iconSize/2}px)`,
      top: '0'
    };
  };

  const icons = [
    { Icon: Package, color: "text-blue-500", index: 0 },
    { Icon: PackageCheck, color: "text-green-500", index: 1 },
    { Icon: PackageOpen, color: "text-red-500", index: 2 },
    { Icon: PackageSearch, color: "text-yellow-500", index: 3 }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-48 h-48">
        {icons.map(({ Icon, color, index }) => (
          <div 
            key={index}
            className="absolute animate-[spin_3s_linear_infinite]" 
            style={calculateAnimationProps(index, icons.length)}
          >
            <Icon size={iconSize} className={color} strokeWidth={1.5} />
          </div>
        ))}

        <div 
          className="text-center absolute w-full text-lg font-medium text-gray-600" 
          style={{ top: `${orbitRadius + 30}px` }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
