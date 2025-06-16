// CategoriesPage.tsx
import { useState } from 'react';
import { Search, Shapes } from 'lucide-react';
import { SearchInput } from '@/components/ui';
import { useDeleteCategory, useGetCategories } from '@/services/api/category/hooks';
import CategoryCard from '../components/CategoryCard';
import TableNav from '@/components/ui/TableNav';
import Modal from '@/components/ui/Modal';
import CategoryForm from '../forms/CategoryForm';
import { Category } from '@/services/api/category/types';
import { toast } from 'react-toastify';

const CategoriesPage = () => {
    const [page, setPage] = useState<number>(0);
    const [searchKey, setSearchKey] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const { data: categories, isPending } = useGetCategories({
        keyword: searchKey || undefined,
        page: page
    });
    const {mutate : deleteCategory} = useDeleteCategory()

    const handleEdit = (id: number) => {
        const foundCategory = categories?.content?.find((item) => item.id === id);
        if (foundCategory) {
        setCategory(foundCategory);
        setIsUpdating(true);
        }
    };

    const onUpdateSuccess = (success: boolean) => {
    if (success) {
      setIsUpdating(false);
      setCategory(undefined);
    }
  };

    const handleDelete = (id: number) => {
        deleteCategory(id,{
            onSuccess:(response)=>{
                toast.success(response.message)
            },
            onError:(response)=>{
                 toast.error(response.message)
            }
        });
    };

   

    return (
        <div className="min-h-screen container mx-auto px-4 py-24">
            
                
                {/* Header avec icône et titre */}
                <div className="flex items-center justify-start gap-5 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Shapes className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
                </div>
                
                
                
                    <div className="flex-1 min-w-[200px] max-w-[600px] mb-12">
                        <SearchInput
                        placeholder="Rechercher une catégorie..."
                        setSearchKey={setSearchKey}
                        isPending={isPending}
                        />
                    </div>
                   
                
                
             
                
                {/* Loading State */}
                {isPending && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-500 mt-4">Chargement des catégories...</p>
                    </div>
                )}
                
                {/* Categories Grid */}
                {!isPending && categories && categories.content.length > 0 && (
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.content.map((category, index) => (
                            <CategoryCard
                                key={category.id || `category-${index}`}
                                category={category}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                    <TableNav data={categories} page={page} setPage={setPage} />
                    </>
                )}
                
                {/* Empty State */}
                {!isPending && (!categories || categories.content.length === 0) && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucune catégorie trouvée
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchKey 
                                ? `Aucune catégorie ne correspond à votre recherche "${searchKey}". Essayez avec d'autres mots-clés.`
                                : "Aucune catégorie disponible pour le moment."
                            }
                        </p>
                    </div>
                )}

                <Modal
                    title="Modifier une category"
                    isOpen={isUpdating}
                    onClose={() => setIsUpdating(false)}
                    size="md"
                    >
                    <CategoryForm onUpdateSuccess={onUpdateSuccess} initialCategory={category} />
                </Modal>
           
        </div>
    );
};

export default CategoriesPage;