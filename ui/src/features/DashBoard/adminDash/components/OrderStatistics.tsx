import { Currency } from "@/lib/currency";

interface OrderStatisticsData {
    totalUnpaid: number;
    totalUndelivered: number;
    totalAmountToPay: number;
    totalAmountIncludingTaxToPay: number;
}

interface OrderStatisticsProps {
    title: string;
    isPending: boolean;
    statistics: OrderStatisticsData | undefined;
}

const LoaderCard = () => (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse flex-1 min-w-64">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
    </div>
);

const StatisticCard = ({ icon, title, stats }: { icon: React.ReactNode; title: string; stats: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex-1 min-w-64">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        {stats}
    </div>
);

const OrderStatistics = ({ title, isPending, statistics }: OrderStatisticsProps) => {
    if (isPending) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <LoaderCard />
                    <LoaderCard />
                </div>
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <div className="text-center text-gray-500 p-6">Aucune statistique disponible</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatisticCard
                    icon={
                        <div className="bg-red-100 rounded-full p-1.5 mr-2">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                            </svg>
                        </div>
                    }
                    title="Statistiques de paiement"
                    stats={
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Commandes impayées :</span>
                                <span className="text-base font-medium text-red-600">{statistics.totalUnpaid}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Montant à payer :</span>
                                <span className="text-base font-medium text-gray-900">
                                    {statistics.totalAmountToPay} {Currency}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="text-sm font-medium text-gray-700">Total TTC :</span>
                                <span className="text-lg font-bold text-red-600">
                                    {statistics.totalAmountIncludingTaxToPay} {Currency}
                                </span>
                            </div>
                        </div>
                    }
                />

                <StatisticCard
                    icon={
                        <div className="bg-orange-100 rounded-full p-1.5 mr-2">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                />
                            </svg>
                        </div>
                    }
                    title="Statut de livraison"
                    stats={
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">{statistics.totalUndelivered}</div>
                            <div className="text-sm text-gray-600">Commandes en attente de livraison</div>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default OrderStatistics;
