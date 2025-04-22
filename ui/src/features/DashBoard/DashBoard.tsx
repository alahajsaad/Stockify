import { Button } from "src/components/ui";
import { useAuth } from "../auth/components/AuthProvider";
import Sidebar from "./components/SideBar/Sidebar";
import { useEffect, useState } from "react";
import { useIsMobile } from "src/hooks/useMobile";
import NavBar from "./components/NavBar/NavBar";
import ProductForm from "../product/forms/productForm";

const Dashboard : React.FC = () => {
     const { logout } = useAuth();
     const isMobile = useIsMobile();
     const [isExpanded , setIsExpanded] = useState<boolean>(true)
     const toggleSidebar = () => {
            setIsExpanded(() => !isExpanded)
     }
     useEffect(()=>{
            if(isMobile){
                setIsExpanded(false)
            } else {
                setIsExpanded(true)
            }
     },[isMobile])
    return (

        <div className="flex flex-row h-screen">
        <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded}/>
        <div className="flex flex-col w-screen h-screen">
            <NavBar toggleSidebar={toggleSidebar} />
            <div className="bg-gray-100 p-4 flex-1 overflow-auto">
                <p>Dashboard</p>
                <Button onClick={logout}>Se deconnecter</Button>
                <div className="lg:w-[60vw] rounded-lg shadow-sm border border-gray-200 bg-white p-4">
                 <ProductForm />
                </div>
                
            </div>
            
        </div>
       
        </div>
        
    );
}
export default Dashboard ;