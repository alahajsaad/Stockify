import Table from "@/components/ui/Table";
import { UserResponseDto } from "@/services/api/appUser/types";

interface CompanyEmployeeProps{
    employees: UserResponseDto[]
}
type TransformedData = {
  id: number;
  fillName: string;
  email: string;
  role: string;
  status: string;
}
const CompanyEmployee : React.FC<CompanyEmployeeProps> = ({employees}) => {
    const head = ["nom&prenom", "email", "role", "Statut"];
    const tableData: TransformedData[] = employees.map(employee => ({
        id: employee.id,
        fillName: employee.firstName + " " + employee.lastName,
        email:employee.email,
        role:employee.role,
        status:employee.status
      
    }));
    return (
         <div className="w-full">
            <Table head={head}  data={tableData} variant={"Default"} />
        </div>
    );
}
export default CompanyEmployee ;