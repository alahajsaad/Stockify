// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useGetClientById } from "src/services/api/client";
// import ClientGeneralInfo from "../components/clientGeneralInfo";

// const ConsultClientPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const numericId = id ? parseInt(id, 10) : -1;

//   const {
//     data: client,
//     isPending,
//     refetch,
//     isError,
//   } = useGetClientById(numericId);

//   useEffect(() => {
//     if (numericId > 0) refetch();
//   }, [numericId, refetch]);

//   if (isPending) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
//       </div>
//     );
//   }

//   if (isError || !client) {
//     return (
//       <div className="text-center text-red-600 font-semibold py-10">
//         Échec du chargement des données du client.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white border rounded-lg   max-w-5xl mx-auto px-4 py-6">
//       <ClientGeneralInfo client={client} />
//     </div>
//   );
// };

// export default ConsultClientPage;
