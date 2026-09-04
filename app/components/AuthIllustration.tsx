import { DashboardIllustration } from "./DashboardIllustration";

interface AuthIllustrationProps {
  type: "login" | "register";
  className?: string;
}

export const AuthIllustration = ({
  type,
  className = "",
}: AuthIllustrationProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10 flex justify-center items-center">
        <DashboardIllustration className="w-full h-auto max-w-lg" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg -z-10"></div>
    </div>
  );
};
