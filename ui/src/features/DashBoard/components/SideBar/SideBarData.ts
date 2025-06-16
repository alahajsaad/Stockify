import { LucideIcon, ShoppingBasket ,Percent , Shapes , Users , User ,PackageMinus ,PackagePlus ,House, Building2, Shield  } from "lucide-react";
import { useAuth } from "src/features/auth/components/AuthProvider";
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




type SidebarEntry = SidebarItemData | SidebarParentItemData;

export const useSidebarData = (): SidebarEntry[] => {
  const { user } = useAuth();

  const commonItems: SidebarEntry[] = [
    {
      type: "Child",
      title: "Tableau de bord",
      openLink: Paths.dashboard,
      icon: House,
    },
  ];

  const adminItems: SidebarEntry[] = [
    {
      type: "Child",
      title: "Commandes client",
      openLink: Paths.clientOrders,
      icon: PackageMinus,
      addLink: Paths.addClientOrder,
    },
    {
      type: "Child",
      title: "Commandes fournisseur",
      openLink: Paths.supplierOrders,
      icon: PackagePlus,
      addLink: Paths.addSupplierOrder,
    },
    {
      type: "Child",
      title: "Articles",
      openLink: Paths.products,
      icon: ShoppingBasket,
      addLink: "/stockify/products/add",
    },
    {
      type: "Child",
      title: "Fournisseurs",
      openLink: Paths.suppliers,
      addLink: Paths.addSupplier,
      icon: User,
    },
    {
      type: "Child",
      title: "Clients",
      openLink: Paths.clients,
      addLink: Paths.addClient,
      icon: Users,
    },
    {
      type: "Child",
      title: "Categories",
      openLink: Paths.categories,
      addLink: Paths.addCategory,
      icon: Shapes,
    },
    {
      type: "Child",
      title: "TVA",
      openLink: Paths.vats,
      addLink: Paths.addVat,
      icon: Percent,
    },
  ];

  const employeeItems: SidebarEntry[] = [
    {
      type: "Child",
      title: "Commandes client",
      openLink: Paths.clientOrders,
      icon: PackageMinus,
      addLink: Paths.addClientOrder,
    },
    {
      type: "Child",
      title: "Produits",
      openLink: "/stockify/products",
      icon: ShoppingBasket,
      addLink: "/stockify/products/add",
    },
  ];

  const superAdminItems: SidebarEntry[] = [
    {
      type: "Child",
      title: "Entreprises",
      openLink: Paths.companies,
      icon: Building2,
    },
    {
      type: "Child",
      title: "Abonnements",
      openLink: Paths.subscriptions,
      icon: Shield,
    },
  ];

  const role = user?.scope;

  let roleItems: SidebarEntry[] = [];

  switch (role) {
    case "ROLE_ADMIN":
      roleItems = adminItems;
      break;
    case "ROLE_EMPLOYEE":
      roleItems = employeeItems;
      break;
    case "ROLE_SUPER_ADMIN":
      roleItems = superAdminItems;
      break;
    default:
      roleItems = [];
  }

  return [...commonItems, ...roleItems];
};