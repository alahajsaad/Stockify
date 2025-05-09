import ProductDetailsCard from "../components/productDetails/ProductDetailsCard";
import { useParams } from 'react-router';
const ProductDetails : React.FC = () => {
    const { id } = useParams();

    
    return (
        <>
        <ProductDetailsCard />
        </>
    );
}
export default ProductDetails ;