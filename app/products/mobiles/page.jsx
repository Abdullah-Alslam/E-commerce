// app/mobiles/page.js
"use client";

import ProductsList from "../../components/ui/ProductsList";



export default function MobilesPage() {
  return (
    <ProductsList
      title="Our Latest Mobiles"
      product="mobiles"
      category="Mobiles"
      link="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" // صورة تمثيلية للموبايلات
    />
  );
}
