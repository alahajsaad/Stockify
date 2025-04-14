import { Button } from "src/components/ui";
import { useAuth } from "../auth/components/AuthProvider";

const Dashboard : React.FC = () => {
     const { logout } = useAuth();
    return (
        <><p>Dashboard</p>
        <Button onClick={logout}>Se deconnecter</Button>
        </>
        
    );
}
export default Dashboard ;