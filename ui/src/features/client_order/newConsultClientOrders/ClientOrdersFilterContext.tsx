// context/ClientOrdersFilterContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DynamicPartner } from "@/services/api/partner/types";
import { DeliveryStatus, PaymentStatus } from "@/types";

type ClientOrdersFilterContextType = {
  partner: DynamicPartner | undefined;
  setPartner: (partner: DynamicPartner | undefined) => void;
  paymentStatus: PaymentStatus;
  setPaymentStatus: (status: PaymentStatus) => void;
  deliveryStatus: DeliveryStatus;
  setDeliveryStatus: (status: DeliveryStatus) => void;
  page: number;
  size: number;
  setPage: (page: number) => void;
  updateSearchParams: (params: Record<string, any>) => void;
};

const ClientOrdersFilterContext = createContext<ClientOrdersFilterContextType | undefined>(undefined);

export const ClientOrdersFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [partner, setPartner] = useState<DynamicPartner | undefined>(undefined);

  const page = parseInt(searchParams.get('page') || '0', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const paymentStatus = (searchParams.get('paymentStatus') || '') as PaymentStatus;
  const deliveryStatus = (searchParams.get('deliveryStatus') || '') as DeliveryStatus;

  const updateSearchParams = (params: Record<string, any>) => {
    const currentParams: Record<string, string> = {};
    searchParams.forEach((v, k) => (currentParams[k] = v));

    const merged = { ...currentParams, ...params };
    const filtered: Record<string, string> = {};
    Object.entries(merged).forEach(([k, v]) => {
      if (v !== '' && v != null) filtered[k] = v;
    });

    setSearchParams(filtered);
  };

  return (
    <ClientOrdersFilterContext.Provider
      value={{
        partner,
        setPartner,
        paymentStatus,
        setPaymentStatus: (status) => updateSearchParams({ paymentStatus: status }),
        deliveryStatus,
        setDeliveryStatus: (status) => updateSearchParams({ deliveryStatus: status }),
        page,
        size,
        setPage: (p) => updateSearchParams({ page: p.toString() }),
        updateSearchParams,
      }}
    >
      {children}
    </ClientOrdersFilterContext.Provider>
  );
};

export const useClientOrdersFilter = () => {
  const context = useContext(ClientOrdersFilterContext);
  if (!context) {
    throw new Error("useClientOrdersFilter must be used within a ClientOrdersFilterProvider");
  }
  return context;
};
