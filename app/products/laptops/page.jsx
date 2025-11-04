// app/laptops/page.jsx
"use client";

import ProductsList from "../../components/ui/ProductsList";



export default function LaptopsPage() {
  return (
    <ProductsList
      title="Our Latest Laptops"
      product="Laptops"
      category="Laptops"
      link="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    />
  );
}
