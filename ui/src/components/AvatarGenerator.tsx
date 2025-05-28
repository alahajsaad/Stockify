interface AvatarGeneratorProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AvatarGenerator = ({ name, size = 'medium', className = '' }: AvatarGeneratorProps) => {
  // Génère les initiales à partir du nom complet
  const getInitials = (fullName: string): string => {
    if (!fullName || fullName.trim() === '') {
      return '?';
    }
    
    return fullName
      .trim()
      .split(/\s+/) // Utilise une regex pour gérer plusieurs espaces
      .filter(part => part.length > 0) // Filtre les parties vides
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Génère une couleur basée sur le nom
  const getAvatarColor = (fullName: string): string => {
    const colors = [
      '#3B82F6', '#8B5CF6', '#EF4444', '#10B981',
      '#F59E0B', '#EC4899', '#6366F1', '#14B8A6'
    ];

    if (!fullName || fullName.trim() === '') {
      return colors[0]; // Couleur par défaut
    }

    let hash = 0;
    const cleanName = fullName.trim().toLowerCase();
    
    for (let i = 0; i < cleanName.length; i++) {
      hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Classes selon la taille
  const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-20 h-20 text-xl'
  };

  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);

  const baseClasses = 'rounded-full flex items-center justify-center font-semibold text-white shadow-md';
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

  return (
    <div 
      className={combinedClasses} 
      style={{ backgroundColor }}
      title={name} // Ajoute un tooltip avec le nom complet
      role="img"
      aria-label={`Avatar pour ${name}`}
    >
      {initials}
    </div>
  );
};

export default AvatarGenerator;