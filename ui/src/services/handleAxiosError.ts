import { AxiosError } from 'axios';

const handleAxiosError = (error: AxiosError): void => {
    if (error.response) {
      console.error(`Server responded with status ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  };

export default handleAxiosError ;