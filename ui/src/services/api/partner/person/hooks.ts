import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "../types";
import { addPerson, updatePerson } from "./api";



export const useAddPerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Person, Error, Person>({
    mutationFn: (person: Person) =>
      addPerson(person).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Person;
      }),
    onSuccess: (response) => {
      // Update the cache with the new category
      queryClient.setQueryData(['persons'], (oldData: Person[] | undefined) => {
        // If we don't have any existing data, create a new array with just the new object
        if (!oldData) {
          return [response];
        }
        // Otherwise add the new object to the existing array
        return [...oldData, response];
      });
    }
  });
};

export const useUpadtePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Person, Error, Person>({
    mutationFn: (person: Person) =>
      updatePerson(person).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Person;
      }),
    onSuccess: (response) => {
      // Update the cache with the new category
      queryClient.setQueryData(['persons'], (oldData: Person[] ) => {
        // update the existing array with the updated object
        return [...oldData, response];
      });
    }
  });
};