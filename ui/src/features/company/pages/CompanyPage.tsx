import { useEffect, useState } from "react";
import { Building2, Edit, UserPlus } from "lucide-react";
import { Company, TokenPayload } from "src/types";
import { useAuth } from "src/features/auth/components/AuthProvider";
import { Button } from "src/components/ui";
import Modal from "src/components/ui/Modal";
import CompanyForm from "../components/CompanyForm";
import { useGetCompanyById } from "src/services/api/company";
import CompanyInfo from "../components/CompanyInfo";

const CompanyPage: React.FC = () => {
    const { user , updateUser } = useAuth();
    // Only call the API if user has a valid companyId (not 0)
    const shouldFetchCompany = user?.companyId && user.companyId > 0;
    const { data, isPending, refetch } = useGetCompanyById(
        shouldFetchCompany ? user.companyId : 0
    );
    const [company, setCompany] = useState<Company | undefined>();
    const [hasCompany, setHasCompany] = useState(false); // Nouvel état local
    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    console.log(company)
    useEffect(() => {
        if (!user?.companyId || user.companyId === 0) {
            // No company ID means no company exists
            setCompany(undefined);
            return;
        }
        
        if (shouldFetchCompany) {
            refetch();
            if (!isPending && data) {
                setCompany(data);
                
            }
        }
    }, [user?.companyId, refetch, data, isPending, shouldFetchCompany]);

    const toggleForm = (isEditing: boolean) => {
        setIsEditingCompany(isEditing);
    };

   const handleCompanyCreated = (newCompany: Company) => {
    setCompany(newCompany);
    setHasCompany(true);
    
    if (user && updateUser) {
        // S'assurer que toutes les propriétés sont présentes
        const updatedUser: TokenPayload = {
            tenantId: user.tenantId,
            sub: user.sub,
            exp: user.exp,
            iat: user.iat,
            id: user.id,
            fullName: user.fullName,
            companyId: newCompany.id, // Nouvelle valeur
            scope: user.scope
        };
        updateUser(updatedUser);
    }
};

    // Show loader only when we should be fetching and we are pending
    if (shouldFetchCompany && isPending) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    // Show company creation form if no company exists (companyId is 0 or undefined) AND we haven't just created one
    if ((!user?.companyId || user.companyId === 0) && !hasCompany && user) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <Building2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenue {user.fullName}</h1>
                    </div>
                    <CompanyForm 
                        adminId={user.id} 
                        setCompany={handleCompanyCreated} 
                    />
                </div>
            </div>
        );
    }

    // Show company details if company exists
    return (
      
        <div className="container mx-auto py-8 px-4">
              {company &&
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="bg-primary/10 p-3 rounded-lg">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
                            <p className="text-muted-foreground">
                                {company.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button
                            onClick={() => setIsEditingCompany(true)}
                            className="flex items-center space-x-2"
                        >
                            <Edit className="h-4 w-4" />
                            <span>Edit Company</span>
                        </Button>
                        <Button
                            onClick={() => setShowAddEmployee(true)}
                            className="flex items-center space-x-2"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Add Employee</span>
                        </Button>
                    </div>
                </div>

                {/* body section */}
                <div>
                    <CompanyInfo company={company} />
                </div>

                {/* Modal pour éditer l'entreprise */}
                <Modal
                    title="Modifier l'entreprise"
                    isOpen={isEditingCompany}
                    onClose={() => setIsEditingCompany(false)}
                    size="md"
                >
                    <CompanyForm 
                        adminId={user?.id || 0}
                        toggleForm={toggleForm} 
                        setCompany={setCompany}  
                        initialCompany={company} 
                    />
                </Modal>

                {/* Modal pour ajouter un employé */}
                <Modal
                    title="Ajouter un employé"
                    isOpen={showAddEmployee}
                    onClose={() => setShowAddEmployee(false)}
                    size="md"
                >
                    {/* Composant pour ajouter un employé à implémenter */}
                    <div>Formulaire d'ajout d'employé à implémenter</div>
                </Modal>
            </div>
}
        </div>
        
    );
};

export default CompanyPage;