import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthorBox() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <div className="relative w-20 h-20">
        <Image
          src="/images/profile.jpg"
          alt="Author"
          fill
          className="rounded-full object-cover"
          placeholder="blur"
          blurDataURL="/images/profile.jpg"
        />
      </div>

      <div>
        <h4 className="font-bold text-lg">Abdullah Abdalsalam</h4>

        <p className="text-gray-600 dark:text-gray-400">
          Frontend Developer & Digital Product Enthusiast
        </p>
      </div>
    </motion.div>
  );
}
