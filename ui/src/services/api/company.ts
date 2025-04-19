import { CompanyCreationDto, CompanyResponseDto } from "src/types/company";
import request from "./request";
import { ApiResponse } from "src/types";
import { toastHandler } from "./toastHandler";

export const createCompany = (company: CompanyCreationDto, adminId: number): Promise<ApiResponse<CompanyResponseDto>> => {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("taxNumber", company.taxNumber);
    formData.append("email", company.email);
    formData.append("phone", company.phone);
    formData.append("address", company.address);
    formData.append("city", company.city);
    formData.append("zipCode", company.zipCode);
    formData.append("logo", company.logo);
    formData.append("adminId", adminId.toString());
  
    const response = request<CompanyResponseDto>({
      url: `/company`, // URL correcte
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  
    toastHandler(response);
    return response;
  };
  