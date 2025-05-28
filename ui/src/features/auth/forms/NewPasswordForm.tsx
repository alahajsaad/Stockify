import { Button, PasswordInput } from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "src/services/api/auth";
import { toast } from "react-toastify";
import { UpdatePasswordRequest } from "src/types";
import { useAuth } from "../components/AuthProvider";

const formSchema = z
  .object({
    oldPassword: z.string().min(6, "Le mot de passe actuel doit contenir au moins 6 caractères"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

interface NewPasswordFormProps {
    onSuccess:() => void
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({onSuccess}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { user } = useAuth();
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const handleFormSubmit = (data: FormValues) => {
    if (!user) {
      toast.error("Utilisateur non authentifié");
      return;
    }

    const request: UpdatePasswordRequest = {
      email: user.sub,
      actualPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    console.log(request);

    updatePassword(request, {
      onSuccess: (response) => {
        onSuccess()
        toast.success(response.message || "Mot de passe mis à jour avec succès");
        reset();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Erreur lors de la mise à jour du mot de passe"
        );
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <PasswordInput
          label="Mot de passe actuel"
          {...register("oldPassword")}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
        )}
      </div>

      <div>
        <PasswordInput 
          label="Nouveau mot de passe" 
          {...register("password")} 
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <PasswordInput
          label="Confirmer le mot de passe"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex flex-col mt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Traitement en cours..." : "Changer mon mot de passe"}
        </Button>
      </div>
    </form>
  );
};

export default NewPasswordForm;