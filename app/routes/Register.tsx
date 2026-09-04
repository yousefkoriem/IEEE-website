import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Phone,
  MapPin,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  facultyOptions,
  genderOptions,
  governorateOptions,
  roleOptions,
  yearOptions,
} from "~/utils/lists";
import { registerSchema } from "~/utils/schemas";
import { useMutation } from "@tanstack/react-query";
import { useCommittees } from "~/hooks/useApi";
import { registerApi } from "~/lib/api";
import type { Committee } from "~/types";
import toast from "react-hot-toast";
import { DashboardIllustration } from "~/components/DashboardIllustration";
import { RegisterMainPhoto } from "~/components/RegisterMainPhoto";

export function meta({}: MetaArgs) {
  return [
    { title: "Join IEEE BNS - Create Account" },
    {
      name: "description",
      content: "Join the IEEE BNS community at Beni Suef University",
    },
  ];
}

type RegisterFormData = z.input<typeof registerSchema>;
type RegisterFormOutput = z.infer<typeof registerSchema>;

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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData, any, RegisterFormOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      CommitteeIds: [],
    },
    mode: "onChange",
  });

  const committeeOptions = useCommittees();

  const transformedCommitteeOptions =
    committeeOptions?.data?.map((committee: Committee) => ({
      value: committee.id.toString(),
      label: committee.name,
    })) ?? [];

  const { mutate: Register, isPending } = useMutation({
    mutationFn: (data: RegisterFormOutput) => registerApi(data),
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error("Registration failed: " + error.message);
    },
  });

  const onSubmit = (data: any) => {
    if (confirmPassword && confirmPassword !== data.password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setConfirmPasswordError("");
    Register(data as RegisterFormOutput);
  };

  const selectedCommittees = watch("CommitteeIds") || [];

  const handleCommitteeToggle = (idStr: string) => {
    const current = selectedCommittees || [];
    if (current.includes(idStr)) {
      setValue(
        "CommitteeIds",
        current.filter((item: string) => item !== idStr),
      );
    } else {
      setValue("CommitteeIds", [...current, idStr]);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      {/* Left Side - Banner */}
      <div className="lg:col-span-5 bg-gradient-to-br from-[#5A10A5] via-[#480D85] to-[#25085C] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[550px] lg:min-h-screen">
        {/* Subtle decorative background blurs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-6">
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

        {/* Center Graphic & Info */}
        <div className="relative z-10 my-auto">
          {/* Dashboard Vector Illustration Box */}
          <div className="mb-6 flex justify-center">
            <RegisterMainPhoto className="w-full max-w-xs h-auto opacity-90 drop-shadow-md" />
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-3">
            Join IEEE Beni Suef Student Branch
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm mb-6 leading-relaxed">
            Connect with driven engineers, grow your technical skills, and shape
            the future of your IEEE community.
          </p>

          {/* Feature Pills */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Technical Workshops
                </h4>
                <p className="text-[10px] text-purple-200">
                  Hands-on learning every week
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Professional Network
                </h4>
                <p className="text-[10px] text-purple-200">
                  Connect with industry leaders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Competitions & Awards
                </h4>
                <p className="text-[10px] text-purple-200">
                  Represent BSB nationally
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Performance Tracking
                </h4>
                <p className="text-[10px] text-purple-200">
                  Measure and grow your impact
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2 text-center">
              <p className="text-base font-extrabold text-white">200+</p>
              <p className="text-[10px] text-purple-200">Members</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2 text-center">
              <p className="text-base font-extrabold text-white">8</p>
              <p className="text-[10px] text-purple-200">Committees</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2 text-center">
              <p className="text-base font-extrabold text-white">5★</p>
              <p className="text-[10px] text-purple-200">Rated Branch</p>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-purple-300 mt-6 relative z-10">
          © 2026 IEEE Beni Suef Student Branch
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="lg:col-span-7 bg-[#F8FAFC] p-6 lg:p-10 flex flex-col items-center justify-center min-h-screen overflow-y-auto">
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-xl my-auto">
          {/* Card Logo */}
          <div className="text-center mb-5">
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
              Create Your Account
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Apply to join IEEE Beni Suef Student Branch today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Ahmed"
                  {...register("firstName")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                {errors.firstName && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="Mahmoud"
                  {...register("middleName")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.middleName ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                {errors.middleName && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.middleName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Hassan"
                  {...register("lastName")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                {errors.lastName && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="ahmed@ieee.org"
                  {...register("email")}
                  className={`w-full pl-3.5 pr-10 py-2 bg-gray-50/80 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Year & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Academic Year
                </label>
                <select
                  {...register("year")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.year ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.year.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  {...register("sex")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.sex ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.sex && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.sex.message}
                  </p>
                )}
              </div>
            </div>

            {/* Faculty & Government */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Faculty
                </label>
                <select
                  {...register("faculty")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.faculty ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                >
                  <option value="">Select Faculty</option>
                  {facultyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.faculty.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Government
                </label>
                <select
                  {...register("goverment")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.goverment ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                >
                  <option value="">Select Government</option>
                  {governorateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.goverment && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.goverment.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+20 1XX XXX XXXX"
                  {...register("phone")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <select
                  {...register("roleId")}
                  className={`w-full px-3 py-2 bg-gray-50/80 border ${
                    errors.roleId ? "border-red-500" : "border-gray-200"
                  } rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.roleId && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.roleId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Committee Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Committees
              </label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50/80 border border-gray-200 rounded-xl min-h-[42px] max-h-32 overflow-y-auto">
                {transformedCommitteeOptions.length > 0 ? (
                  transformedCommitteeOptions.map((opt) => {
                    const isSelected = selectedCommittees.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleCommitteeToggle(opt.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                          isSelected
                            ? "bg-[#5A10A5] text-white"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {opt.label} {isSelected ? "✓" : "+"}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-[11px] text-gray-400 italic">
                    Select role to load committees
                  </span>
                )}
              </div>
              {errors.CommitteeIds && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.CommitteeIds.message as string}
                </p>
              )}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    {...register("password")}
                    className={`w-full pl-3 pr-9 py-2 bg-gray-50/80 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-3 pr-9 py-2 bg-gray-50/80 border ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#5A10A5] focus:ring-[#5A10A5] mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-[11px] text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <span className="font-semibold text-gray-900">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold text-gray-900">
                  Privacy Policy
                </span>{" "}
                of IEEE BSU Student Branch
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#5A10A5] to-[#4460EF] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer Sign In Link */}
          <div className="mt-5 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#5A10A5] hover:underline ml-1"
            >
              Sign In
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

export default Register;
