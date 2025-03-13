// RepairDetailsPage.tsx
import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaTools, FaPlus, FaHistory } from 'react-icons/fa';
//import { useParams } from 'react-router-dom';

// Types
interface PhoneNumber {
  id: number;
  number: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phoneNumbers: PhoneNumber[];
}

interface Machine {
  id: number;
  reference: string;
  designation: string;
  client: Client;
}

interface RepairDetail {
  id: number;
  description: string;
  price: number;
}

interface Repair {
  id: number;
  callNumber: string;
  customerComplaint: string;
  entryDate: string;
  releaseDate: string | null;
  state: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  detailsList: RepairDetail[];
  machine: Machine;
}

// Données d'exemple pour la réparation actuelle
const currentRepair: Repair = {
  id: 123,
  callNumber: "REP-2025-0034",
  customerComplaint: "L'appareil ne s'allume plus après une chute. L'écran semble fissuré et le boîtier est légèrement endommagé sur le côté droit.",
  entryDate: "2025-03-01",
  releaseDate: null,
  state: "IN_PROGRESS",
  detailsList: [
    {
      id: 1,
      description: "Remplacement écran LCD",
      price: 120
    },
    {
      id: 2,
      description: "Réparation carte mère",
      price: 85
    }
  ],
  machine: {
    id: 45,
    reference: "LAPTOP-XPS15-9560",
    designation: "Dell XPS 15 (2023)",
    client: {
      id: 78,
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      phoneNumbers: [
        {
          id: 1,
          number: "+33 6 12 34 56 78"
        },
        {
          id: 2,
          number: "+33 1 98 76 54 32"
        }
      ]
    }
  }
};

// Données d'exemple pour la dernière réparation de la même machine
const lastRepair: Repair = {
  id: 98,
  callNumber: "REP-2024-0187",
  customerComplaint: "Surchauffe anormale et ventilateurs bruyants lors de l'utilisation.",
  entryDate: "2024-11-15",
  releaseDate: "2024-11-22",
  state: "COMPLETED",
  detailsList: [
    {
      id: 1,
      description: "Nettoyage système de refroidissement",
      price: 45
    },
    {
      id: 2,
      description: "Remplacement ventilateur principal",
      price: 65
    },
    {
      id: 3,
      description: "Application pâte thermique CPU/GPU",
      price: 20
    }
  ],
  machine: {
    id: 45,
    reference: "LAPTOP-XPS15-9560",
    designation: "Dell XPS 15 (2023)",
    client: {
      id: 78,
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      phoneNumbers: [
        {
          id: 1,
          number: "+33 6 12 34 56 78"
        }
      ]
    }
  }
};

