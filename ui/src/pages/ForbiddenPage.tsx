import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Accès refusé</h2>
        <p className="text-gray-600 mb-6">
          Vous n'avez pas la permission d'accéder à cette page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
