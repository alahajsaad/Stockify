import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Définir le type générique T
type UseSearchInputProps<T> = {
  queryKey: string;
  queryFn: () => Promise<T[]>;
};

const useSearchInput = <T,>({ queryKey, queryFn }: UseSearchInputProps<T>) => {
  const [selectedData, setSelectedData] = useState<T | null>(null);

  const { data: fetchedData, isLoading, isError, refetch} = useQuery<T[], Error>({
    queryKey: [queryKey],
    queryFn,
    enabled: false, 
  });

  return {
    data: fetchedData || [],
    isLoading,
    isError,
    selectedData,
    setSelectedData,
    refetch,
  };
};

export default useSearchInput;
