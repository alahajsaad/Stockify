// import { useEffect } from 'react';
// import { UseFormReturn } from 'react-hook-form';
// import { useWatch } from 'react-hook-form';
// import { debounce } from 'lodash';

// interface UseAutoSaveProps<T = any> {
//   form: UseFormReturn<T>;
//   key: string;
//   debounceMs?: number;
// }

// export function useAutoSave<T = any>({ form, key, debounceMs = 1000 }: UseAutoSaveProps<T>) {
//   const formValues = useWatch({ control: form.control });
  
//   // Load saved form data on initial render
//   useEffect(() => {
//     try {
//       const savedData = localStorage.getItem(key);
//       if (savedData) {
//         const parsedData = JSON.parse(savedData);
//         form.reset(parsedData);
//       }
//     } catch (error) {
//       console.error('Error loading saved form data:', error);
//     }
//   }, [key, form]);
  
//   // Save form data on changes
//   useEffect(() => {
//     const saveFormData = debounce(() => {
//       try {
//         localStorage.setItem(key, JSON.stringify(formValues));
//       } catch (error) {
//         console.error('Error saving form data:', error);
//       }
//     }, debounceMs);
    
//     saveFormData();
    
//     return () => {
//       saveFormData.cancel();
//     };
//   }, [formValues, key, debounceMs]);
  
//   const clearSavedData = () => {
//     localStorage.removeItem(key);
//   };
  
//   return { clearSavedData };
// }
