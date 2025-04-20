// sidebarData.ts
import { LucideIcon } from "lucide-react";
import { Book, BarChart, User, Settings, Ticket, Plus } from 'lucide-react';



export interface SidebarItemProps {
  path: string;
  title: string;
  icon: LucideIcon;
}

export const sidebarData: SidebarItemProps[] = [
  {
    title: "Tableau de bord",
    path: "/dashboard",
    icon: Book,
  },
  {
    title: "Ajouter réparation",
    path: "/reparation",
    icon: Book,
  },
  {
    title: "Historique de réparation",
    path: "/reparationFilter",
    icon: Book,
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: Book,
  },
  {
    title: "Profil",
    path: "/profile",
    icon: Book,
  },
  {
    title: "Paramètres",
    path: "/settings",
    icon: Book,
  }
];