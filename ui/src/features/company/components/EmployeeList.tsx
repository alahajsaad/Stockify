import { Users } from "lucide-react";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import Table from "src/components/ui/Table";
import { useGetUsersByCompany } from "src/services/api/user";
import { Role } from "src/types/user";

interface EmployeeListProps {
    companyId: number;
}

type TransformedData = {
    id: number;
    fullName: string;
    email: string;
    role: string;
    status: string;
};

const EmployeeList: React.FC<EmployeeListProps> = ({ companyId }) => {
    const { data, isPending } = useGetUsersByCompany(companyId);

    const getRole = (role: Role): string => {
        switch (role) {
            case "ADMIN":
                return "vous (proprietaire)";
            case "EMPLOYEE":
                return "employee";
            case "SUPER_ADMIN":
                return "super administrateur";
            default:
                return "inconnu";
        }
    };

    const head = ["nom&prenom", "email", "role", "statut"];
    
    const tableData: TransformedData[] = data?.map(user => ({
        id: user.id,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        role: getRole(user.role),
        status: user.status,
    })) || [];

    if (isPending) {
        return (
            <Card>
                <CardHeader className="flex flex-row gap-2 items-center">
                    <Users />
                    <p>Chargement des informations des employés...</p>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 items-center">
                <Users />
                <p>Informations des employés</p>
            </CardHeader>
            <CardBody>
                {data && data.length > 0 ? (
                    <Table head={head} data={tableData} variant="WithActions" />
                ) : (
                    <p>Il n'y a aucun employé, ajoutez-en un !</p>
                )}
            </CardBody>
        </Card>
    );
};

export default EmployeeList;