// src/pages/WarrantyPage.jsx
import React from "react";
import { Navbar } from "../components/Navbar";
import WarrantyCalculator from "../components/WarrantyCalculator";
import {
  Headphones,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WarrantyPage({
  pageMetadata = null,
  productList,
  children,
}) {
  const policyPoints = [
    {
      title: "Solid-State Chamber Protection",
      description: "5 years comprehensive coverage on platinum-titanium electrolysis plates against calcification and chamber failure.",
    },
    {
      title: "Electronics & PCB Assurance",
      description: "3 years OEM warranty covering power SMPS boards, micro-controllers, touch panels, and sensor clusters.",
    },
    {
      title: "Genuine Immuno+ Certified Spares",
      description: "Any repairs or replacements are performed exclusively using genuine, factory-tested parts by trained technicians.",
    },
    {
      title: "Doorstep Engineer Inspection",
      description: "Complimentary on-site diagnostic service across all serviceable municipal metro zones for active warranty holders.",
    },
  ];

  const claimSteps = [
    {
      step: "01",
      title: "Verify Coverage",
      desc: "Check your remaining period using the calculator below.",
    },
    {
      step: "02",
      title: "Keep Invoice Handy",
      desc: "Locate your original purchase invoice and machine serial ID.",
    },
    {
      step: "03",
      title: "Raise Claim Ticket",
      desc: "Contact support via phone or email with your diagnostic issue.",
    },
    {
      step: "04",
      title: "Technician Visit",
      desc: "An authorized service engineer visits for inspection & resolution.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-neutral-50 text-neutral-800 flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans">
      {pageMetadata}

      {/* Deep Dark Wave Background with Neutral/Blue Accents */}
      <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[540px] bg-gradient-to-b from-neutral-950 via-[#071324] to-[#0a1e38] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-160 h-48 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute top-28 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl" />

        <svg
          className="absolute bottom-0 left-0 w-full h-36 md:h-48 text-neutral-900/80 fill-current preserve-3d"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,96C672,85,768,107,864,128C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,220L1392,220C1344,220,1248,220,1152,220C1056,220,960,220,864,220C768,220,672,220,576,220C480,220,384,220,288,220C192,220,96,220,48,220L0,220Z" />
        </svg>

        <svg
          className="absolute bottom-[-1px] left-0 w-full h-24 md:h-36 text-neutral-50 fill-current preserve-3d"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,128C840,139,960,117,1080,96C1200,75,1320,53,1380,42.7L1440,32L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z" />
        </svg>
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10 md:pt-18 flex flex-col">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/60 shadow-lg shadow-black/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Immuno+ Protection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Immuno+ Product <span className="text-blue-400">Warranty Check</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Verify real-time validity for your water ionizer electronics and electrolysis chamber.
          </p>
        </div>

        {/* Interactive Warranty Calculator */}
        <div className="w-full flex justify-center mb-16">
          <WarrantyCalculator productList={productList} />
        </div>

        {children}

        {/* Standard Coverage Details */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 tracking-tight">
              Standard Immuno+ Warranty Scope
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Every unit comes backed by our rigorous quality guarantee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policyPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 shadow-lg shadow-neutral-200/50 hover:shadow-xl hover:shadow-neutral-300/60 transition-all duration-300 flex gap-4"
              >
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-500 h-fit shrink-0 shadow-sm shadow-blue-500/10">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Claim Process */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-neutral-200/60">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl font-bold text-neutral-800 mt-1">
              How to Claim Your Warranty
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col p-6 bg-neutral-50/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-3xl font-black text-blue-400 font-mono mb-3">
                  {step.step}
                </span>
                <h4 className="font-bold text-neutral-800 text-sm mb-1.5">{step.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terms Notice */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-white shadow-md shadow-neutral-200/50 text-xs text-neutral-600 leading-relaxed">
          <p className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            Terms & Policy Summary:
          </p>
          Warranty strictly covers manufacturing defects in the electronics SMPS assembly and titanium chamber plates. Damage caused by physical drops, unauthorized 3rd-party repair attempts, operation with non-potable raw water exceeding specified TDS limits without required pre-filtration, or severe power surges is not covered under the default warranty.
        </section>

        {/* Help & Support CTA */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="p-8 sm:p-10 rounded-3xl bg-white text-center shadow-xl shadow-neutral-200/70">
            <div className="flex justify-center mb-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-500 shadow-sm shadow-blue-500/10">
                <Headphones className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-neutral-800">
              Need Assistance with Coverage or Claims?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
              Our dedicated water specialists are available Monday to Saturday (9:00 AM – 7:00 PM IST).
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all"
              >
                Contact Customer Support →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
