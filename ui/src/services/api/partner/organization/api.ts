// organization api.ts

import { request } from "@/services/config/request";
import { ApiResponse } from "@/types";
import { Organization } from "../types";





export const getOrganizationById = (id: number): Promise<ApiResponse<Organization>> => {
  return request<Organization>({
    url: `/organization/${id}`,
    method: "get",
  });
};


export const addOrganization = (organization: Organization): Promise<ApiResponse<Organization>> => {
  return request<Organization>({
    url: "/organization",
    method: "post",
    data: organization,
  });
};


export const updateOrganization = (organization: Organization): Promise<ApiResponse<Organization>> => {
  return request<Organization>({
    url: "/organization",
    method: "put",
    data: organization,
  });
};
