import { Client } from "../types";
import Table from "src/components/ui/Table";
import { Paths } from "src/lib/paths";

type ClientTableProps = {
    clients: Client[]
}
type ClientTableData = {
    id:number
    fullName : string
    email : string
    phoneNumbers : string
}
const ClientTable : React.FC<ClientTableProps> = ({clients}) => {
    
    const formattedData: ClientTableData[] = clients.map((client) => ({
    id: client.id!,
    fullName: `${client.firstName} ${client.lastName}`,
    email: client.email || '',
    phoneNumbers: client.phoneNumbers.map((phone) => phone.number).join(' / ')
    }));
    const head = ["Client", "Email", "Numéros de téléphone"];

    return (
        <Table data={formattedData} head={head} variant={"WithNavigation"} route={Paths.client}/>
    );
}
export default ClientTable ;