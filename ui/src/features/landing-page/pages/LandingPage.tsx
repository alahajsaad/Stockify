import { useState } from "react";
import {NavBar , HeroSection} from "../index"
import Modal from "../../../components/ui/Modal";
import LoginForm from "../../../features/auth/forms/LoginForm";

const LandingPage : React.FC = () =>{
    const [isOpenloginForm,setIsOpenLoginForm] = useState(false) 
    return (
        <div className="h-screen overflow-hidden">
            <NavBar setIsOpenLoginForm={setIsOpenLoginForm}/>
            <HeroSection />

            
            <Modal title="Se connecter" isOpen={isOpenloginForm} onClose={() => setIsOpenLoginForm(false)}size="md">
                <LoginForm />
            </Modal>

           
        </div>
    );
};

export default LandingPage ;