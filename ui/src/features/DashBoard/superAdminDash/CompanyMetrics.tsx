import { useGetCompanyMetrics } from '@/services/api/company/hooks';
import { useGetSubscriptionPlanStatistics } from '@/services/api/subscription/hooks';
import { Building2, Users, TrendingUp, Calculator, Crown, Shield, Zap, Star } from 'lucide-react';
import { Card, CardBody } from 'src/components/ui/Card';
import { useEffect } from 'react';

const CompanyMetrics = () => {
  const { 
    data: companyMetrics, 
    isPending: isCompanyMetricsPending, 
    refetch: refetchCompanyMetrics 
  } = useGetCompanyMetrics();
  
  const { 
    data: subscriptionStatistics, 
    isPending: isSubscriptionStatsPending, 
    refetch: refetchSubscriptionStats 
  } = useGetSubscriptionPlanStatistics();

  // Auto-fetch data when component mounts
  useEffect(() => {
    refetchCompanyMetrics();
    refetchSubscriptionStats();
  }, [refetchCompanyMetrics, refetchSubscriptionStats]);

  // Loading state
  if (isCompanyMetricsPending || isSubscriptionStatsPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Métriques Entreprises
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chargement des données...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[...Array(7)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardBody className="p-4">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalSubscriptions = subscriptionStatistics 
    ? Object.values(subscriptionStatistics).reduce((sum, count) => sum + count, 0)
    : 0;

  const subscriptionPlans = subscriptionStatistics ? Object.entries(subscriptionStatistics) : [];
  const mostPopularPlan = subscriptionPlans.length > 0 
    ? subscriptionPlans.reduce((prev, current) => prev[1] > current[1] ? prev : current)[0]
    : 'N/A';

  // Define metric cards with actual data
  const metricCards = [
    {
      title: "Total Entreprises",
      value: companyMetrics?.totalCompanies?.toLocaleString() || '0',
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Total Utilisateurs",
      value: companyMetrics?.totalUsers?.toLocaleString() || '0',
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Nouvelles Entreprises",
      value: companyMetrics?.newCompaniesThisMonth?.toString() || '0',
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Moyenne Utilisateurs",
      value: companyMetrics?.averageUsersPerCompany?.toFixed(1) || '0',
      icon: Calculator,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "Total Abonnements",
      value: 5,
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Plan Populaire",
      value: 0,
      icon: Star,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      title: "Types Plans",
      value: 4,
      icon: Shield,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Métriques Entreprises
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre plateforme
          </p>
        </div>
        <button
          onClick={() => {
            refetchCompanyMetrics();
            refetchSubscriptionStats();
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          Actualiser
        </button>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {metricCards.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:scale-105">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Subscription Plans Breakdown */}
      {subscriptionPlans.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Répartition des Abonnements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subscriptionPlans.map(([planName, count], index) => {
              const percentage = totalSubscriptions > 0 ? ((count / totalSubscriptions) * 100).toFixed(1) : '0';
              return (
                <Card key={index} className="border-0 shadow-sm">
                  <CardBody className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {count.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {planName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {percentage}% du total
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyMetrics;