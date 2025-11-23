"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";
import InputField from "../../components/ui/InputField";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const cookie = Cookie();
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Fill all fields");

    setLoading(true);

    try {
      const res = await axios.post("/api/login", form);
      const token = res.data.token;

      cookie.set("token", token, {
        path: "/",
        sameSite: "lax",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
      });
      console.log(res);
      toast.success("Login successful!");
      router.refresh();
      setTimeout(() => router.push("/"), 500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-[#050507] px-4 py-12">
        <div className="w-full max-w-md bg-white/80 dark:bg-[#0b0c0f]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              MyWebsite
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
              Login
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              showToggle={true}
              toggleHandler={() => setShowPassword(!showPassword)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 ${
                loading
                  ? "bg-[#E30613]/70 cursor-not-allowed"
                  : "bg-[#E30613] hover:bg-[#b20410]"
              }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{loading ? "Logging in..." : "Login"}</span>
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-[#E30613] cursor-pointer hover:underline"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
