import React from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ShieldCheck,
  Droplets,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import profilePic from "../assets/immuno-profile.png";
import products from "../data/products";
import TrackedCTA from "../components/ui/TrackedCTA";
import { logByEvent } from "../services/fcmAnalytics";

const defaultPageMetadata = [
  <title key="title">Socials & Links | Immuno+</title>,
  <meta
    key="description"
    name="description"
    content="Connect with Immuno+ Healthcare Solutions across our official social channels, warranty check, customer support, and water ionization products."
  />,
];

// Official brand SVG icons
const SocialIcons = {
  WhatsApp: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.65 3.742-.983zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
    </svg>
  ),
  YouTube: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
};

export default function LinkTree({ pageMetadata = defaultPageMetadata }) {
  const linkTreeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Immuno+ Official Hub & Links",
    "url": "https://links.immunoplus.in",
    "description": "Official Immuno+ portal for customer support, social media channels, warranty verification, and flagship water ionizer products.",
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
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9762170838",
        "contactType": "customer service",
        "contactOption": "WhatsApp Support",
        "areaServed": "IN"
      }
    }
  };
  
  const socialLinks = [
    {
      name: "WhatsApp Support",
      id: "whatsapp",
      handle: "Instant Assistance & Chat",
      icon: SocialIcons.WhatsApp,
      href: "https://wa.me/919762170838?text=Hi%20Immuno%2B%20Team",
      colorClass: "bg-[#25D366] text-white hover:bg-[#20ba59] shadow-emerald-500/20",
      badge: "Fastest Reply",
    },
    {
      name: "Instagram",
      id: "instagram",
      handle: "@plusimmuno",      
      icon: SocialIcons.Instagram,
      href: "https://www.instagram.com/plusimmuno",
      colorClass:
        "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-95 shadow-rose-500/20",
    },
    {
      name: "YouTube Channel",
      id: "youtube",
      handle: "Water Science & Guides",
      icon: SocialIcons.YouTube,
      href: "https://youtube.com/@immunoplus_uk",
      colorClass: "bg-[#FF0000] text-white hover:bg-[#e60000] shadow-red-500/20",
    },
    {
      name: "LinkedIn",
      id: "linkedin",
      handle: "Immuno+ Healthcare Solutions",
      icon: SocialIcons.LinkedIn,
      href: "https://linkedin.com/in/immunoplus",
      colorClass: "bg-[#0A66C2] text-white hover:bg-[#084e96] shadow-sky-600/20",
    },
    {
      name: "Facebook",
      id: "facebook",
      handle: "Immuno+ Official Community",
      icon: SocialIcons.Facebook,
      href: "https://www.facebook.com/ImmunoPlusIndia",
      colorClass: "bg-[#1877F2] text-white hover:bg-[#166fe5] shadow-blue-600/20",
    },
  ];

  const featuredProducts = [
    {
      id: products[0].id,
      name: `${products[0].name}`,
      subtitle: products[0].description,
      tag: "Premium",
      link: `/products?id=${products[0].id}`,
      image: products[0].image,
    },
    {
      id: products[1].id,
      name: `${products[1].name}`,
      subtitle: products[1].description,
      tag: "Flagship",
      link: `/products?id=${products[1].id}`,
      image: products[1].image,
    },
    {
      id: products[5].id,
      name: `${products[5].name}`,
      subtitle: products[5].description,
      tag: "Innovative",
      link: `/products?id=${products[5].id}`,
      image: products[5].image,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-neutral-50 text-neutral-800 flex flex-col items-center justify-start overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans pb-10 sm:pb-14">
      <Helmet>
        {/* Core Primary Meta */}
        <title>Official Links & Resources | Immuno+</title>
        <meta name="title" content="Official Links & Resources | Immuno+" />
        <meta
          name="description"
          content="Connect with Immuno+ Healthcare Solutions. Access our official social channels, WhatsApp support, warranty verification, and flagship alkaline water products."
        />
        <meta
          name="keywords"
          content="Immuno+ links, Immuno+ support, Immuno+ WhatsApp, alkaline water ionizer contact, Immuno+ official, LinkTree"
        />
        <link rel="canonical" href="https://links.immunoplus.in/" />

        {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://links.immunoplus.in/" />
        <meta property="og:title" content="Immuno+ Official Links & Resources" />
        <meta
          property="og:description"
          content="Access official support, social media communities, warranty registration, and product catalogs in one place."
        />
        <meta property="og:image" content="https://immunoplus.in/og-image.jpg" />
        <meta property="og:site_name" content="Immuno+" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://links.immunoplus.in/" />
        <meta name="twitter:title" content="Immuno+ Official Links & Resources" />
        <meta
          name="twitter:description"
          content="Access official support, social media communities, and flagship products in one place."
        />
        <meta name="twitter:image" content="https://immunoplus.in/og-image.jpg" />

        {/* Structured Data (Schema.org ProfilePage) */}
        <script type="application/ld+json">
          {JSON.stringify(linkTreeSchema)}
        </script>
      </Helmet>

      {/* FIXED Background Header Wave - Stays static while UI scrolls */}
      <div className="fixed top-0 left-0 right-0 h-[420px] bg-gradient-to-b from-neutral-950 via-[#071324] to-[#0a1e38] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-160 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />

        <svg
          className="absolute bottom-0 left-0 w-full h-28 md:h-36 text-neutral-900/80 fill-current preserve-3d"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,96C672,85,768,107,864,128C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,220L1392,220C1344,220,1248,220,1152,220C1056,220,960,220,864,220C768,220,672,220,576,220C480,220,384,220,288,220C192,220,96,220,48,220L0,220Z" />
        </svg>

        <svg
          className="absolute bottom-[-2px] left-0 w-full h-20 md:h-28 text-neutral-50 fill-current preserve-3d"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,128C840,139,960,117,1080,96C1200,75,1320,53,1380,42.7L1440,32L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z" />
        </svg>
      </div>

      {/* Main UI Container - Scrolls smoothly over the fixed background */}
      <main className="relative z-10 w-full max-w-lg px-4 pt-10 sm:pt-14 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-3">
            <div className="w-28 h-28 bg-transparent rounded-full">
              <img src={profilePic} alt="Immuno+ Profile" className="" />
            </div>
            <div
              className="absolute bottom-2.5 right-2.5 bg-blue-500 p-1 rounded-full text-white ring-2 ring-neutral-900"
              title="Verified Immuno+ Channel"
            >
              <CheckCircle2 className="w-4 h-4 fill-blue-500 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Immuno+
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xs mt-1">
            Advanced Hydrogen & Alkaline Electrolysis Systems
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-neutral-900/70 border border-neutral-700/50 backdrop-blur-md text-blue-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Hub & Resources</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <TrackedCTA
            as="link"
            to="/warranty"
            ctaName="warranty_shortcut"
            ctaType="navigation"
            location="linktree"
            className="flex items-center justify-center gap-2 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-md shadow-neutral-200/40 hover:bg-white hover:border-blue-300 transition-all text-neutral-800 group"
          >
            <ShieldCheck className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Warranty Check</span>
          </TrackedCTA>
          <TrackedCTA
            as="link"
            to="/contact"
            ctaName="contact_shortcut"
            ctaType="navigation"
            location="linktree"
            className="flex items-center justify-center gap-2 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-md shadow-neutral-200/40 hover:bg-white hover:border-blue-300 transition-all text-neutral-800 group"
          >
            <PhoneCall className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Contact Support</span>
          </TrackedCTA>
        </div>

        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Connect With Us
            </span>
            <span className="text-[11px] text-neutral-400">Official Profiles</span>
          </div>

          <div className="flex flex-col gap-3">
            {socialLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    logByEvent("click_social_link", {
                      platform: item.id,
                      location: "linktree",
                    });
                    
                    if (item.id === "whatsapp") {
                      logByEvent("generate_lead", {
                        method: "whatsapp",
                        lead_type: "contact",
                        placement: "linktree_direct"
                      });
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl shadow-lg transition-all duration-200 transform active:scale-[0.98] ${item.colorClass}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2 rounded-xl bg-black/10 backdrop-blur-sm shrink-0">
                      <Icon />
                    </div>
                    <div className="text-left truncate">
                      <div className="font-semibold text-sm leading-tight flex items-center gap-2">
                        {item.name}
                        {item.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/25 uppercase tracking-wide">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs opacity-90 truncate">{item.handle}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 shrink-0 opacity-80" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              Immuno+ Products
            </span>
            <TrackedCTA
              as="link"
              to="/products"
              ctaName="view_full_catalog"
              ctaType="navigation"
              location="linktree"
              className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors"
            >
              View Full Catalog →
            </TrackedCTA>
          </div>

          <div className="flex flex-col gap-3">
            {featuredProducts.map((prod, idx) => (
              <Link
                key={idx}
                to={prod.link}
                onClick={() => {
                  logByEvent("select_item", {
                    item_list_name: "linktree_featured_products",
                    items: [
                      {
                        item_id: prod.id,
                        item_name: prod.name,
                      }
                    ]
                  });
                }}
                className="group relative bg-white border border-neutral-100 rounded-2xl p-4 shadow-md shadow-neutral-200/50 hover:shadow-xl hover:border-blue-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-3">
                  <div className="w-10 h-10 p-2 flex justify-center items-center rounded-xl bg-blue-50 text-blue-600 shrink-0 group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <img src={prod?.image} alt={prod.name} className="h-full" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-neutral-900 text-sm truncate">
                        {prod.name}
                      </h3>
                      <span className="text-[10px] font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                        {prod.tag}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate">{prod.subtitle}</p>
                  </div>
                </div>

                <div className="text-neutral-400 group-hover:text-blue-500 transition-colors shrink-0">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="text-center text-xs text-neutral-400 mt-4 space-y-1">
          <p>© {new Date().getFullYear()} Immuno+ Water Solutions. All rights reserved.</p>
          <p className="text-[11px] text-neutral-400">
            Engineered with certified medical-grade ionization technology.
          </p>
        </footer>
      </main>
    </div>
  );
}
