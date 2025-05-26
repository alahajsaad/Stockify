import axios from "axios";
import { BASE_URL } from "src/lib/utils";


export const fileRequest = (config: {
  url: string;
  method: "get" | "post";
}): Promise<Blob> => {
  return axios({
    ...config,
    baseURL: BASE_URL, // à adapter
    responseType: "blob",
  }).then(res => res.data);
};
