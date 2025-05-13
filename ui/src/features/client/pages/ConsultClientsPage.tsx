import { useState } from "react";
import { SearchInput } from "src/components/ui";
import { useGetClients } from "src/services/api/client";

const ConsultClientsPage : React.FC = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const [searchKey,setSearchKey]=useState<string>()
    const { data, isPending, refetch } = useGetClients({keyWord: searchKey,page,size});
    return (
        <div>
            <SearchInput setSearchKey={setSearchKey} isPending={isPending} placeholder="Rechercher par désignation, catégorie ou référence"/>
        </div>
    );
}
export default ConsultClientsPage ;