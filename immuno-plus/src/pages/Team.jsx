import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import {
  Droplet,
  ShieldCheck,
  Users,
  Handshake,
  Lightbulb,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";

import heroBg from "../assets/hero_bg4.png";
import heroImg from "../assets/hero_team.png";
import TrackedCTA from "../components/ui/TrackedCTA";

// Team profile pictures
import ManagingDirector from "../assets/team/MDF_Vineeta_Saxena.jpg";
import TechnicalDirector from "../assets/team/TD_Nivid_Saxena.jpg";
import MarketingHead from "../assets/team/MH_Abhay_Saxena.jpg";

const features = [
  {
    icon: Users,
    title: "5+",
    description: "Core Leadership Specialists",
  },
  {
    icon: ShieldCheck,
    title: "10+ Years",
    description: "Electrolysis & Health Engineering",
  },
  {
    icon: Handshake,
    title: "One",
    description: "Common Goal - Better Water for All",
  },
];

const leaders = [
  {
    name: "Dr. Vineeta Saxena",
    role: "Founder & Managing Director",
    bio: "Overseeing executive leadership, institutional governance, and long-term organizational strategy.",
    image: ManagingDirector,
    linkedin: "https://www.linkedin.com/company/immunoplus",
  },
  {
    name: "Er. Nivid Saxena",
    role: "Technical Director",
    bio: "Directing technical strategy, system architecture, and core engineering operations.",
    image: TechnicalDirector,
    linkedin: "https://www.linkedin.com/company/immunoplus",
  },
  {
    name: "Mr. Abhay Kumar Saxena",
    role: "Marketing Head",
    bio: "Managing brand positioning, business development, and market engagement initiatives.",
    image: MarketingHead,
    linkedin: "https://www.linkedin.com/company/immunoplus",
  },
];

const extendedTeam = [
  {
    icon: Users,
    title: "20+",
    subtitle: "Dedicated Professionals",
    description: null,
  },
  {
    icon: GraduationCap,
    title: "Diverse",
    subtitle: "Expertise",
    description: "Engineering, Healthcare, Business & Support",
  },
  {
    icon: Lightbulb,
    title: "Innovative",
    subtitle: "Thinkers",
    description: "Driven by curiosity and continuous improvement",
  },
  {
    icon: HeartHandshake,
    title: "Customer",
    subtitle: "Focused",
    description: "Committed to delivering real value and trust",
  },
];

export function Team() {
  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Leadership & Engineering Team | Immuno+",
    "url": "https://immunoplus.in/team",
    "description":
      "Meet the leadership, electrolysis engineering specialists, and water science advisors behind Immuno+ Healthcare Solutions.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Immuno+",
      "url": "https://immunoplus.in",
      "logo": "https://immunoplus.in/logo.png",
      "sameAs": [
        "https://www.instagram.com/plusimmuno",
        "https://youtube.com/@immunoplus_uk",
        "https://www.facebook.com/ImmunoPlusIndia",
        "https://linkedin.com/in/immunoplus"
      ],
      "department": [
        {
          "@type": "Organization",
          "name": "Electrolysis R&D & Engineering"
        },
        {
          "@type": "Organization",
          "name": "Technical Field Service & Support"
        },
        {
          "@type": "Organization",
          "name": "Brand Strategy & Market Operations"
        }
      ],
      "employee": leaders.map((member) => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        ...(member.image && {
          "image": member.image.startsWith("http")
            ? member.image
            : `https://immunoplus.in${member.image}`,
        }),
        "worksFor": {
          "@type": "Organization",
          "name": "Immuno+"
        }
      }))
    }
  };

  return (
    <div className="w-full bg-neutral-950 text-white flex flex-col overflow-x-hidden font-sans">
      <Helmet>
        {/* Core Primary Meta */}
        <title>Our Leadership & Engineering Team | Immuno+</title>
        <meta
          name="title"
          content="Our Leadership & Engineering Team | Immuno+"
        />
        <meta
          name="description"
          content="Meet Dr. Vineeta Saxena, Er. Nivid Saxena, and the engineering and leadership team behind Immuno+'s certified water ionization systems."
        />
        <meta
          name="keywords"
          content="Immuno+ leadership, Dr Vineeta Saxena, Er Nivid Saxena, Abhay Kumar Saxena, water ionizer engineers, water electrolysis team"
        />
        <link rel="canonical" href="https://immunoplus.in/team" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://immunoplus.in/team" />
        <meta
          property="og:title"
          content="Meet the Immuno+ Leadership & Engineering Team"
        />
        <meta
          property="og:description"
          content="Executive leadership and technical pioneers driving certified platinum-titanium water ionizer technology across India."
        />
        <meta property="og:image" content="https://immunoplus.in/og-image.jpg" />
        <meta property="og:site_name" content="Immuno+" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://immunoplus.in/team" />
        <meta
          name="twitter:title"
          content="Meet the Immuno+ Leadership & Engineering Team"
        />
        <meta
          name="twitter:description"
          content="Discover the executive leadership and technical team behind Immuno+ Healthcare Solutions."
        />
        <meta name="twitter:image" content="https://immunoplus.in/og-image.jpg" />

        {/* Structured Data (Schema.org Organization & Team Members) */}
        <script type="application/ld+json">
          {JSON.stringify(teamSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="w-full relative flex flex-col justify-between bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: "brightness(0.8)" }}
        />

        <Navbar />

        <div className="relative z-10 flex-1 px-6 py-8 md:px-20 lg:px-20 w-full max-w-7xl mx-auto">
          <div className="w-full min-[460px]:px-10 sm:px-0 sm:max-w-md lg:max-w-xl my-auto flex flex-col justify-center">
            <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
              OUR TEAM
            </p>

            <div className="space-y-1 md:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                The People Behind
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                Immuno+
              </h1>
            </div>

            <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-300">
              At Immuno+, we combine expertise, passion, and engineering innovation to deliver advanced water ionization solutions and build long–term partnerships across India.
            </p>

            <div className="flex justify-start flex-wrap md:flex-nowrap gap-4 mt-8">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex text-left gap-2">
                    <Icon className="w-9 h-9 text-sky-500 stroke-[1.5]" />
                    <div className="flex flex-col items-start justify-start">
                      <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-tight text-sky-500 pt-1 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-slate-100/80 max-w-40">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <img
              src={heroImg}
              alt="Immuno+ Engineering Team"
              className="absolute max-[900px]:hidden z-0 w-[45%] xl:w-[40%] right-12 -bottom-2"
            />
          </div>
        </div>
      </section>

      {/* Purpose Banner */}
      <section className="relative w-full bg-slate-50 py-10 lg:py-12 px-6 md:px-12 lg:px-20 text-slate-800">
        <div className="relative max-w-7xl mx-auto flex gap-8 flex-wrap sm:flex-nowrap sm:divide-x divide-blue-100">
          <div className="flex items-start gap-4 max-w-xl pr-4 lg:pr-14">
            <div className="w-12 h-12 rounded-full border border-blue-400/50 bg-blue-50/50 flex items-center justify-center text-blue-500 shrink-0 mt-1">
              <Droplet className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="space-y-3">
              <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                United by Purpose
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Experts. Innovators.<br />
                <span className="text-blue-500">Partners in Progress.</span>
              </h2>
              <div className="w-8 h-1 bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="max-w-md text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-4 lg:pl-8 pt-2">
            <p>
              Our team brings together specialists from diverse backgrounds — engineering, healthcare, business, and customer support — working with one singular mission:
            </p>
            <p className="font-semibold text-slate-900">
              To make certified, medical-grade water technology accessible and impactful across every home.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="w-full bg-white py-12 lg:py-14 px-6 md:px-12 lg:px-20 text-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                Meet Our Leadership Team
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Leadership Driving Our Vision
              </h3>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-blue-100/60 via-blue-50/40 to-blue-50/10 transition-all shadow-sm hover:shadow-lg hover:shadow-blue-900/10 hover:-translate-y-1 duration-200 space-y-3"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 border-2 border-blue-500/30">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                      {leader.name}
                    </h4>
                    <p className="text-sm md:text-base font-medium text-blue-600 mt-1">
                      {leader.role}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {leader.bio}
                  </p>

                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name}'s Profile`}
                    className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/50 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <FaLinkedinIn className="w-4 h-4 fill-current" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Extended Team Strip */}
          <div className="relative max-w-6xl mx-auto rounded-3xl bg-slate-100 p-8 overflow-hidden">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                Our Extended Team
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                The Strength Behind Our Success
              </h3>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              {extendedTeam.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-blue-200 bg-blue-50/40 flex items-center justify-center text-blue-500 shrink-0">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-blue-600 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-base font-semibold text-slate-800 leading-tight">
                        {item.subtitle}
                      </p>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-500 pt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="w-full max-w-7xl mx-auto md:px-4">
            <div className="relative overflow-hidden rounded-3xl bg-[#021024] bg-gradient-to-r from-[#020b18] via-[#031d42] to-[#025091] px-6 sm:px-10 py-8 lg:py-10 text-white shadow-xl">
              <div className="absolute -right-16 -bottom-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <Users className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 stroke-[1.75]" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-blue-400 uppercase">
                      Let's Build a Better Future Together
                    </span>
                    <h3 className="text-2xl sm:text-2xl font-bold tracking-tight leading-snug">
                      Stronger Together.<br />
                      <span className="text-blue-400">Better Water for Everyone.</span>
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 max-w-sm">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Interested in working alongside our engineers or exploring regional distribution partnerships?
                  </p>
                  <a
                    href="/join"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all"
                  >
                    Join Our Mission <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
