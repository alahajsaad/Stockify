import { useEffect, useState } from "react";
import AdminSignUpForm from "../forms/AdminSignUpForm";
import ValidationCodeForm from "../forms/ValidationCodeForm";
import CompanyCreationForm from "../forms/CompanyCreationForm";
import SignUpComplete from "../forms/SignUpComplete";
import { AdminInscriptionStatus, UserResponseDto } from "src/types";
import { useNavigate } from "react-router-dom";

const CreateCompanyPage : React.FC = () => {
    const [currentStep , setCurrentStep] = useState<number>(1)
    const [admin,setAdmin] = useState<UserResponseDto>()
    const [adminInscriptionStatus ,setAdminInscriptionStatus] = useState<AdminInscriptionStatus>()
    const navigate = useNavigate()
    useEffect(()=>{
      switch(adminInscriptionStatus) {
        case "ADMIN_HAS_COMPANY" :
          navigate('/')
          break;
        case "ACTIVE_ADMIN_WITHOUT_COMPANY":
          setCurrentStep(3)
          break;
        case "INACTIVE_ADMIN_WITHOUT_COMPANY":
          setCurrentStep(2)
          break;
      }
    },[adminInscriptionStatus,navigate]) 
    
 

    return (
        <div className="center lg:w-[60vw] h-auto md:w-[80vw] w-[90vw]  p-6  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`w-1/4 h-1 rounded-full ${
                    step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              {currentStep === 1 && 'Informations de l\'admin'}
              {currentStep === 2 && 'Validation du code'}
              {currentStep === 3 && 'Informations de l\'entreprise'}
              {currentStep === 4 && 'Inscription complétée'}
            </p>
          </div>
            {currentStep === 1 && <AdminSignUpForm setAdminInscriptionStatus={setAdminInscriptionStatus} setAdmin={setAdmin} setStep={setCurrentStep} />}
            {currentStep === 2 && <ValidationCodeForm admin={admin!}  setStep={setCurrentStep}/>}
            {currentStep === 3 && <CompanyCreationForm  setStep={setCurrentStep}/>}
            {currentStep === 4 && <SignUpComplete />}
        </div>
    );
}
export default CreateCompanyPage ;