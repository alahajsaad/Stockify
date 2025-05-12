import { useState } from "react";
import AdminSignUpForm from "../forms/AdminSignUpForm";
import ValidationCodeForm from "../forms/ValidationCodeForm";
import CompanyCreationForm from "../forms/CompanyCreationForm";
import SignUpComplete from "../forms/SignUpComplete";
import { UserResponseDto } from "src/types";
import { useNavigate } from "react-router-dom";

import { CompanyResponseDto } from "src/types/company";
import { Button } from "src/components/ui";
import { ArrowLeft } from 'lucide-react';

const CreateCompanyPage : React.FC = () => {
    const [currentStep , setCurrentStep] = useState<number>(1)
    const [admin,setAdmin] = useState<UserResponseDto>()
    const [company ,setCompany] = useState<CompanyResponseDto>()
   

    
    const navigate = useNavigate();
    
    
    
 

    return (
      <div>
        {currentStep === 1 &&
         <Button onClick={()=> navigate('/')} className="w-12 h-12 bg-white border border-blue-500 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-200 absolute top-10 left-10">
         <ArrowLeft className="text-blue-500 hover:text-white" size={20} />
         </Button>
        }
        
        <div className="center lg:w-[60vw] h-auto md:w-[80vw] w-[90vw]  p-6  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-6">
            <div className="flex justify-between gap-1 mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`w-1/4 h-2 rounded-full ${step <= currentStep ? 'bg-primary' : 'bg-gray-200'}`}
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
            {currentStep === 1 && <AdminSignUpForm setAdmin={setAdmin} setStep={setCurrentStep} />}
            {currentStep === 2 && admin && <ValidationCodeForm admin={admin}  setStep={setCurrentStep}/>}
            {currentStep === 3 && <CompanyCreationForm admin_Id={admin?.id} setCompany={setCompany}  setStep={setCurrentStep}/>}
            {currentStep === 4 && <SignUpComplete fullName={`${admin?.firstName ?? ""} ${admin?.lastName ?? ""}`} companyName={company?.name ?? ""} />}
        </div>
        </div>
    );
}
export default CreateCompanyPage ;