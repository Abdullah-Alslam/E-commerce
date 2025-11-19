"use client";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import AddProduct from "./addproduct/AddProduct";
import ManageProducts from "./mangeproducts/MangeProducts";
import Users from "./users/Users";
import GeneralSettings from "./generalsettings/GeneralSettings";
import AddUser from "./adduser/AddUser";
import DashboardOverview from "./dashboardoverview/DashboardOverView";
import ProtectedRoute from "../roleMiddleware";

export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [over, setOver] = useState("");

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar setSection={setSection} setOver={setOver} />

        {/* Pages */}
        {section === "dashboard" && (
          <DashboardOverview setSection={setSection} setOver={setOver} />
        )}
        {section === "add" && <AddProduct />}
        {section === "manage" && <ManageProducts />}
        {section === "users" && <Users />}
        {section === "settings" && <GeneralSettings />}
        {section === "add user" && <AddUser />}
      </div>
    </ProtectedRoute>
  );
}
