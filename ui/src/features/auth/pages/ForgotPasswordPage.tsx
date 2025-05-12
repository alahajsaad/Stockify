import ForgotPasswordForm from "../forms/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
  <div className="card w-[400px]">
    <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
      Mot de passe oublié ?
    </h2>
    <p className="text-sm text-center text-gray-500 mb-4">
      Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
    </p>
    <ForgotPasswordForm />
  </div>
</div>

  );
};

export default ForgotPasswordPage;
