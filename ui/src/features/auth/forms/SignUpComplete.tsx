import { Link } from "react-router-dom";
import { Button } from "src/components/ui";
import { CheckCircle } from 'lucide-react';
type SignUpCompleteProps = {
  fullName : string ,
  companyName : string

}
const SignUpComplete : React.FC<SignUpCompleteProps> = ({fullName,companyName}) => {
    return (
        <div className="flex flex-col items-center text-center py-4">
        <div className="mb-6 text-primary">
          <CheckCircle size={64} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Félicitations!</h2>
        
        <p className="text-gray-600 mb-6">
          <span className="font-bold">{fullName}</span> , votre compte administrateur pour <span className="font-bold">{companyName}</span> a été créé avec succès.
        </p>
        
        <Link to="/?login=true">
          <Button className="w-full">
              Se connecter pour accéder à votre tableau de bord.
          </Button>
        </Link>
      </div>
    );
}
export default SignUpComplete ;