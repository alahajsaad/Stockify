// Import des hooks nécessaires
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { DeliveryStatus, OrderLineRecord, PaymentStatus } from "@/types";
import { ClientOrderFullDto } from "@/services/api/ClientOrder/types";
import OrderLines from "@/components/order/orderDetails/OrderLines";
import { useGetClientOrderById, useUpdateClientOrder } from "@/services/api/ClientOrder/hooks";
import ClientOrderHeader from "../components/ClientOrderHeader";

const ClientOrderDetails: React.FC = () => {
    // Récupération de l'ID depuis l'URL
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    const navigate = useNavigate();
    const location = useLocation(); // Accès aux paramètres de l'URL précédente (filtres)

    // Requête pour récupérer les détails de la commande
    const { data: clientOrder, isPending, isError } = useGetClientOrderById(numericId);
    const [updatedClientOrder, setUpdatedClientOrder] = useState<ClientOrderFullDto | undefined>(undefined);
    const { mutate: updateClientOrder, isPending: isUpdating } = useUpdateClientOrder();

    // Fonction de mise à jour de la commande
    const handleUpdateClientOrder = () => {
        if (!updatedClientOrder) {
            console.warn('No client order to update');
            return;
        }

        const orderToUpdate: ClientOrderFullDto = {
            ...updatedClientOrder,
            clientOrderLine: { ...updatedClientOrder.clientOrderLine }
        };

        // Gestion des lignes à sauvegarder (nouveaux items)
        if (orderToUpdate.clientOrderLine.DO_SAVE?.length > 0) {
            orderToUpdate.clientOrderLine.DO_SAVE = orderToUpdate.clientOrderLine.DO_SAVE.map(orderLine => ({
                ...orderLine,
                id: null
            }));
        }

        // Suppression des lignes sans changement
        if (orderToUpdate.clientOrderLine.DO_NOTHING) {
            delete orderToUpdate.clientOrderLine.DO_NOTHING;
        }

        // Envoi de la mise à jour au serveur
        updateClientOrder(orderToUpdate, {
            onSuccess: (response) => {
                toast.success(response.message);
            }
        });
    };

    // Initialisation de l'état quand les données sont chargées
    useEffect(() => {
        if (clientOrder) {
            setUpdatedClientOrder(clientOrder);
        }
    }, [clientOrder]);

    // Mise à jour des lignes de commande (callback optimisé)
    const handleOrderLinesUpdate = useCallback((orderLines: OrderLineRecord) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) return prevState;

            return {
                ...prevState,
                clientOrderLine: orderLines
            };
        });
    }, []);

    // Mise à jour du statut de paiement
    const updatePaymentStatus = useCallback((paymentStatus: PaymentStatus) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) return prevState;
            if (prevState.paymentStatus === paymentStatus) return prevState;

            return {
                ...prevState,
                paymentStatus
            };
        });
    }, []);

    // Mise à jour du statut de livraison
    const updateDeliveryStatus = useCallback((deliveryStatus: DeliveryStatus) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) return prevState;
            if (prevState.deliveryStatus === deliveryStatus) return prevState;

            return {
                ...prevState,
                deliveryStatus
            };
        });
    }, []);

    // Gestion du chargement et des erreurs
    if (isPending) return <p>Chargement...</p>;
    if (isError || !clientOrder) return <p>Cette commande client n'a pas été trouvée.</p>;

    // On utilise la version mise à jour ou la donnée originale
    const orderData = updatedClientOrder || clientOrder;

    return (
        <>
            {/* Bouton retour qui conserve les filtres via location.search */}
            <button
                className="mb-4 text-blue-600 hover:underline"
                onClick={() => navigate(`/clientOrders?${location.search}`)}
            >
                Retour aux commandes
            </button>

            {/* Header et lignes de commande */}
            <ClientOrderHeader
                updatePaymentStatus={updatePaymentStatus}
                updateDeliveryStatus={updateDeliveryStatus}
                updateClientOrder={handleUpdateClientOrder}
                isPending={isUpdating}
                orderData={orderData}
            />
            <OrderLines
                orderLinesRecord={orderData.clientOrderLine}
                setOrderLines={handleOrderLinesUpdate}
            />
        </>
    );
};

export default ClientOrderDetails;
