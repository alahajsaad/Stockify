import ProductDetailsCard from "../components/productDetails/ProductDetailsCard";
import { useParams } from 'react-router';
import { useGetProductById } from "@/services/api/product/hooks";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    
    const { data: product, isPending } = useGetProductById(numericId);
   
    if (isPending) {
        return <div>Loading product details...</div>;
    }
    
    if (!product || numericId <= 0) {
        return <div>Product not found</div>;
    }
    
    return (
        <>
            <ProductDetailsCard product={product.data} />
        </>
    );
}

export default ProductDetails;