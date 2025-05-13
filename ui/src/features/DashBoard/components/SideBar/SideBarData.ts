import { LucideIcon, Book, ShoppingBasket ,Percent , Shapes , Users , User  } from "lucide-react";
import { Paths } from "src/lib/paths";

export type ItemType = "Parent" | "Child";

export interface SidebarItemData {
  type: "Child";
  openLink: string;
  addLink?: string;
  title: string;
  icon: LucideIcon;
}

export interface SidebarParentItemData {
  type: "Parent";
  title: string;
  icon: LucideIcon;
  children: SidebarItemData[];
}

export const sidebarData: (SidebarItemData | SidebarParentItemData)[] = [
  {
    type: "Parent",
    title: "Tableau de bord",
    icon: Book,
    children: [
      {
        type: "Child",
        openLink: "/anyThing",
        addLink: "/addlink",
        title: "newLink",
        icon: Book,
      },
      {
        type: "Child",
        openLink: "/anyThing2",
        title: "newLink2",
        icon: Book,
      },
    ],
  },
  {
    type: "Child",
    title: "Accueil",
    openLink: "/stockify",
    icon: Book,
  },
  {
    type: "Child",
    title: "Produits",
    openLink: "/stockify/products",
    icon: ShoppingBasket,
    addLink: "/stockify/products/add",
  },
  {
    type: "Child",
    title: "Historique de réparation",
    openLink: "/reparationFilter",
    icon: Book,
  },
  {
    type: "Child",
    title: "Fournisseurs",
    openLink: Paths.suppliers,
    addLink:Paths.addSupplier,
    icon: User ,
  },
   {
    type: "Child",
    title: "Clients",
    openLink: Paths.clients,
    addLink:Paths.addClient,
    icon: Users ,
  },
  {
    type: "Child",
    title: "Categories",
    openLink: Paths.categories,
    addLink:Paths.addCategory,
    icon: Shapes ,
  },
  {
    type: "Child",
    title: "TVA",
    openLink: Paths.vats,
    addLink:Paths.addVat,
    icon: Percent ,
  },
];