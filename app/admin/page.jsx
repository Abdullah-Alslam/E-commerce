"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AddProduct from "./AddProduct";
import ManageProducts from "./MangeProducts";
import DashboardOverview from "./DashboardOverView";
import Users from "./Users";
import GeneralSettings from "./generalSettings";
import AddUser from "./AddUser";

export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [over, setOver] = useState("");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setSection={setSection} setOver={setOver} />

      {/* Pages */}
      {section === "dashboard" && (
        <DashboardOverview setSection={setSection} setOver={setOver} />
      )}
      {section === "add"   && <AddProduct />}
      {section === "manage" && <ManageProducts />}
      {section === "users" && <Users />}
      {section === "settings" && <GeneralSettings />}
      {section === "add user" && <AddUser />}
    </div>
  );
}
