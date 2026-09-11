import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  ShieldCheck,
  Handshake,
  Truck,
  Briefcase,
  Users,
  Check,
  Cog,
  Droplet,
  Wrench,
  Atom,
  Layers,
  Award,
  Download,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import waterDropSplash from "../assets/water_drop_splash.png";
import product1 from "../assets/products/ionizer_machine.png";
import waterSplashBT from "../assets/water_splash_bt.png";

import { Navbar } from "../components/Navbar";
import heroBg from "../assets/hero_bg4.png";
import heroBgRockSplash from "../assets/hero_bg_rock_splash.png"
import ProductModal from "../components/ProductModal";
import TrackedCTA from "../components/ui/TrackedCTA";
import { logByEvent } from "../services/fcmAnalytics";

const pageMetadata = [
  <title key="title">Products | Immuno+</title>,
];


const products = [
  {
    id: "immuno-essential",
    name: "IMMUNO+",
    variant: "Essential",
    description: "Entry-level premium solution",
    image: product1,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "Advanced electrolysis",
      "Multiple water modes",
      "Compact design",
      "Ideal for clinics & homes",
    ],
    price: 249999,
    details: {
      overview:
        "A compact domestic electrolysis system engineered for home and small clinic settings, delivering mineral-rich alkaline and antioxidant water on demand.",
      workingPrinciple:
        "Direct-flow continuous electrolysis using a specialized solid platinum-coated titanium multi-plate chamber. Water is first filtered to remove sediment and chlorine, then separated by ion-permeable membranes into alkaline (rich in OH⁻ and dissolved molecular hydrogen) and mildly acidic streams.",
      outputCapacity: "1.5 – 2.0 Liters/min (LPM)",
      powerConsumption: "150W – 180W (Operational) / < 2W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Integrated SMPS)",
      electrodePlates: "5 Solid Platinum-Coated Titanium Plates",
      pHRange: "4.0 – 10.0 pH",
      orpPerformance: "Up to -450 mV (Oxidation-Reduction Potential)",
      waterModes: [
        "4 Alkaline levels (Daily Drinking, Cooking, Tea/Coffee, High Alkaline)",
        "1 Purified/Neutral water level (Medication & Baby formula)",
        "2 Acidic levels (Facial astringent & Surface sanitization)",
      ],
      cleaningSystem: "Automatic reverse polarity self-cleaning cycle after every dispense",
      images: [product1, product1]
    },
  },
  {
    id: "immuno-professional",
    name: "IMMUNO+",
    variant: "Professional",
    description: "Professional-grade ionization",
    image: product1,
    popular: true,
    ctaText: "View Details",
    ctaPrimary: true,
    features: [
      "Enhanced plate technology",
      "Higher output capacity",
      "Advanced controls",
      "Ideal for wellness & commercial spaces",
    ],
    price: 349999,
    details: {
      overview:
        "High-performance alkaline ionization system built for heavy daily usage in wellness centers, premium residences, and healthcare facilities requiring wider pH customizability and higher dissolved hydrogen concentrations.",
      workingPrinciple:
        "High-amperage Switched-Mode Power Supply (SMPS) driven electrolysis through large-surface-area mesh/slotted platinum-titanium electrodes. It leverages a dual multi-stage carbon block and ultra-filtration core to purify inlet water before precision-splitting it into high-ORP negative antioxidant streams.",
      outputCapacity: "3.0 – 4.0 Liters/min (LPM)",
      powerConsumption: "250W – 320W (Operational) / < 3W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Advanced High-Efficiency SMPS)",
      electrodePlates: "7 to 9 Platinum-Coated Titanium Mesh Plates (Enhanced Surface Area)",
      pHRange: "3.0 – 11.5 pH",
      orpPerformance: "Up to -800 mV (Oxidation-Reduction Potential) / Dissolved H₂ up to 1600 ppb",
      waterModes: [
        "Multiple programmable alkaline stages (Strong alkaline for produce wash, optimal health drinking levels)",
        "Neutral purified water mode",
        "Multiple acidic stages (Strong sanitizing & beauty astringent water)",
      ],
      cleaningSystem: "Automated DARC (Double Automatic Reverse Cleaning) with zero chamber scaling pause",
      images: [product1, product1, product1]
    },
  },
  {
    id: "immuno-commercial",
    name: "IMMUNO+",
    variant: "Commercial",
    description: "Built for high-demand environments",
    image: product1,
    popular: false,
    ctaText: "Request Information",
    ctaPrimary: false,
    features: [
      "Commercial capacity",
      "Continuous operation",
      "Business-grade performance",
      "Ideal for hotels & institutions",
    ],
    details: {
      outputCapacity: "1.5 – 2.0 Liters/min (LPM)",
      powerConsumption: "150W – 180W (Operational) / < 2W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Integrated SMPS)",
      electrodePlates: "5 Solid Platinum-Coated Titanium Plates",
      pHRange: "4.0 – 10.0 pH",
      orpPerformance: "Up to -450 mV (Oxidation-Reduction Potential)",
      images: [product1, product1, product1, product1]
    }
  },
];

