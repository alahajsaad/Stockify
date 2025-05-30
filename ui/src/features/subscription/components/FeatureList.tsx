import React from 'react';
import { Check } from 'lucide-react';

interface FeatureListProps {
  features: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  const featureArray = features.split(',').map(f => f.trim()).filter(f => f.length > 0);

  return (
    <div className="space-y-2">
      {featureArray.map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <Check className="h-4 w-4 text-green-500" />
          </div>
          <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;