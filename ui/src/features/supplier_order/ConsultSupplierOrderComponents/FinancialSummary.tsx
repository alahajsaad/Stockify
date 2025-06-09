type FinancialSummaryProps = {
    financialSummary: {THT: number ,TTC: number}
}

const FinancialSummary = ({financialSummary}: FinancialSummaryProps) => {
  return (
<div className="w-fit mt-4 bg-white shadow-lg rounded-lg border border-blue-100 p-3 ml-auto">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Hors Taxes :</span>
                    <span className="font-semibold text-gray-900">{financialSummary.THT}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Montant des Taxes :</span>
                    <span className="font-semibold text-gray-700">{financialSummary.TTC - financialSummary.THT}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center gap-1">
                        <span className="font-semibold text-gray-900">Total Toutes Taxes Comprises :</span>
                        <span className="font-bold text-lg text-blue-600">{financialSummary.TTC}</span>
                    </div>
                    </div>
                </div>
            </div>
  );
};
export default FinancialSummary;