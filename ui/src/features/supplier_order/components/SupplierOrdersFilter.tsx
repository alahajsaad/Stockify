import { Filter, X } from "lucide-react";
import { DynamicPartner } from "@/services/api/partner/types";
import Select from "@/components/ui/Select";
import { PaymentStatus, ReceptionStatus } from "@/types";
import SearchPartner from "@/components/order/consultOrders/SearchPartner";

type SupplierOrdersFilterProps = {
    setSupplier: (supplier: DynamicPartner) => void;
    setPaymentStatus : (status : PaymentStatus ) => void,
    PaymentStatus: PaymentStatus ,
    setReceptionStatus:(status: ReceptionStatus ) => void,
    ReceptionStatus:ReceptionStatus 
    

}

const SupplierOrdersFilter : React.FC<SupplierOrdersFilterProps> = ({setSupplier,setPaymentStatus,PaymentStatus,setReceptionStatus,ReceptionStatus}) => {

    const PaymentStatusMap = new Map<string, string>([
      ["", "Tous"],
      ["PAID", "Commandes payées"],
      ["UNPAID", "Commandes non payées"]
    ]);

    const ReceptionStatusMap = new Map<string, string>([
      ["", "Tous"],
      ["RECEIVED", "Commandes reçues"],
      ["UNRECEIVED", "Commandes non reçues"],
    ]);

    
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>
      </div>
      
      <div className="flex flex-col lg:flex-row w-full gap-4 items-end">

        <div className="w-full lg:w-2/4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recherche
            </label>
            <SearchPartner partnerType={"SUPPLIER"} setPartner={setSupplier} />

          </div>
        

        <div className="w-full lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              État du paiement
            </label>
            <Select
            mapOptions={PaymentStatusMap}
            setOption={setPaymentStatus}
            selectedOption={PaymentStatus}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
            />
          </div>
        
        <div className="w-full lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              État de la réception
            </label>
           <Select
          mapOptions={ReceptionStatusMap}
          setOption={setReceptionStatus}
          selectedOption={ReceptionStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
          </div>
        
        <div className="flex gap-2 mt-2 lg:mt-0">
            <button 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-all text-sm font-medium flex items-center gap-1"
              onClick={() => {
                
              }}
            >
              <X />
              Réinitialiser
            </button>
            
            
          </div>
      </div>
      
    </div>
    );
}
export default SupplierOrdersFilter ;