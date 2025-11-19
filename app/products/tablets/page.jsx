// app/mobiles/page.js
"use client";

import ProductsList from "../../components/Product/ProductsList";

export default function TabletsPage() {
  return (
    <ProductsList
      category="Tablets"
      title="Our Latest Tablets"
      product="tablet"
      link="/images/sandesh-sharma-nER40PGjTPE-unsplash.jpg"
    />
  );
}
