import { BellDot, Layers, User2, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useIntro } from "~/context/IntroContext";
import { clearAuth, useAuth } from "~/hooks/useAuth";
import { useTheme } from "~/hooks/useTheme";

interface IProps {
  onNotificationClick?: () => void;
}

const DashboardNavbar = ({ onNotificationClick }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { introReady } = useIntro();
  const { isDark, toggle: toggleTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Default fallback user photo if user photo doesn't exist
  const userPhoto =
    (user as any)?.photo ||
    (user as any)?.avatar ||
    (user as any)?.imageUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  // Shared nav items (added "Contact Us")
  const navItems = [
    { label: "Home", path: "/", icon: User2 },
    { label: "Committees", path: "/#committees", icon: User2 },
    { label: "Events", path: "/events", icon: User2 },
    { label: "Articles", path: "/articles", icon: User2 },
    { label: "About", path: "/about", icon: User2 },
    { label: "Contact Us", path: "/contact", icon: User2 },
  ];

  const authNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: User2 },
    { label: "Home", path: "/", icon: User2 },
    { label: "Events", path: "/events", icon: User2 },
    { label: "Articles", path: "/articles", icon: User2 },
    { label: "Committees", path: "/#committees", icon: User2 },
    { label: "About", path: "/about", icon: User2 },
    { label: "Contact Us", path: "/contact", icon: User2 },
  ];

  const currentNavItems =
    isMounted && isAuthenticated ? authNavItems : navItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative flex w-full flex-col md:flex-row md:items-center md:justify-between">
      <div className={`flex w-full px-4 items-center border-1.5 shadow-xs justify-between gap-2 md:hidden ${
        isDark ? "bg-[#101726] border-[#232D42] text-white" : "bg-white border-[#EEF0FF]"
      }`}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex h-11 w-11 items-center justify-center transition-all duration-200 ${
            isDark ? "text-[#A78BFA] hover:bg-[#1E2738]" : "text-[#5A10A5] hover:bg-[#F5F0FF]"
          }`}
        >
          {isMenuOpen ? (
            <span className="font-bold">✕</span>
          ) : (
            <Layers className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex h-10 w-full items-center px-3 capitalize">
            <span className={`truncate text-[11px] sm:text-sm ${isDark ? "text-gray-400" : "text-[#6C757D]"}`}>
              dashboard /
            </span>
            <span className={`ml-1 truncate text-[11px] font-semibold sm:text-sm ${isDark ? "text-white" : "text-[#000640]"}`}>
              {location.pathname.split("/").filter(Boolean).pop() || "dashboard"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-[#5A10A5] text-xs font-bold border border-purple-200 hover:bg-purple-100 transition-colors"
            title="Exit to Website Home"
          >
            <User2 className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <img
            src={userPhoto}
            alt={user?.fName || "User Photo"}
            className="w-8 h-8 rounded-full object-cover border-2 border-[#5A10A5]"
          />
        </div>
      </div>

      <div className="hidden w-full items-center justify-between md:flex">
        <div className="flex items-center space-x-2">
          {currentNavItems.map((item) => {
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-3xl transition-all duration-200 font-medium text-sm ${
                  isActive(item.path)
                    ? "bg-[#5A10A5] text-white shadow-md shadow-purple-500/20"
                    : isDark
                    ? "text-[#A78BFA] hover:bg-[#1E2738]"
                    : "text-[#5A10A5] hover:bg-[#F5F0FF]"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications button (No backend API) */}
          {/* <button
            type="button"
            onClick={onNotificationClick}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isDark ? "bg-[#1B2236] text-[#A78BFA] hover:bg-[#252E48]" : "bg-[#F5F0FF] text-[#5A10A5] hover:bg-[#EBE0FF]"
            }`}
          >
            <BellDot className="h-4 w-4" />
          </button> */}

          {/* Theme toggle button (Disabled) */}
          {/* <button
            type="button"
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isDark ? "bg-[#1B2236] text-yellow-400 hover:bg-[#252E48]" : "bg-[#F5F0FF] text-[#5A10A5] hover:bg-[#EBE0FF]"
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button> */}

          {/* User Photo Avatar */}
          <div className="relative group cursor-pointer">
            <img
              src={userPhoto}
              alt={user?.fName || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#5A10A5] shadow-xs"
            />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden mt-3 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-[#CCB5E3] bg-white p-3 shadow-sm">
          <div className="space-y-2">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[#F5F0FF] text-[#5A10A5]"
                      : "text-gray-700 hover:bg-[#F5F0FF]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
