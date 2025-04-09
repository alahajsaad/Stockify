import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return {
    currentStep,
    setCurrentStep,
    goBack,
    goNext,
  };
};

export default useMultiStepForm;
