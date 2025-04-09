import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "src/components/ui";
import OtpInput from "src/components/ui/inputs/OtpInput";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().length(6, 'Le code doit contenir 6 chiffres')
});

type FormValues = z.infer<typeof formSchema>;

type FormProps = {
  setStep: (step: number) => void;
  email?: string; // Making email optional since it might be passed from a parent component
}

const ValidationCodeForm: React.FC<FormProps> = ({ setStep, email = "votre email" }) => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    setError
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  });

  const handleFormSubmit = (data: FormValues) => {
    console.log(data);
    // You would typically validate the OTP with your backend here
    // If validation fails, you can set an error:
    // setError('otp', { type: 'manual', message: 'Code de vérification incorrect' });
    
    // On success, proceed to next step
    setStep(3);
  };

  const handleResendValidationCode = () => {
    // Add logic to resend validation code
    console.log("Resending validation code");
  };

  return (
    <form 
      className="flex flex-col items-center justify-center gap-4 w-full mx-auto" 
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Vérification de l'email</h2>
      <p className="text-center text-gray-600 mb-6">
        Un code de validation a été envoyé à <span className="font-medium">{email}</span>
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
        onClick={handleResendValidationCode}
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