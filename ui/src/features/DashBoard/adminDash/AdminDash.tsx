import ClientOrderStatistics from "./components/ClientOrderStatistics";
import ProductStatistics from "./components/ProductStatistics";
import SupplierOrderStatistics from "./components/SupplierOrderStatistics";

const AdminDash : React.FC = () => {
    
    return (
       <div>
        <ProductStatistics />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SupplierOrderStatistics />
        <ClientOrderStatistics/>
        </div>
       
       </div>
    );
}
export default AdminDash ;