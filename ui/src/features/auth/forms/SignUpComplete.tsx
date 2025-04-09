import { Link } from "react-router-dom";
import { Button } from "src/components/ui";
import { CheckCircle } from 'lucide-react';
const SignUpComplete : React.FC = () => {
    return (
        <div className="flex flex-col items-center text-center py-4">
        <div className="mb-6 text-primary">
          <CheckCircle size={64} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Félicitations!</h2>
        
        <p className="text-gray-600 mb-6">
          ala , votre compte administrateur pour stockify a été créé avec succès.
        </p>
        
        <Link to="/dashboard">
          <Button className="w-full">
            Accéder au tableau de bord
          </Button>
        </Link>
      </div>
    );
}
export default SignUpComplete ;