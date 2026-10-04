import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useAuth, clearAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { useIntro } from "../context/IntroContext";
import {
  Menu,
  X,
  Home,
  Users,
  Boxes,
  FileText,
  Calendar,
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import Logo from "./ui/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { introReady } = useIntro();

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

  // Shared nav items
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Events", path: "/events", icon: Calendar },
    { label: "Chapters", path: "/committees", icon: Boxes },
    { label: "Committees", path: "/committees", icon: Boxes },
    { label: "About", path: "/about", icon: Users },
    { label: "Achievements", path: "/#achievements", icon: FileText },
  ];

  const authNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Home", path: "/", icon: Home },
    { label: "Events", path: "/events", icon: Calendar },
    { label: "Chapters", path: "/committees", icon: Boxes },
    { label: "Committees", path: "/committees", icon: Boxes },
    { label: "About", path: "/about", icon: Users },
    { label: "Achievements", path: "/#achievements", icon: FileText },
  ];

  const currentNavItems = isMounted && isAuthenticated ? authNavItems : navItems;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  // Logo color: light on dark hero, dark on all other backgrounds
  const isHomePage = location.pathname === "/";
  const logoColor =
    isHomePage && !isScrolled
      ? "#EFE7F6"  // light primary — sits over dark Hero image
      : "#0E2C5E"; // tertiary dark — sits over light/glass backgrounds

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: "-100%", opacity: 0 }}
      animate={
        introReady
          ? {
              y: 0,
              opacity: 1,
              backgroundColor: "rgba(0, 0, 0, 0)",
              backdropFilter: "none",
              borderBottom: "none",
              boxShadow: "none",
            }
          : { y: "-100%", opacity: 0 }
      }
      transition={{
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        backgroundColor: { duration: 0.4, ease: "easeInOut" },
        backdropFilter: { duration: 0.4, ease: "easeInOut" },
        borderBottom: { duration: 0.4, ease: "easeInOut" },
        boxShadow: { duration: 0.4, ease: "easeInOut" },
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <figure className="h-[105px] p-3">
              <Logo color={logoColor} />
            </figure>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-1"
            variants={{
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
              hidden: {},
            }}
            initial="hidden"
            animate={introReady ? "visible" : "hidden"}
          >
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    to={item.path}
                    className={`nav-item-hover flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-white bg-[var(--color-primary-normal)]"
                        : isHomePage && !isScrolled
                        ? "text-[#EFE7F6]"
                        : "text-[#000640]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {!isMounted || !isAuthenticated ? (
              <>
                {/* Sign Up — outlined ghost */}
                <Link
                  to="/register"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg border-2 border-[var(--color-primary-light)] text-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary-normal)] transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
                {/* Sign In — filled primary */}
                <Link
                  to="/login"
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-normal)] rounded-lg hover:bg-[var(--color-primary-normal-hover)] transition-colors duration-200 shadow"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-normal)] rounded-lg hover:bg-[var(--color-primary-normal-hover)] transition-colors duration-200 shadow"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (solid white background, no dark mode) */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="space-y-2">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary-normal)]"
                      : "text-gray-700 hover:bg-[var(--color-primary-light)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            {/* Mobile auth buttons */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              {!isMounted || !isAuthenticated ? (
                <>
                  {/* Sign Up — outlined */}
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 border-2 border-[var(--color-primary-normal)] text-[var(--color-primary-normal)] rounded-lg hover:bg-[var(--color-primary-light)] transition-colors duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                  {/* Sign In — filled */}
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-[var(--color-primary-normal)] text-white rounded-lg hover:bg-[var(--color-primary-normal-hover)] transition-colors duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;