// sidebarData.ts
import { FaBook, FaChartLine, FaUser, FaCog, FaTicketAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { SidebarItemProps } from "../types";

export const sidebarData: SidebarItemProps[] = [
  {
    title: "Tableau de bord",
    path: "/dashboard",
    icon: FaChartLine,
  },
  {
    title: "Ajouter réparation",
    path: "/reparation",
    icon: IoMdAdd,
  },
  {
    title: "Historique de réparation",
    path: "/reparationFilter",
    icon: FaBook,
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: FaTicketAlt,
  },
  {
    title: "Profil",
    path: "/profile",
    icon: FaUser,
  },
  {
    title: "Paramètres",
    path: "/settings",
    icon: FaCog,
  }
];