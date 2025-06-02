import { useEffect } from 'react';
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Building2, Users, MapPin, Phone, Mail, Calendar, Hash } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetUsersByCompany } from '@/services/api/appUser/hooks';
import { useGetCompanyById } from '@/services/api/company/hooks';
import CompanyEmployee from '../components/CompanyEmployee';
import SubscriptionHistory from '../components/SubscriptionHistory';

const ConsultCompanyPageSuperAdmin = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    
    // Company data hook
    const { data: company, isPending: isCompanyPending, refetch: refetchCompany } = useGetCompanyById(numericId);
    
    // Employees data hook - only fetch if company exists
    const { data: employees, isPending: isEmployeesPending, refetch: refetchEmployees } = useGetUsersByCompany(company?.id || -1);
    
    // Trigger company fetch when component mounts or ID changes
    useEffect(() => {
        if (numericId > 0) {
            refetchCompany();
        }
    }, [numericId, refetchCompany]);
    
    // Trigger employees fetch when company data is available
    useEffect(() => {
        if (company?.id) {
            refetchEmployees();
        }
    }, [company?.id, refetchEmployees]);
    
    // Handle loading states
    if (isCompanyPending) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Chargement des détails de l'entreprise...</div>
                </div>
            </div>
        );
    }
    
    // Handle company not found
    if (!company || numericId <= 0) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-red-600">Entreprise non trouvée</div>
                </div>
            </div>
        );
    }

    // Calculate years since creation
    const createdYear = new Date(company.createdAt).getFullYear();
    const yearsInBusiness = new Date().getFullYear() - createdYear;

    return (
        <div className="container mx-auto py-8 px-4 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="bg-primary/10 p-3 rounded-lg">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
                            <p className="text-muted-foreground">
                                Créée le {new Date(company.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                            {company.isNew && (
                                <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                                    Nouvelle entreprise
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Company Details Card */}
                <Card className="mb-8">
                    <CardBody className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Informations de l'entreprise</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3">
                                <Hash className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Numéro fiscal</p>
                                    <p className="font-medium">{company.taxNumber}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{company.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Téléphone</p>
                                    <p className="font-medium">{company.phone}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Adresse</p>
                                    <p className="font-medium">{company.address}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Ville</p>
                                    <p className="font-medium">{company.city}, {company.zipCode}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Tenant ID</p>
                                    <p className="font-medium">{company.tenantId}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-600 text-sm font-medium">Nombre d'utilisateurs</p>
                                    <p className="text-3xl font-bold text-blue-900">{company.numberOfUser}</p>
                                </div>
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardBody>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Abonnements</p>
                                    <p className="text-3xl font-bold text-green-900">{company.subscriptions?.length || 0}</p>
                                </div>
                                <Building2 className="h-8 w-8 text-green-600" />
                            </div>
                        </CardBody>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-600 text-sm font-medium">Années d'activité</p>
                                    <p className="text-3xl font-bold text-purple-900">{yearsInBusiness}</p>
                                </div>
                                <Calendar className="h-8 w-8 text-purple-600" />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Subscription History */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Historique des abonnements</h2>
                                {company.subscriptions && company.subscriptions.length > 0 ? (
                                    <SubscriptionHistory subscriptions={company.subscriptions} />
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Aucun abonnement trouvé
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Employee List */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Liste des employés</h2>
                                {isEmployeesPending ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Chargement des employés...
                                    </div>
                                ) : employees && employees.length > 0 ? (
                                    <CompanyEmployee employees={employees} />
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Aucun employé trouvé
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultCompanyPageSuperAdmin;