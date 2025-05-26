import { useAuth } from "../auth/components/AuthProvider";
import AdminDash from "./adminDash/AdminDash";
import EmployeeDash from "./employeeDash/EmployeeDash";
import SuperAdminDash from "./superAdminDash/superAdminDash";

const DashBoard : React.FC = () => {
    const {user} = useAuth()
    switch (user?.scope) {
        case 'ROLE_ADMIN':
            return (
                <AdminDash />
            );
        case 'ROLE_EMPLOYEE':
             return (
                <EmployeeDash />
            );
        case 'ROLE_SUPER_ADMIN':
             return (
                <SuperAdminDash />
            );
        }
   
}
export default DashBoard ;