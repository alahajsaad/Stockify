import { useEffect, useState } from "react";
import {NavBar , HeroSection} from "../index"
import Modal from "../../../components/ui/Modal";
import LoginForm from "../../auth/forms/LoginForm";
import { useSearchParams } from "react-router-dom";
type LandingPageLayoutProps ={
    setIsAuthenticated : (bool : boolean) => void
}
const LandingPageLayout : React.FC<LandingPageLayoutProps> = ({setIsAuthenticated}) =>{
    const [isOpenloginForm,setIsOpenLoginForm] = useState(false) 
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if(token != null){
            setIsAuthenticated(true)
        }
    },[])
    useEffect(() => {
        const loginParam = searchParams.get("login");
        setIsOpenLoginForm(loginParam === "true");
      }, [searchParams]);
    return (
        <div className="h-screen overflow-hidden">
            <NavBar setIsOpenLoginForm={setIsOpenLoginForm}/>
            <HeroSection />

            
            <Modal title="Se connecter" isOpen={isOpenloginForm} onClose={() => setIsOpenLoginForm(false)} size="md">
                <LoginForm />
            </Modal>

           
        </div>
    );
};

export default LandingPageLayout ;