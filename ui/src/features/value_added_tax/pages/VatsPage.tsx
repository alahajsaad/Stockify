import { Percent } from 'lucide-react';
import { useGetVats } from '@/services/api/value_added_tax/hooks';
import VatCard from '../components/VatCard';

const VatsPage = () => {
    const { data: vats, isPending, refetch } = useGetVats();

    const handleEdit = (id: number) => {
        console.log('Modifier la TVA :', id);
    };

    const handleDelete = (id: number) => {
        console.log('Supprimer la TVA :', id);
    };

    return (
        <div className="min-h-screen container mx-auto px-4 py-24">
            {/* En-tête avec icône et titre */}
            <div className="flex items-center justify-center gap-5 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Percent className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Valeurs de TVA</h1>
            </div>

            {/* État de chargement */}
            {isPending && (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Chargement des valeurs de TVA...</p>
                </div>
            )}

            {/* Grille des TVA */}
            {!isPending && vats && vats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {vats.map((vat, index) => (
                        <VatCard
                            key={vat.id || `vat-${index}`}
                            vat={vat}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Aucune donnée */}
            {!isPending && (!vats || vats.length === 0) && (
                <div className="text-center text-gray-500 mt-10">
                    Aucune valeur de TVA disponible.
                </div>
            )}
        </div>
    );
};

export default VatsPage;
