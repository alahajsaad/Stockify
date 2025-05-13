import { useState } from "react";
import Modal from "src/components/ui/Modal";
import Table from "src/components/ui/Table";
import { useDeleteValueAddedTax, useGetValueAddedTaxList } from "src/services/api/value_added_tax";
import VatForm from "../forms/VatForm";
import { valueAddedTaxFullDto } from "src/types";
import { Loader2, AlertTriangle } from "lucide-react";

const ConsultVatsPage: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [vat, setVat] = useState<valueAddedTaxFullDto | undefined>(undefined);

  const { data, isPending, isError, error } = useGetValueAddedTaxList();
  const { mutate: deleteTaxValue } = useDeleteValueAddedTax();

  const head = ["Taux (%)", "Description"];

  const editVat = (id: number) => {
    const foundVat = data?.find((item) => item.id === id);
    if (foundVat) {
      setVat(foundVat);
      setIsUpdating(true);
    }
  };

  const deleteVat = (id: number) => {
    deleteTaxValue(id);
  };

  const onUpdateSuccess = (success: boolean) => {
    if (success) {
      setIsUpdating(false);
      setVat(undefined);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Taux de TVA appliqués dans votre entreprise
        </h2>
      </div>

      {isPending && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      )}

      {isError && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <p>Une erreur est survenue : {error.message}</p>
        </div>
      )}

      {!isPending && !isError && (
        <Table
          data={data ?? []}
          head={head}
          variant="WithActions"
          onEdit={editVat}
          onDelete={deleteVat}
        />
      )}

      {isUpdating && (
        <Modal
          title="Modifier une valeur de TVA"
          isOpen={isUpdating}
          onClose={() => setIsUpdating(false)}
          size="md"
        >
          <VatForm onUpdateSuccess={onUpdateSuccess} initialVat={vat} />
        </Modal>
      )}
    </div>
  );
};

export default ConsultVatsPage;
