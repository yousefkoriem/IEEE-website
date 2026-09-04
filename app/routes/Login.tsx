import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Activity, Users, Award } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "~/utils/schemas";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "~/lib/api";
import { saveAuth } from "~/hooks/useAuth";
import { DashboardIllustration } from "~/components/DashboardIllustration";

export function meta({}: MetaArgs) {
  return [
    { title: "Sign In - IEEE BNS" },
    { name: "description", content: "Sign in to your IEEE BNS account" },
  ];
}

type LoginFormData = z.infer<typeof loginSchema>;

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 23 23">
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H1z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H1z" />
  </svg>
);

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate: Login, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => loginApi(data),
    onSuccess: (data) => {
      saveAuth(data.accessToken, data.refreshToken, data.user.id);
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    Login(data);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      {/* Left Side - Banner */}
      <div className="lg:col-span-5 bg-gradient-to-br from-[#5A10A5] via-[#480D85] to-[#2E0657] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[480px] lg:min-h-screen">
        {/* Subtle decorative background blurs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-8">
          <img
            src="/IEEE BNS LIGHT.png"
            alt="IEEE BSU Logo"
            className="h-10 w-auto object-contain"
          />
          <div>
            <h3 className="font-extrabold text-white text-sm leading-tight tracking-wide">
              IEEE BSU
            </h3>
            <p className="text-[11px] text-purple-200 font-medium">
              Beni Suef Student Branch
            </p>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto">
          {/* Dashboard Vector Illustration Box */}
          <div className="mb-6 flex justify-center">
            <DashboardIllustration className="w-full max-w-xs h-auto opacity-90 drop-shadow-md" />
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-3">
            IEEE Branch Performance Management System
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm mb-6 leading-relaxed">
            Empowering IEEE leaders to evaluate, track, and improve member
            performance efficiently.
          </p>

          {/* Feature Pills */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Performance Tracking
                </h4>
                <p className="text-[11px] text-purple-200">
                  Real-time metrics & analytics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Committee Management
                </h4>
                <p className="text-[11px] text-purple-200">
                  Organize teams & roles seamlessly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Member Evaluation
                </h4>
                <p className="text-[11px] text-purple-200">
                  Score, rank & review members
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-purple-300 mt-6 relative z-10">
          © 2026 IEEE Beni Suef Student Branch
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="lg:col-span-7 bg-[#F8FAFC] p-6 lg:p-12 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-xl my-auto">
          {/* Card Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img
                src="/IEEE BNS DARK .png"
                alt="IEEE BSU Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="text-left">
                <h3 className="font-extrabold text-[#000640] text-sm leading-tight tracking-wide">
                  IEEE BSU
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  Beni Suef Student Branch
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-[#000640]">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Sign in to access your IEEE Performance Dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@ieee.org"
                  {...register("email")}
                  className={`w-full pl-3.5 pr-10 py-2.5 bg-gray-50/80 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full pl-3.5 pr-10 py-2.5 bg-gray-50/80 border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#5A10A5] focus:ring-[#5A10A5]"
                />
                <span className="ml-2 text-xs text-gray-600">Remember Me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#5A10A5] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Role
              </label>
              <select className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all">
                <option value="">Select your role</option>
                <option value="1">High Board</option>
                <option value="2">HR</option>
                <option value="3">Board Member</option>
                <option value="4">Committee Member</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#5A10A5] to-[#4460EF] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>
              

          {/* Create Account Link */}
          <div className="mt-6 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#5A10A5] hover:underline ml-1"
            >
              Create an account
            </Link>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-6 text-center">
          IEEE Beni Suef Student Branch © 2026 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
