// app/mobiles/page.js
"use client";

import ProductsList from "../../components/ProductsList";

export default function TabletsPage() {
  return (
    <ProductsList
      category="Tablets"
      title="Our Latest Tablets"
      product="tablet"
      link="https://images.unsplash.com/photo-1587825140708-bb8b07e20439?auto=format&fit=crop&w=800&q=80"
    />
  );
}
