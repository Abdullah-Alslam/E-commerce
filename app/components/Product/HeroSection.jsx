import Image from "next/image";

export default function HeroSection({ title, product, link, fetchProducts }) {
  return (
    <section className="bg-blue-300 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 mb-6 text-lg">
            Browse high-performance {product} for work, gaming, and study.
          </p>
          <button
            onClick={fetchProducts}
            className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded hover:opacity-90 transition"
          >
            Show {product}
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src={link}
            alt={title}
            width={320}
            height={320}
            className="w-80 h-80 object-cover rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