const topPillars = [
  {
    icon: ShieldCheck,
    title: "Premium\nTechnology",
    desc: "Carefully selected advanced water ionization systems.",
  },
  {
    icon: Handshake,
    title: "Partner\nSupport",
    desc: "Dedicated assistance for dealers and business partners.",
  },
  {
    icon: Truck,
    title: "Reliable\nSupply",
    desc: "Structured supply solutions for commercial needs.",
  },
  {
    icon: Briefcase,
    title: "Business\nOpportunity",
    desc: "Build a profitable local distribution network.",
  },
];

const partnerBenefits = [
  "Attractive Business Margins",
  "Product Training & Support",
  "Territory Opportunities",
  "Marketing Assistance",
  "Premium Product Portfolio",
];

export function ProductSolutions() {
  return (
    <section className="relative w-full bg-[#f8fbff] py-16 lg:py-12 text-slate-800">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs lg:text-lg font-bold uppercase tracking-widest text-sky-500 block mb-2">
              Our Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Premium Water <br className="hidden sm:inline" />
              <span className="text-blue-500">Ionization Systems</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
            <p className="text-xs sm:text-sm lg:text-base text-slate-500 leading-relaxed max-w-xs">
              Three series. Multiple possibilities. <br />
              Engineered for performance. <br />
              Built for your success.
            </p>

            <TrackedCTA className="group inline-flex items-center gap-4 border border-sky-500 hover:border-blue-600 hover:bg-sky-50/60 text-blue-500 font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 self-start sm:self-auto shadow-sm active:scale-95"
              as="Link"
              to="/products"
              ctaName="products_overview"
              ctaType="navigation"
              location="homepage_products">
              <span>View All Products</span>
              <div className="w-6 h-6 rounded-full border border-sky-400 flex items-center justify-center text-sky-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </TrackedCTA>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-[460px]:px-10 sm:px-0">
          {products.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.popular
                ? "border-blue-500/40 shadow-[0_10px_35px_rgba(59,130,246,0.12)]"
                : "border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                }`}
            >
              {/* "POPULAR" Pill Badge */}
              {item.popular && (
                <div className="absolute top-4 left-6 z-10">
                  <span className="bg-blue-500 text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-sm">
                    Popular
                  </span>
                </div>
              )}

              <div>
                {/* Product Image Container */}
                <div className="w-full flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={`${item.name} ${item.variant}`}
                    className="w-[80%] object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Product Titles */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {item.name}{" "}
                    <span className="text-blue-500">{item.variant}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Feature Bullet List */}
                <ul className="space-y-1 mb-4">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                {item.ctaPrimary ? (
                  <button className="group w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-full shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95" onClick={() => {
                    window.location.href = `/products?id=${item.id}`;
                  }}>
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button className="group w-full flex items-center justify-center gap-3 border border-sky-400 hover:border-blue-600 hover:bg-sky-50/50 text-blue-500 font-semibold text-xs sm:text-sm py-3 px-6 rounded-full transition-all duration-200 active:scale-95" onClick={() => {
                    window.location.href = `/products?id=${item.id}`;
                  }}>
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function WhyChooseImmuno() {
  return (
    <section className="relative w-full bg-[#020b18] text-white pt-12 lg:pt-20 overflow-hidden font-sans" >
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-radial from-[#08244c]/40 via-transparent to-transparent pointer-events-none brightness-60"
        style={{
          backgroundImage: `url(${waterDropSplash})`,
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom"
        }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 space-y-12">

        {/* Top Header & 4 Pillar Highlights */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center space-y-4">

          {/* Main Headline */}
          <div className="space-y-3 w-full md:w-1/3">
            <span className="text-xs lg:text-lg font-bold uppercase tracking-widest text-sky-400 block">
              Why Choose Immuno+
            </span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-neutral-50 tracking-tight leading-[1.15]">
              More Than a Machine. <br />
              A Complete Business <br />
              <span className="text-sky-400">Opportunity.</span>
            </h2>
          </div>

          {/* 4 Feature Columns */}
          <div className="flex flex-wrap gap-6 pt-2 max-[455px]:justify-around">
            {topPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="flex flex-col space-y-3 group max-w-30">
                  {/* Glowing Icon Circle */}
                  <div className="w-12 h-12 rounded-full border border-sky-400/70 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-neutral-100 whitespace-pre-line leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Feature Card: Grow With Immuno+ */}
        <div className="relative w-full rounded-t-3xl border border-sky-500/30 border-b-0 bg-linear-to-r from-[#061e3f]/70 via-[#03152d]/70 to-[#020b18]/70  p-6 sm:p-12 lg:p-12 shadow-[0_10px_40px_rgba(2,132,199,0.15)] overflow-hidden"
        >

          <div className="relative z-10 flex justify-between gap-12 max-[690px]:flex-wrap">

            {/* Card Left: Text & CTA buttons */}
            <div className="space-y-6 w-4/6 max-[690px]:w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block">
                Grow With Immuno+
              </span>

              <h3 className="text-2xl sm:text2xl lg:text-3xl font-extrabold text-neutral-100 tracking-tight leading-snug">
                Build a Business Around <br />
                Advanced Water Technology.
              </h3>

              <p className="text-sm text-neutral-300 max-w-lg leading-relaxed font-light">
                Join our growing network of distributors and business partners. Get access
                to premium products, sales support, and an opportunity to serve your local market.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <TrackedCTA className="flex items-center gap-3 bg-blue-500 hover:transform-[translateX(4px)] text-neutral-50 text-xs sm:text-sm font-semibold py-3 px-6 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
                  as="Link"
                  to="/join"
                  ctaName="dealer_inquiry"
                  ctaType="navigation"
                  location="homepage_footer"
                  autoScroll={true}>
                  <span>Become an Immuno+ Partner</span>
                  <Users className="w-4 h-4" />
                </TrackedCTA>

                <a
                  href={"https://wa.me/+919762170838"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 border border-sky-400/40 hover:border-sky-300 hover:bg-sky-500/10 text-neutral-100 text-xs sm:text-sm font-medium py-3 px-6 rounded-full backdrop-blur-sm transition-all duration-200 active:scale-95" onClick={() => {
                    logByEvent("generate_lead", {
                      method: "whatsapp",
                      lead_type: "dealer",
                      placement: "homepage_footer"
                    })
                  }}>
                  <span>Talk to Our Business Team</span>
                  <FaWhatsapp className="w-6 h-6 text-neutral-100" />
                </a>
              </div>
            </div>

            {/* Card Right: Benefit Checkmarks Grid */}
            <div className="flex flex-col w-2/6 max-[690px]:w-full">
              {partnerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-300 font-medium space-y-2 sm:space-y-4">
                  <Check className="w-3.5 h-3.5 stroke-[2.5] mt-2 text-sky-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}




const features = [
  {
    icon: Droplet,
    title: 'Advanced\nElectrolysis',
  },
  {
    icon: ShieldCheck,
    title: 'Premium\nQuality',
  },
  {
    icon: Cog,
    title: 'Built for\nPerformance',
  },
  {
    icon: Handshake,
    title: 'Trusted by\nProfessionals',
  },
];

const featuresMakesDifference = [
  {
    icon: Atom,
    title: 'Advanced Electrolysis',
    description: 'Japanese & Korean technology for superior ionization efficiency.',
  },
  {
    icon: Layers,
    title: 'Premium Plates',
    description: 'High-quality titanium plates for stable performance and longer life.',
  },
  {
    icon: Droplet,
    title: 'Multiple Water Types',
    description: 'Alkaline, Purified, and Acidic water for diverse applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart & Safe',
    description: 'Built-in safety features and auto-cleaning for worry-free use.',
  },
  {
    icon: Award,
    title: 'Tested & Certified',
    description: 'Rigorous quality testing to ensure reliability and durability.',
  },
];

export function Products() {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if (!selectedProduct?.id) return;
    window.history.replaceState(null, '', `/products?id=${selectedProduct.id}`)
  }, [selectedProduct]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    if (productId) {
      const product = products.find(p => p.id === productId);
      setSelectedProduct(product);
    }
  }, [location])

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col overflow-x-hidden">
      {pageMetadata}
      {/* Hero Section */}
      <section
        className="w-full relative flex flex-col justify-between bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* The filter layer: filters the background image behind it */}
        <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: "brightness(0.75)" }} />

        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 px-6 py-6 md:px-20 lg:px-20 w-full max-w-400 mx-auto">
          <div className="w-full max-[640px]:max-w-sm sm:max-w-md lg:max-w-xl my-auto flex flex-col justify-center">
            {/* Subheading Badge / Kicker */}
            <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
              OUR PRODUCTS
            </p>

            {/* Main Headline */}
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                Premium Water Ionization Systems
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                Engineered for Excellence
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-300">
              Discover our range of advanced water ionizers designed with Japanese & Korean technology to deliver superior performance, reliability, and long-term value.
            </p>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-3 min-[400px]:grid-cols-4 space-y-4 md:divide-x divide-blue-500/20 text-white lg:-ml-12 mt-8">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-sky-400 bg-blue-950/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <Icon className="w-6 h-6 text-sky-400 stroke-[1.75]" />
                    </div>
                    <h4 className="text-xs lg:text-sm text-slate-100/80 tracking-wide leading-snug whitespace-pre-line">
                      {item.title}
                    </h4>
                  </div>
                );
              })}
            </div>

            <img src={heroBgRockSplash} className="absolute max-[900px]:hidden z-0 w-[40%] lg:w-[38%] right-8 bottom-4 md:bottom-10" />

          </div>
        </div>
      </section>

      {/* products */}
      <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-xl mx-auto space-y-1">
            <h2 className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase text-center">
              three tiers. multiple possibilities.
            </h2>
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-800 text-center">
              Choose the Right Solution for Your Needs
            </h1>
            <p className="text-neutral-600 text-sm lg:text-base text-center">From wellness to high-demand commerical environments professionals,<br />immuno+ offers the perfect balance of technology, performance and value.</p>

          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 min-[460px]:px-10 md:px-0">
            {products.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.popular
                  ? "border-blue-500/40 shadow-[0_10px_35px_rgba(59,130,246,0.12)]"
                  : "border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                  }`}
              >
                {/* "POPULAR" Pill Badge */}
                {item.popular && (
                  <div className="absolute top-4 left-6 z-10">
                    <span className="bg-blue-500 text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-sm">
                      Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Product Image Container */}
                  <div className="w-full flex items-center justify-center mb-4">
                    <img
                      src={item.image}
                      alt={`${item.name} ${item.variant}`}
                      className="w-[80%] object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Titles */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {item.name}{" "}
                      <span className="text-blue-500">{item.variant}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Bullet List */}
                  <ul className="space-y-1 mb-4">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div>
                  {item.ctaPrimary ? (
                    <button className="group w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-full shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95" onClick={() => {
                      setSelectedProduct(item);
                    }}>
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button className="group w-full flex items-center justify-center gap-3 border border-sky-500 hover:border-blue-600 hover:bg-sky-50/50 text-blue-500 font-semibold text-xs sm:text-sm py-3 px-6 rounded-full transition-all duration-200 active:scale-95" onClick={() => {
                      setSelectedProduct(item);
                    }}>
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md mt-8">
            {/* Subtle decorative glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />

            <div className="relative flex items-center gap-4">
              {/* Icon Badge */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/25 ring-4 ring-blue-500/10">
                <Wrench className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100">
                  Free Installation Included
                  <span className="hidden text-neutral-300 sm:inline dark:text-neutral-600">•</span>
                </span>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Plus <span className="font-semibold text-blue-500 dark:text-blue-400">1 complimentary maintenance service</span> during your first year.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* features makes difference */}
      <div className="relative w-full overflow-hidden bg-slate-50">

        {/* TOP SECTION: Features (White) */}
        <section className="relative w-full py-8 px-6 md:px-12 z-20">

          <img src={waterSplashBT} className="absolute bottom-0 right-0 max-[600px]:w-[70%] max-[600px]:h-auto h-[60%] lg:h-[80%] opacity-40 lg:opacity-70" />

          <div className="max-w-7xl mx-auto space-y-8 z-40">
            {/* Header */}
            <div className="text-center">
              <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                Technology That Makes A Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Advanced Ionization. <span className="text-blue-500">Superior Results.</span>
              </h2>
            </div>

            {/* 5 Feature Columns */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 lg:gap-0 lg:divide-x divide-slate-100 z-40">
              {featuresMakesDifference.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center px-4 space-y-3">
                    <div className="w-12 h-12 rounded-full border border-blue-400/50 flex items-center justify-center text-blue-500 shadow-sm bg-blue-50/30">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 pt-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed max-w-50">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* BOTTOM SECTION: Call to Action (Deep Blue Gradient) */}
        <section className="relative w-full bg-gradient-to-r py-10 px-6 md:px-12 overflow-hidden">

          <img src={waterDropSplash} className="absolute w-full h-full bottom-0 right-0 brightness-70" />

          <div className="relative max-w-7xl mx-auto lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 z-10">

            {/* Text & CTA Buttons */}
            <div className="space-y-4 max-w-x">
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Need Expert Guidance?
                </h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Our team is here to help you find the perfect solution.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/+919762170838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-500 hover:bg-slate-100 font-semibold text-sm px-4 py-3 rounded-full transition-colors shadow-lg shadow-black/10"
                  onClick={() => {
                    logByEvent("generate_lead", {
                      method: "whatsapp",
                      lead_type: "contact",
                      placement: "productspage_footer"
                    })
                  }}>
                  <FaWhatsapp className="w-6 h-6 fill-blue-500" />
                  <span>Talk to Us on WhatsApp</span>
                </a>

                {/* Brochure Button */}
                <a
                  href="#brochure"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-medium text-sm px-6 py-3.5 rounded-full transition-colors backdrop-blur-sm" onClick={() => {
                    logByEvent("file_download", {
                      method: "website",
                      file_name: "Product-Catalog.pdf",
                      file_extension: "pdf",
                      link_text: "Download Product Brochure",
                      placement: "productspage_footer"
                    })
                  }}
                >
                  <span>Download Product Brochure</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* selected product modal */}
      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

      {/* order the product modal */}


    </div>
  );
}
