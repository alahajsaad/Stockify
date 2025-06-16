import { Button } from "@/components/ui";
import { Filter, RotateCcw } from "lucide-react";
import { PartnerResponseDto } from "@/services/api/partner/types";
import Select from "@/components/ui/Select";
import { PaymentStatus, ReceptionStatus } from "@/types";
import SearchPartner from "./SearchPartner";

type SupplierOrdersFilterProps = {
    setSupplier: (supplier: PartnerResponseDto | undefined) => void;
    setPaymentStatus : (status : PaymentStatus) => void,
    PaymentStatus: PaymentStatus | undefined,
    setReceptionStatus:(status: ReceptionStatus) => void,
    ReceptionStatus:ReceptionStatus | undefined
    

}

const SupplierOrdersFilter : React.FC<SupplierOrdersFilterProps> = ({setSupplier,setPaymentStatus,PaymentStatus,setReceptionStatus,ReceptionStatus}) => {

    const PaymentStatusMap = new Map<PaymentStatus, string>([
      ["ALL", "Tous"],
      ["PAID", "Commandes payées"],
      ["UNPAID", "Commandes non payées"]
    ]);

    const ReceptionStatusMap = new Map<ReceptionStatus, string>([
     ["ALL", "Tous"],
      ["RECEIVED", "Commandes reçues"],
      ["UNRECEIVED", "Commandes non reçues"],
    ]);

    const handleReset = () =>{

    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>
        <Button onClick={handleReset} >
          <RotateCcw className="w-4 h-4 mr-1" />
          Réinitialiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchPartner partnerType={"SUPPLIER"} setPartner={setSupplier} />
        
        <Select
          mapOptions={PaymentStatusMap}
          setOption={setPaymentStatus}
          selectedOption={PaymentStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
        
        <Select
          mapOptions={ReceptionStatusMap}
          setOption={setReceptionStatus}
          selectedOption={ReceptionStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
      </div>
      
    </div>
    );
}
export default SupplierOrdersFilter ;