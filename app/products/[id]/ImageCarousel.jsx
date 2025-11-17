"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({
  images,
  currentImage,
  setCurrentImage,
}) {
  const prefersReducedMotion = useReducedMotion();

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const imageVariants = prefersReducedMotion
    ? { visible: { opacity: 1 }, hidden: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      };

  return (
    <section className="relative w-full mb-8">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentImage]}
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          className="w-full h-[450px] object-cover rounded-xl shadow-lg"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={imageVariants}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-3 -translate-y-1/2 
            bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-3 -translate-y-1/2 
            bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow"
          >
            <ChevronRight size={20} />
          </button>

          {/* Thumbnails */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-12 h-8 rounded-md overflow-hidden border ${
                  i === currentImage
                    ? "border-red-500 ring-2 ring-red-400"
                    : "border-transparent"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
