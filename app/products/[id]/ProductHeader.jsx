export default function ProductHeader({ product, formatPrice }) {
  return (
    <header>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        {product.name}
      </h1>

      <p className="mt-1 text-xl font-semibold text-red-600 dark:text-red-400">
        {formatPrice(product.price)}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Category: {product.category}
      </p>
    </header>
  );
}
