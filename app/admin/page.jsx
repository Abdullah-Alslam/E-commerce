"use client";
import { useState } from "react";
import AddProduct from "./AddProduct";
import ManageProducts from "./MangeProducts";
import Sidebar from "./Sidebar";

export default function AdminPage() {
  const [section, setSection] = useState("add"); // "add" أو "manage"

  return (
    <div className="flex h-screen">
      <Sidebar setSection={setSection} />
      {section === "add" && <AddProduct />}
      {section === "manage" && <ManageProducts />}
    </div>
  );
}
