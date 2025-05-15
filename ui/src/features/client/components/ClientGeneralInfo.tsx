import { Button } from "src/components/ui";
import { Client } from "../types";
import { Mail, Phone, MapPin, CalendarDays } from "lucide-react";

type GeneralInfoProps = {
  client: Client;
};

const ClientGeneralInfo: React.FC<GeneralInfoProps> = ({ client }) => {
  return (
    <div className="border-gray-200 rounded space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">
          {client.firstName} {client.lastName}
        </p>
        <Button>Modifier</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-2">
          <Mail className="mt-1 text-gray-500" />
          <p>{client.email || "Non renseigné"}</p>
        </div>

        <div className="flex gap-1.5">
            <Phone className="mt-1 text-gray-500" />
            <div className="flex flex-col gap-1">
                {client.phoneNumbers?.length > 0 ? (
                client.phoneNumbers.map((phone) => (
                    <p key={phone.id} className="text-sm text-gray-800">
                    {phone.number}
                    </p>
                ))
                ) : (
                <p className="text-sm text-gray-500">Aucun numéro de téléphone</p>
                )}
            </div>
        </div>

        

        {/* {client.createdAt && (
          <div className="flex items-start gap-2">
            <CalendarDays className="mt-1 text-gray-500" />
            <p>{new Date(client.createdAt).toLocaleDateString()}</p>
          </div>
        )} */}

        <div className="flex items-start gap-2">
          <MapPin className="mt-1 text-gray-500" />
          <p>{"Adresse non renseignée"}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientGeneralInfo;
