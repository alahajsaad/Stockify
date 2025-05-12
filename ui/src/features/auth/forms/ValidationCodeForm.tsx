import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "src/components/ui";
import OtpInput from "src/components/ui/inputs/OtpInput";
import { useActivateAccount } from "src/services/api/accountActivation";
import { UserResponseDto } from "src/types";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().length(6, 'Le code doit contenir 6 chiffres')
});

type FormValues = z.infer<typeof formSchema>;

type FormProps = {
  setStep: (step: number) => void;
  admin: UserResponseDto; // Making email optional since it might be passed from a parent component
}

const ValidationCodeForm: React.FC<FormProps> = ({ setStep, admin }) => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  });


 const { mutate } = useActivateAccount();

  const handleFormSubmit = (data: FormValues) => {
    mutate(data.otp,{
      onSuccess: (response) => {
            setStep(3)
            toast.success(response.message)
      },
       onError: (response) => {
            
            toast.error(response.message)
            },
       }
            
    
   
    ); // Trigger mutation
    
  };

 

 

  return (
    <form 
      className="flex flex-col items-center justify-center gap-4 w-full mx-auto" 
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Vérification de l'email</h2>
      <p className="text-center text-gray-600 mb-6">
        Un code de validation a été envoyé à <span className="font-medium">{admin.email}</span>
      </p>
      
      <Controller
        name="otp"
        control={control}
        render={({ field: { onChange } }) => (
          <OtpInput 
            length={6} 
            onComplete={onChange}
            // Initial value from form state
            
          />
        )}
      />
      
      {errors.otp && (
        <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
      )}
      
      <Button 
        type="button" 
        variant="link" 
      >
        Renvoyer le code
      </Button>
      
      <Button 
        type="submit" 
        className="w-full"
      >
        Vérifier
      </Button>
    </form>
  );
};

export default ValidationCodeForm;