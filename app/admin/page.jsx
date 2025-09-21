"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AddProduct from "./AddProduct";
import ManageProducts from "./MangeProducts";
import DashboardOverview from "./DashboardOverView";
import Users from "./Users";
import GeneralSettings from "./generalSettings";
export default function AdminPage() {
  const [section, setSection] = useState("add"); // "add" أو "manage"

  return (
    <div className="flex h-screen">
      <Sidebar setSection={setSection} />
      {section === "add" && <AddProduct />}
      {section === "manage" && <ManageProducts />}
      {section === "dashboard" && <DashboardOverview />}
      {section === "users" && <Users />}
      {section === "settings" && <GeneralSettings />}
    </div>
  );
}
