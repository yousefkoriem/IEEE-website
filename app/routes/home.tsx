import { Link, type MetaArgs } from "react-router";
import { useAllArticles, useCommittees } from "../hooks/useApi";
import type { Article, Committee } from "../types";

// Redesigned components
import HeroSectionRedesign from "../components/home/HeroSectionRedesign";
import AboutSectionRedesign from "../components/home/AboutSectionRedesign";
import CommunitySection from "../components/home/CommunitySection";
import ImpactSection from "../components/home/ImpactSection";
import Events from "../components/home/Events";
import JourneySection from "../components/home/JourneySection";
import AmbassadorsSection from "../components/home/AmbassadorsSection";
import TeamSection from "../components/home/TeamSection";
import AchievementsSection from "../components/home/AchievementsSection";
import CTASection from "../components/home/CTASection";
import HighBoardSection from "../components/home/HighBoardSection";
import SponsorsSection from "../components/home/SponsorsSection";
import Footer from "../components/home/Footer";

// Existing components
import Commitees from "../routes/commitees";


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
  return (
    <>
      {/* 1. Hero Section - Interactive committee network diagram */}
      <HeroSectionRedesign />

      {/* 2. About Section - "More Than a Student Branch" */}
      <AboutSectionRedesign />

      {/* 3. Community Section - "Our Community, Your Space" */}
      <CommunitySection />

      {/* 4. Committees Section - "Explore Our Committees" */}
      <Commitees />

      {/* 5. Impact Section - "Turning Activities into Impact" */}
      <ImpactSection />

      {/* 6. Events Section - "Our Events & Activities" */}
      <Events />

      {/* 7. Journey Section - "Our Journey" timeline */}
      <JourneySection />

      {/* 8. Ambassadors Section - "From Beni-Suef to Region 8" */}
      <AmbassadorsSection />

      {/* 9. Team Section - "Behind the Experience" */}
      <TeamSection />

      {/* 10. Achievements Section - "Milestones We're Proud Of" */}
      <AchievementsSection />

      {/* 11. CTA Section - "Your next chapter could start here" */}
      <CTASection />

      {/* 12. High Board Section - "Meet Our High Board" */}
      <HighBoardSection />

      {/* 13. Sponsors Section - "Sponsors & Partners" */}
      <SponsorsSection />

      {/* 14. Footer */}
      <Footer />
    </>
  );
}
