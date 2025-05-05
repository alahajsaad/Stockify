// sidebarData.ts
import { LucideIcon } from "lucide-react";
import { Book,ShoppingBasket } from 'lucide-react';




export interface SidebarItemData {
  path: string;
  title: string;
  icon: LucideIcon;
  addButtonPath?:string;
  children?:SidebarItemData[]
}

export const sidebarData: SidebarItemData[] = [
  {
    title: "Tableau de bord",
    path: "/stockify",
    icon: Book,
    children : [
      {title: "Tableau de bord", path: "/dashboard",icon: Book,},
      {title: "Tableau de bord", path: "/dashboard",icon: Book,}
    ]
  },
  {
    title: "Produits",
    path: "/stockify/products",
    icon: ShoppingBasket,
    addButtonPath : "/stockify/products/add"
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