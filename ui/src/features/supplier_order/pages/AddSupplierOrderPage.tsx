import { useState } from "react";
import { Supplier } from "src/types/supplier";
import SupplierInformation from "../components/SupplierInformation";
import OrderDetails from "../components/OrderDetails";
import OrderInformation from "../components/OrderInformation";

const AddSupplierOrderPage : React.FC = () => {
    const [supplier,setSupplier] = useState<Supplier>()
    return (
        <div className="">
            <OrderInformation orderNumber={"CMF_25A001"}/>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1 h-full">
                    <SupplierInformation supplier={supplier} setSupplier={setSupplier} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <OrderDetails />
                </div>
            </div>
        </div>
    );
}
export default AddSupplierOrderPage ;