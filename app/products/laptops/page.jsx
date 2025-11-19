// app/laptops/page.jsx
"use client";

import ProductsList from "../../components/Product/ProductsList";

export default function LaptopsPage() {
  return (
    <ProductsList
      title="Our Latest Laptops"
      product="Laptops"
      category="Laptops"
      link="/images/laptop-section.jpg"
    />
  );
}
