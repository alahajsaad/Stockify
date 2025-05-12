import { Button, PasswordInput } from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "src/services/api/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { PasswordResetRequestDto } from "src/types";

const formSchema = z
  .object({
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

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");
  const { mutate: resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    if (!token || !email) {
      toast.error("Lien de réinitialisation invalide.");
      navigate("/forgotPassword");
    }
  }, [token, email, navigate]);

  const handleFormSubmit = (data: FormValues) => {
    const request: PasswordResetRequestDto = {
      email: email!,
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: token!,
    };
    console.log(request)
    resetPassword(request, {
      onSuccess: (response) => {
        toast.success(response.message || "Mot de passe mis à jour avec succès");
        navigate("/?login=true");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Erreur lors de la réinitialisation"
        );
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <PasswordInput label="Nouveau mot de passe" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <PasswordInput
          label="Confirmer le mot de passe"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Traitement en cours..." : "Changer mon mot de passe"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;