import VatForm from "../forms/VatForm";

const AddVatPage : React.FC = () => {
    return (
        <div className="card max-w-150 ">
        <p className="text-2xl pb-4">Ajouter un nouveau taux de tva</p>
          <VatForm />
        </div>
        
    );
}
export default AddVatPage ;