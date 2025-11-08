"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Laptop Collection",
    img: "/images/shop01.png",
    href: "products/laptops",
  },
  {
    title: "Cameras Collection",
    img: "/images/shop02.png",
    href: "products/accessories",
  },
  {
    title: "Accessiores Collection",
    img: "/images/shop03.png",
    href: "products/accessories",
  },
];

export default function Categories() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl sm:text-5xl font-extrabold mb-16 dark:text-white"
      >
        Shop by Category
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.06, rotateX: 3, rotateY: 2 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer"
          >
            {/* Image */}
            <Image
              src={cat.img}
              alt={cat.title}
              width={600}
              height={400}
              className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-red-600/40 to-transparent" />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 z-10">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-4"
              >
                {cat.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.3 }}
              >
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-white/40 hover:scale-105 transition-all"
                >
                  Shop Now →
                </Link>
              </motion.div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
