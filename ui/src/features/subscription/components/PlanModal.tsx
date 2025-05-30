import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxUsers: number;
  maxStorageMb: number;
  features: string;
  popular?: boolean;
}

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Omit<SubscriptionPlan, 'id'>) => void;
  editingPlan: SubscriptionPlan | null;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, onSave, editingPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    maxUsers: '',
    maxStorageMb: '',
    features: '',
    popular: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        name: editingPlan.name,
        price: editingPlan.price.toString(),
        maxUsers: editingPlan.maxUsers.toString(),
        maxStorageMb: editingPlan.maxStorageMb.toString(),
        features: editingPlan.features,
        popular: editingPlan.popular || false
      });
    } else {
      setFormData({
        name: '',
        price: '',
        maxUsers: '',
        maxStorageMb: '',
        features: '',
        popular: false
      });
    }
    setErrors({});
  }, [editingPlan, isOpen]);

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `(${(mb / 1024).toFixed(1)} GB)`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du plan est requis';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0';
    }

    if (!formData.maxUsers || parseInt(formData.maxUsers) <= 0) {
      newErrors.maxUsers = 'Le nombre d\'utilisateurs doit être supérieur à 0';
    }

    if (!formData.maxStorageMb || parseInt(formData.maxStorageMb) <= 0) {
      newErrors.maxStorageMb = 'Le stockage doit être supérieur à 0';
    }

    if (!formData.features.trim()) {
      newErrors.features = 'Au moins une fonctionnalité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave({
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      maxUsers: parseInt(formData.maxUsers),
      maxStorageMb: parseInt(formData.maxStorageMb),
      features: formData.features.trim(),
      popular: formData.popular
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingPlan ? `Modifier ${editingPlan.name}` : 'Ajouter un Plan'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Plan Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du plan *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Basic, Premium..."
              autoFocus
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Prix mensuel (€) *
            </label>
            <div className="relative">
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="9.99"
                step="0.01"
                min="0"
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Max Users */}
          <div>
            <label htmlFor="maxUsers" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre maximum d'utilisateurs *
            </label>
            <input
              type="number"
              id="maxUsers"
              value={formData.maxUsers}
              onChange={(e) => handleChange('maxUsers', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.maxUsers ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="5"
              min="1"
            />
            {errors.maxUsers && <p className="text-red-500 text-xs mt-1">{errors.maxUsers}</p>}
          </div>

          {/* Storage */}
          <div>
            <label htmlFor="maxStorageMb" className="block text-sm font-medium text-gray-700 mb-1">
              Stockage maximum (MB) *
            </label>
            <input
              type="number"
              id="maxStorageMb"
              value={formData.maxStorageMb}
              onChange={(e) => handleChange('maxStorageMb', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.maxStorageMb ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1024"
              min="1"
            />
            {formData.maxStorageMb && (
              <p className="text-xs text-gray-500 mt-1">
                {formatStorage(parseInt(formData.maxStorageMb))}
              </p>
            )}
            {errors.maxStorageMb && <p className="text-red-500 text-xs mt-1">{errors.maxStorageMb}</p>}
          </div>

          {/* Features */}
          <div>
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
              Fonctionnalités *
            </label>
            <textarea
              id="features"
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors.features ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Séparez les fonctionnalités par des virgules..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez chaque fonctionnalité par une virgule
            </p>
            {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
          </div>

          {/* Popular checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => handleChange('popular', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="popular" className="text-sm text-gray-700">
              Marquer comme plan populaire
            </label>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingPlan ? 'Sauvegarder' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
