import { request } from "@/services/config/request";
import { ApiResponse } from "@/types";
import { Person } from "../types";


export const addPerson = (person: Person): Promise<ApiResponse<Person>> => {
  return request<Person>({
    url: "/person",
    method: "post",
    data: person,
  });
};


export const updatePerson = (person: Person): Promise<ApiResponse<Person>> => {
  return request<Person>({
    url: "/person",
    method: "put",
    data: person,
  });
};


export const getPersonById = (id: number): Promise<ApiResponse<Person>> => {
  return request<Person>({
    url: `/person/${id}`,
    method: "get",
  });
};



