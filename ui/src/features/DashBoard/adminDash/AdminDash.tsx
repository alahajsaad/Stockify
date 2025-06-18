import ClientOrderStatistics from "./components/ClientOrderStatistics";
import ProductStatistics from "./components/productStatistics";
import SupplierOrderStatistics from "./components/SupplierOrderStatistics";

const AdminDash : React.FC = () => {
    
    return (
       <div>
        <ProductStatistics />
        <div className="flex gap-6 items-center justify-center w-full">
        <SupplierOrderStatistics />
        <ClientOrderStatistics/>
        </div>
       
       </div>
    );
}
export default AdminDash ;