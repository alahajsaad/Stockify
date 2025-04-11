import { toast } from "react-toastify";
import { ApiResponse } from "src/types";

export const toastHandler = <T>(responsePromise: Promise<ApiResponse<T>>): void => {
  responsePromise.then((response) => {
    if (response.status === 'success') {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  });
};
