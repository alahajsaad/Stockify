

import { 
  Building2, 
  Users, 
  TestTube, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Calculator 
} from 'lucide-react';
import { Card, CardBody } from 'src/components/ui/Card';

interface CompanyMetricsDto {
  totalCompanies: number;
  totalUsers: number;
  companiesOnTrialPlan: number;
  companiesOnStandardPlan: number;
  companiesWithExpiredPlans: number;
  newCompaniesThisMonth: number;
  averageUsersPerCompany: number;
}

const CompanyMetrics = () => {
  // Mock data - in real app this would come from API
  const metrics: CompanyMetricsDto = {
    totalCompanies: 142,
    totalUsers: 2856,
    companiesOnTrialPlan: 23,
    companiesOnStandardPlan: 96,
    companiesWithExpiredPlans: 8,
    newCompaniesThisMonth: 17,
    averageUsersPerCompany: 20.1
  };

  const metricCards = [
    {
      title: "Entreprises",
      value: metrics.totalCompanies.toLocaleString(),
      percentage: null,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Utilisateurs",
      value: metrics.totalUsers.toLocaleString(),
      percentage: null,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "En Essai",
      value: metrics.companiesOnTrialPlan.toLocaleString(),
      percentage: ((metrics.companiesOnTrialPlan / metrics.totalCompanies) * 100).toFixed(1),
      icon: TestTube,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Standard",
      value: metrics.companiesOnStandardPlan.toLocaleString(),
      percentage: ((metrics.companiesOnStandardPlan / metrics.totalCompanies) * 100).toFixed(1),
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Expirés",
      value: metrics.companiesWithExpiredPlans.toLocaleString(),
      percentage: ((metrics.companiesWithExpiredPlans / metrics.totalCompanies) * 100).toFixed(1),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Nouveaux",
      value: metrics.newCompaniesThisMonth.toLocaleString(),
      percentage: ((metrics.newCompaniesThisMonth / metrics.totalCompanies) * 100).toFixed(1),
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Moy. Users",
      value: metrics.averageUsersPerCompany.toFixed(1),
      percentage: null,
      icon: Calculator,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Métriques Entreprises
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre plateforme
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {metricCards.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200 border-0 shadow-sm">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-md ${metric.bgColor}`}>
                  <metric.icon className={`h-3.5 w-3.5 ${metric.color}`} />
                </div>
                {metric.title === "Expirés" && metrics.companiesWithExpiredPlans > 0 && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-1">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                  {metric.percentage && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.percentage}%
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {metric.title}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyMetrics;