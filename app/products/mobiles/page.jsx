// app/mobiles/page.js
"use client";

import ProductsList from "../../components/Product/ProductsList";

export default function MobilesPage() {
  return (
    <ProductsList
      title="Our Latest Mobiles"
      product="mobiles"
      category="Mobiles"
      link="/images/mobile-section.jpg"
    />
  );
}
