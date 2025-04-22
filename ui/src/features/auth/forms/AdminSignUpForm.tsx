import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, PasswordInput } from "src/components/ui";
import { getUserById } from "src/services/api/user";
import { useCreateAdminAccount } from "src/services/hooks/useUser";
import { ApiResponse, User, UserResponseDto } from "src/types";
import {  z } from "zod";

// ✅ Validation schema
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
  setAdmin : (admin : UserResponseDto) => void
};



const AdminSignUpForm: React.FC<FormProps> = ({ setStep , setAdmin }) => {
  const [adminId,setAdminId] =useState<number>()
  //const navigate = useNavigate()
  console.log("adminId :" + adminId)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  


  const { data: userData } = useQuery<ApiResponse<UserResponseDto>, Error>({
    queryKey: ['getUserById', adminId],
    queryFn: () => getUserById(adminId!),
    enabled: !!adminId,
   
  });
  useEffect(() => {
    if (userData?.data) {
      setAdmin(userData.data);
    }
    
  }, [userData?.data ,setAdmin]);
  




  const mutation = useCreateAdminAccount({
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        setAdmin(response.data);
        setStep(2);
      } else if (response.status === "error" && typeof response.data === 'number') {
        setAdminId(response.data); // triggers useEffect
      }
    }
    
   
  });

  const handleFormSubmit = (data: FormValues) => {
    const { firstName, lastName, email, password, telegramId } = data;
    const user: User = {firstName,lastName,email,password,telegramId};
    mutation.mutate(user);
  };

  return (
   
     
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input placeholder="Ala" label="Prénom" {...register("firstName")} />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <Input placeholder="Ben Haj Saad" label="Nom" {...register("lastName")} />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <Input placeholder="votre@email.com" label="Email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <PasswordInput label="Mot de passe" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <PasswordInput label="Confirmez le mot de passe" {...register("verifiedPassword")} />
        {errors.verifiedPassword && (
          <p className="text-red-500">{errors.verifiedPassword.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Votre ID Telegram" label="Telegram ID" {...register("telegramId")} />
        {errors.telegramId && <p className="text-red-500">{errors.telegramId.message}</p>}
      </div>

      <div className="flex justify-end mt-[20px]">
        <Button type="submit">
          {mutation.isPending ? "Création en cours..." : "Créer le compte admin"}
        </Button>
      </div>
      
    </form>
   
  );
};

export default AdminSignUpForm;
