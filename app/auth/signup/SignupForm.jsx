"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import InputField from "../../components/ui/InputField";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // HandleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  // HandleSubmit
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("Fill all fields");
    }
    if (form.password.length < 6) {
      return toast.error("Password too short");
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/signup", form);
      if (res.status === 201) {
        toast.success("Account created! Redirecting...");
        setTimeout(() => router.push("/auth/login"), 900);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-[#050507] px-4 py-12">
        <div className="w-full max-w-md bg-white/80 dark:bg-[#0b0c0f]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              MyWebsite
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
              Sign up to access all features quickly and securely.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder='Enter yor name please'
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder='Enter your email please'
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder='Enter your password please'
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
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <span
              className="text-[#E30613] cursor-pointer hover:underline"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </div>

          <p className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
            By creating an account you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </>
  );
}
