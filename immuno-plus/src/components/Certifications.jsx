import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

import { CERTIFICATIONS } from '../data/certifications';

export default function CertificationsBrief() {
  return (
    <section className="py-12 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>           
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
              Certified Water Science & Medical-Grade Engineering
            </h2>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 mt-4 rounded-full text-xs md:text-sm font-semibold tracking-wide bg-emerald-50 text-emerald-500 border border-emerald-200/70 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              GLOBAL QUALITY & SAFETY ACCREDITATIONS
            </div>

            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
              Explore the quality management, environmental, safety, and
              product compliance standards associated with Immuno Plus.
              Certification scope and applicability depend on the
              individual certificate and supporting documentation.
            </p>
          </div>

          {/* View All Certificates */}
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <a
              href="/certifications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#1d68f0] hover:bg-blue-700 text-white shadow-sm transition-all duration-150 group"
            >
              <span>View All Certificates</span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CERTIFICATIONS.map((item) => (
            <a
              key={item.id}
              href={`/certifications/${item.id}`}
              aria-label={`View details for ${item.shortCode}: ${item.name}`}
              className="group p-5 rounded-xl border border-slate-200/90 bg-white hover:border-[#1d68f0] hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Certificate Code and Indicator */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[12px] font-mono text-slate-400 group-hover:text-blue-500 font-semibold">
                  {item.shortCode}
                </span>

                <span
                  className="inline-block w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
                  title="Certificate status requires verification"
                />
              </div>

              {/* Certificate Name */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1d68f0] transition-colors leading-snug">
                {item.name}
              </h3>

              {/* Certificate Category */}
              <p className="text-[14px] text-blue-600 font-semibold mt-2">
                {item.category}
              </p>

              {/* Certificate Description */}
              <p className="text-[12px] text-slate-600 leading-relaxed mt-3 flex-grow">
                {item.description}
              </p>

              {/* Certificate Standard */}
              <div className="mt-4">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    {item.standard}
                  </span>

                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Official Entity and Registry Bar */}
        <div className="rounded-xl bg-[#0f172a] text-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">

          {/* Registered Entity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">
              ★
            </div>

            <div>
              <p className="font-semibold text-white">
                Registered Legal Entity: M/S MONAL ENTERPRISES (Immuno Plus)
              </p>

              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                Registered Site: Degree College Road, Khatima, Uttarakhand
                {' '}•{' '}
                Reg ID: SR/5128754/2026
              </p>
            </div>
          </div>

          {/* Verification Link and Validity */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[11px]">

            <a
              href="http://starcertification.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <span>Visit Certification Website</span>

              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="hidden sm:inline text-slate-600">|</span>

            <span className="text-slate-400">
              Certificate dates vary by certificate
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}