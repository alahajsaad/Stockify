import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Package } from "lucide-react";

import { SearchInput } from "src/components/ui";
import TableNav from "src/components/ui/TableNav";
import PartnerTable from "../components/PartnerTable";
import { useGetPartners } from "@/services/api/partner/hooks";
import { Paths } from "@/lib/paths";

// Types
type PartnerType = "CLIENT" | "SUPPLIER";


// Constants
const INITIAL_PAGE = 0;
const DEFAULT_PAGE_SIZE = 8;

const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  CLIENT: "client",
  SUPPLIER: "fournisseur",
};

const SEARCH_PLACEHOLDERS: Record<PartnerType, string> = {
  CLIENT: "Rechercher un client par nom",
  SUPPLIER: "Rechercher un fournisseur par nom",
};

const ConsultPartnersPage: React.FC = () => {
  // State
  const [page, setPage] = useState(INITIAL_PAGE);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchKey, setSearchKey] = useState<string>("");

  // Hooks
  const location = useLocation();
  console.log(location.pathname)
  // Memoized values
  const partnerType = useMemo((): PartnerType => {
    return location.pathname === "/stockify/" + Paths.clients ? "CLIENT" : "SUPPLIER";
  }, [location.pathname]);

  const partnerTypeName = useMemo(() => {
    return PARTNER_TYPE_LABELS[partnerType];
  }, [partnerType]);

  const searchPlaceholder = useMemo(() => {
    return SEARCH_PLACEHOLDERS[partnerType];
  }, [partnerType]);

  // API Hook
  const { 
    data: partners, 
    isPending, 
    refetch,
    error 
  } = useGetPartners({
    keyword: searchKey || undefined,
    partnerType,
    page,
    size,
  });

  // Callbacks
  const handleSearchChange = useCallback((newSearchKey: string) => {
    setSearchKey(newSearchKey);
    setPage(INITIAL_PAGE); // Reset to first page when searching
  }, []);



  // Effects
  useEffect(() => {
    refetch();
  }, [searchKey, page, refetch]);

  // Reset page when partner type changes
  useEffect(() => {
    setPage(INITIAL_PAGE);
    setSearchKey("");
  }, [partnerType]);

  // Render helpers
  const renderLoadingSpinner = () => (
    <div className="w-full flex justify-center items-center py-20">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        role="status"
        aria-label="Chargement en cours"
      />
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Package className="h-16 w-16 text-gray-400 mb-4" aria-hidden="true" />
      <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
        Aucun {partnerTypeName} trouvé
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Essayez de modifier vos critères de recherche
      </p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-red-500 mb-4">
        <Package className="h-16 w-16" aria-hidden="true" />
      </div>
      <p className="text-xl font-medium text-red-600 dark:text-red-400">
        Erreur lors du chargement
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Veuillez réessayer plus tard
      </p>
      <button
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );

  const renderContent = () => {
    if (isPending) {
      return renderLoadingSpinner();
    }

    if (error) {
      return renderError();
    }

    const hasPartners = partners?.content && partners.content.length > 0;

    if (!hasPartners) {
      return renderEmptyState();
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <PartnerTable partners={partners.content} />
        <TableNav 
          data={partners} 
          page={page} 
          setPage={setPage} 
        />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SearchInput
        setSearchKey={handleSearchChange}
        isPending={isPending}
        placeholder={searchPlaceholder}
        value={searchKey}
      />
      {renderContent()}
    </div>
  );
};

export default ConsultPartnersPage;