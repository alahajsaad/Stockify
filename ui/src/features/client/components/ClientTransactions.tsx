import Table from "src/components/ui/Table";

export type DocumentType = | "Commande client" | "Commande fournisseur"
export type Status = | "Paid" | "Unpaid"
export type transaction = {
    date : Date
    documentType : DocumentType
    documentNumber : string
    totalAmount : number
    status : Status 
}

const ClientTransactions : React.FC = () => {
    return (
        <div className="rounded border-gray-200">
            <Table />
        </div>
    );
}
export default ClientTransactions ;