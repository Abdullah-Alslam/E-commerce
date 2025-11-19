// app/laptops/page.jsx
"use client";

import ProductsList from "../../components/Product/ProductsList";

export default function LaptopsPage() {
  return (
    <ProductsList
      title="Our Latest Laptops"
      product="Laptops"
      category="Laptops"
      link="/images/przemyslaw-marczynski-OUPW0koc2Wg-unsplash.jpg"
    />
  );
}
