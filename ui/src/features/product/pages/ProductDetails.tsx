import { useGetProductById } from "src/services/api/product";
import ProductDetailsCard from "../components/productDetails/ProductDetailsCard";
import { useParams } from 'react-router';
import { useEffect } from 'react';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Convert string ID to number and handle undefined case
    const numericId = id ? parseInt(id, 10) : -1;
    
    // Only fetch when we have a valid ID
    const { data: product, isPending, refetch } = useGetProductById(numericId);
    // Trigger the fetch explicitly since enabled is set to false in the hook
    useEffect(() => {
        if (numericId > 0) {
            refetch();
        }
    }, [numericId, refetch]);
    
    // Handle loading state or invalid ID
    if (isPending) {
        return <div>Loading product details...</div>;
    }
    
    if (!product || numericId <= 0) {
        return <div>Product not found</div>;
    }
    
    return (
        <>
            <ProductDetailsCard product={product} />
        </>
    );
}

export default ProductDetails;