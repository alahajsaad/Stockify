import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, PasswordInput } from "src/components/ui";
import { useCreateAdminAccount, useGetUserByEmail } from "src/services/api/user";
import { User, UserResponseDto } from "src/types";
import { z } from "zod";

// Note: zodResolver would need to be imported properly without @hookform/resolvers/zod
// The component assumes you'll add the proper import for zodResolver

const formSchema = z
  .object({
    firstName: z.string().min(1, "Remplissez votre prénom s'il vous plaît"),
    lastName: z.string().min(1, "Remplissez votre nom s'il vous plaît"),
    email: z.string().email("L'email doit être rempli correctement"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    verifiedPassword: z.string(),
    telegramId: z.string().optional(),
  })
  .superRefine(({ password, verifiedPassword }, ctx) => {
    if (password !== verifiedPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["verifiedPassword"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

type FormProps = {
  setStep: (step: number) => void;
  setAdmin: (admin: UserResponseDto) => void;
};

const AdminSignUpForm: React.FC<FormProps> = ({ setStep, setAdmin }) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  // Monitor email input for potential lookups
  const currentEmail = watch("email");

  const { 
    mutate: createAdminAccount, 
    isPending: isCreatePending
  } = useCreateAdminAccount();
  
  const { 
    refetch: fetchAdminData 
  } = useGetUserByEmail(currentEmail || "");

  const handleFormSubmit = async (data: FormValues) => {
    setFormError(null);
    const { firstName, lastName, email, password, telegramId } = data;
    const user: User = { firstName, lastName, email, password, telegramId };
    
    createAdminAccount(user, {
      onSuccess: (response) => {
        if (response?.data) {
          setAdmin(response.data);
          setStep(2); // Account created, move to verification step
          toast.success("Compte créé avec succès! Veuillez vérifier votre boîte mail pour le code d'activation.");
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Une erreur s'est produite";
        
        // Case 1: User already has an active account
        if (errorMessage.includes("Vous avez déjà un compte administrateur.")) {
          toast.info("Vous avez déjà inscrit, essayez de vous connecter!");
          navigate('/?login=true');
          return;
        }
        
        // // Case 2: User has an active account but no company
        // if (errorMessage.includes("User with email already has an active account")) {
        //   fetchAdminData()
        //     .then(response => {
        //       if (response?.data) {
        //         setAdmin(response.data);
        //         setStep(3); // Skip to company creation
        //         toast.info("Vous avez déjà un compte administrateur, créez votre entreprise maintenant!");
        //       }
        //     })
        //     .catch(() => {
        //       setFormError("Impossible de récupérer les informations de votre compte");
        //     });
        //   return;
        // }
        
        // Case 3: User exists but needs validation
        if (errorMessage.includes("Le compte existe mais n'est pas actif.")) {
          fetchAdminData()
            .then(response => {
              if (response?.data) {
                setAdmin(response.data);
                setStep(2); // Go to verification step
                toast.info("Vous avez déjà un compte administrateur mais il n'est pas activé. Consultez votre boîte mail pour le code d'activation.");
              }
            })
            .catch(() => {
              setFormError("Impossible de récupérer les informations de votre compte");
            });
          return;
        }
        
        // Default error case
        setFormError(errorMessage);
      }
    });
  };


  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      {formError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          {formError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input placeholder="Ala" label="Prénom" {...register("firstName")} />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Input placeholder="Ben Haj Saad" label="Nom" {...register("lastName")} />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <Input placeholder="votre@email.com" label="Email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <PasswordInput label="Mot de passe" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <PasswordInput label="Confirmez le mot de passe" {...register("verifiedPassword")} />
        {errors.verifiedPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.verifiedPassword.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Votre ID Telegram" label="Telegram ID (optionnel)" {...register("telegramId")} />
        {errors.telegramId && <p className="text-red-500 text-sm mt-1">{errors.telegramId.message}</p>}
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={isCreatePending}>
          {isCreatePending ? "Traitement en cours..." : "Créer le compte admin"}
        </Button>
      </div>
    </form>
  );
};

export default AdminSignUpForm;