const RepairDetailsPage: React.FC = () => {
 // const { id } = useParams<{ id: string }>();
  const [repair] = useState<Repair>(currentRepair);
  const [previousRepair] = useState<Repair | null>(lastRepair);
  const [isAddingDetail, setIsAddingDetail] = useState(false);
  const [newDetail, setNewDetail] = useState<{ description: string; price: number }>({
    description: '',
    price: 0
  });

  // Formatage de date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non définie";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Gestion de l'état
  const getStateLabel = (state: Repair['state']) => {
    const states = {
      PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
      IN_PROGRESS: { label: "En cours", color: "bg-blue-100 text-blue-800" },
      COMPLETED: { label: "Terminée", color: "bg-green-100 text-green-800" },
      CANCELLED: { label: "Annulée", color: "bg-red-100 text-red-800" }
    };
    return states[state] || { label: state, color: "bg-gray-100 text-gray-800" };
  };

  // Calculer le total
  const calculateTotal = (details: RepairDetail[]) => {
    return details.reduce((total, detail) => total + detail.price, 0);
  };

  // Gestion de l'ajout d'un nouveau détail
  const handleAddDetail = () => {
    // Simuler l'ajout d'un détail (dans une application réelle, vous appelleriez une API)
    // ...
    setIsAddingDetail(false);
    setNewDetail({ description: '', price: 0 });
  };

  const stateInfo = getStateLabel(repair.state);

  return (
    <div className="container mx-auto p-4">
      {/* En-tête avec informations principales */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Réparation #{repair.callNumber}
              </h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${stateInfo.color}`}>
                {stateInfo.label}
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <FaCalendarAlt className="text-blue-600 mr-2" />
                <span className="text-sm font-medium">Entrée: {formatDate(repair.entryDate)}</span>
              </div>
              <div className="flex items-center justify-end">
                <FaCalendarAlt className="text-blue-600 mr-2" />
                <span className="text-sm font-medium">
                  Sortie: {formatDate(repair.releaseDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informations client et machine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border-t border-gray-100">
          {/* Informations client */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              <FaUser className="inline-block mr-2 text-blue-600" />
              Informations client
            </h2>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-800 mb-2">{repair.machine.client.name}</p>
              <p className="flex items-center text-gray-600 text-sm mb-1">
                <FaEnvelope className="mr-2 text-blue-500" />
                {repair.machine.client.email}
              </p>
              {repair.machine.client.phoneNumbers.map(phone => (
                <p key={phone.id} className="flex items-center text-gray-600 text-sm mb-1">
                  <FaPhone className="mr-2 text-blue-500" />
                  {phone.number}
                </p>
              ))}
            </div>
          </div>

          {/* Informations machine */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              <FaTools className="inline-block mr-2 text-blue-600" />
              Informations appareil
            </h2>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-800 mb-2">{repair.machine.designation}</p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Référence:</span> {repair.machine.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Description du problème */}
        <div className="p-6 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Description du problème</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700">{repair.customerComplaint}</p>
          </div>
        </div>
      </div>

      {/* Détails de la réparation */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Détails de la réparation</h2>
          <button 
            onClick={() => setIsAddingDetail(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Ajouter un détail
          </button>
        </div>

        {/* Tableau des détails */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-right">Prix</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {repair.detailsList.map(detail => (
                  <tr key={detail.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-left">{detail.description}</td>
                    <td className="py-3 px-4 text-right font-medium">{detail.price.toFixed(2)} €</td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Modifier
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {isAddingDetail && (
                  <tr className="border-b border-gray-100 bg-blue-50">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Description"
                        value={newDetail.description}
                        onChange={(e) => setNewDetail({...newDetail, description: e.target.value})}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-full text-right"
                        placeholder="0.00"
                        value={newDetail.price || ''}
                        onChange={(e) => setNewDetail({...newDetail, price: parseFloat(e.target.value) || 0})}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                        onClick={handleAddDetail}
                      >
                        Ajouter
                      </button>
                      <button 
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => setIsAddingDetail(false)}
                      >
                        Annuler
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 text-right font-semibold">Total:</td>
                  <td className="py-3 px-4 text-right font-bold">{calculateTotal(repair.detailsList).toFixed(2)} €</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Historique des réparations */}
      {previousRepair && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gray-50 p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaHistory className="mr-2 text-blue-600" />
              Dernière réparation de cette machine
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStateLabel(previousRepair.state).color} mb-2`}>
                {getStateLabel(previousRepair.state).label}
              </span>
              <div className="flex justify-between items-center flex-wrap">
                <p className="font-medium text-gray-800">#{previousRepair.callNumber}</p>
                <div className="text-sm text-gray-600">
                  {formatDate(previousRepair.entryDate)} - {formatDate(previousRepair.releaseDate)}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{previousRepair.customerComplaint}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Détails effectués</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                      <th className="py-2 px-4 text-left border-b">Description</th>
                      <th className="py-2 px-4 text-right border-b">Prix</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {previousRepair.detailsList.map(detail => (
                      <tr key={detail.id} className="border-b border-gray-100">
                        <td className="py-2 px-4 text-left">{detail.description}</td>
                        <td className="py-2 px-4 text-right">{detail.price.toFixed(2)} €</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 text-right font-medium">Total:</td>
                      <td className="py-2 px-4 text-right font-bold">{calculateTotal(previousRepair.detailsList).toFixed(2)} €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairDetailsPage;