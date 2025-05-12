import ResetPasswordForm from "../forms/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-[400px] shadow-xl bg-white p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
          Réinitialiser le mot de passe
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Entrez votre nouveau mot de passe ci-dessous.
        </p>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
export default ResetPasswordPage
