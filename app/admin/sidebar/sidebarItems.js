import {
  LayoutDashboard,
  PlusCircle,
  Boxes,
  Users,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
    section: "dashboard",
  },
  {
    title: "Add Product",
    icon: <PlusCircle className="w-5 h-5 text-green-400" />,
    section: "add",
  },
  {
    title: "Manage Products",
    icon: <Boxes className="w-5 h-5 text-yellow-400" />,
    section: "manage",
  },
  {
    title: "Add User",
    icon: <PlusCircle className="w-5 h-5 text-green-400" />,
    section: "add user",
  },
  {
    title: "Users",
    icon: <Users className="w-5 h-5 text-pink-400" />,
    section: "users",
  },
  {
    title: "Settings",
    icon: <Settings className="w-5 h-5 text-purple-400" />,
    section: "settings",
  },
];
