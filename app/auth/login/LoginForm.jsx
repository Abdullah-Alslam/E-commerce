"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/login", { email, password });
      toast.success("Login successful!");

      const token = res.data.token;
      cookie.set("token", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS
        sameSite: "strict",
      });

      console.log("Token saved:", token);

      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Login
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg
                        transition-all flex items-center justify-center gap-2 ${
                          loading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-5 text-center text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-red-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
