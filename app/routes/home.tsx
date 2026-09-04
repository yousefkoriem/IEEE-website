import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ArticleDisplay } from "../components/ArticleDisplay";
import { useAllArticles, useCommittees } from "../hooks/useApi";

import { Link, type MetaArgs } from "react-router";
import type { Article, Committee } from "../types";
import {
  Users,
  Calendar,
  Wrench,
  Handshake,
  ArrowRight,
  Rocket,
  ChartNoAxesCombined,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Mail,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";
import { useState } from "react";
import Commitees from "../routes/commitees";
import Logo from "~/components/ui/Logo";
import { property } from "zod";
import SponsersSection from "~/components/Sponsors/SponserSection";

import toast from "react-hot-toast";

import HeroSection from "../components/home/HeroSection";
import Events from "../components/home/Events";
import About from "../components/home/About";
import Footer from "../components/home/Footer";
import HighBoardSection from "../components/home/HighBoardSection";

import Sponsers from "./sponsors";


export function meta({ }: MetaArgs) {
  return [
    { title: "IEEE BNS - Beni Suef University Student Branch" },
    {
      name: "description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      property: "og:title",
      content: "IEEE BNS - Beni Suef University Student Branch",
    },
    {
      property: "og:description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      property: "og:image",
      content: "https://ieee-mangment.vercel.app/og-image.jpg",
    },
    {
      name: "twitter:title",
      content: "IEEE BNS - Beni Suef University Student Branch",
    },
    {
      name: "twitter:description",
      content:
        "Join IEEE BNS - Connecting students with technology, innovation, and professional development opportunities in electrical engineering and related fields.",
    },
    {
      name: "twitter:image",
      content: "https://ieee-mangment.vercel.app/og-image.jpg",
    },
  ];
}

export default function Home() {

  const { data: articles, isLoading, error } = useAllArticles();
  const {
    data: committees,
    isLoading: committeesLoading,
    error: committeesError,
  } = useCommittees();

  const statistics = [
    { label: "Active Members", value: "250+", icon: Users },
    { label: "Events Organized", value: "50+", icon: Calendar },
    { label: "Technical Workshops", value: "30+", icon: Wrench },
    { label: "Industry Partnerships", value: "15+", icon: Handshake },
    {
      label: "Social Media Reach",
      value: "12,000+",
      icon: ChartNoAxesCombined,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Filter articles to show only those
  const filteredArticles = Array.isArray(articles)
    ? articles.filter((article: Article) => article.categoryName !== "Events")
    : [];

  // Calculate pagination
  // const totalPages = articles? Math.ceil(articles.length / articlesPerPage): 0;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  // const currentArticles = articles ? articles.slice(startIndex, endIndex) : [];
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    if (currentPage > 3) pages.push(1, "...");
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...", totalPages);
    return pages;
  };

  return (
    <>

      <HeroSection />
      <About />
      <Events />

      {/* About IEEE Section
      <Section id="about" variant="primary" padding="xl">
        <div className="max-w-7xl mx-auto ">
          <SectionHeader>
            <SectionTitle className="text-blue-600">
              IEEE BNS: Where Knowledge Meets Passion!
            </SectionTitle>
            <SectionSubtitle>
              Connecting students with cutting-edge technology, professional
              development, and innovation opportunities
            </SectionSubtitle>
          </SectionHeader>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card variant="feature" className="p-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  What is IEEE?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  IEEE is the world's largest technical professional
                  association, focused on advancing technology for the benefit
                  of humanity. It publishes a wide range of journals and
                  standards in the fields of electrical engineering and computer
                  science.
                </p>
              </Card>

              <Card variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Who Are We?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  IEEE BNS Student Branch is a volunteer organization at Beni
                  Suef University, led by students. Our branch consists of two
                  societies: Technical Society and Non-Technical Society.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {statistics.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card
                      key={index}
                      variant="glass"
                      hover
                      glow
                      className={`p-6 text-center ${
                        index === statistics.length - 1
                          ? "col-span-2 mx-auto"
                          : ""
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section> */}

      {/* Committees Section */}
      <Commitees />
      <HighBoardSection />



      {/* Sponsers Section */}

      <Sponsers />

      <Footer />
    </>
  );
}
