import ClientOrderStatistics from "../adminDash/components/ClientOrderStatistics";
import ProductStatistics from "../adminDash/components/ProductStatistics";
import SupplierOrderStatistics from "../adminDash/components/SupplierOrderStatistics";

const EmployeeDash : React.FC = () => {
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
export default EmployeeDash ;