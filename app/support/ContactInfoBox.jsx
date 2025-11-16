"use client";

import { Clock } from "lucide-react";

export default function ContactInfoBox() {
  return (
    <div className="flex flex-col justify-center space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
        <Clock className="text-orange-500" />
        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Average response time:{" "}
        <span className="text-green-600 font-semibold">1 - 2 hours</span>
      </p>
    </div>
  );
}
