// src/pages/Certifications.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Building2, 
  MapPin, 
  FileCheck,
  ArrowLeft,
  FileText,
  Maximize2,
  Download,
  Eye,
  X
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/certifications';

export default function Certifications() {
  const { certificate_id } = useParams();
  const navigate = useNavigate();
  const [copiedNo, setCopiedNo] = useState(null);
  const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'pdf'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCert = CERTIFICATIONS.find((cert) => cert.id === certificate_id) || CERTIFICATIONS[0];

  const handleCopy = (certNo) => {
    navigator.clipboard.writeText(certNo);
    setCopiedNo(certNo);
    setTimeout(() => setCopiedNo(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Back Link & Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <Link
            to="/"
            className="fixed top-2 left-2 md:top-6 md:left-6 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-black p-1 px-2 rounded-full backdrop-blur-md mb-4 transition-colors z-100"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Immuno Plus Official Certifications
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            All manufacturing, safety, and management systems of{' '}
            <strong className="text-slate-800 font-medium">Immuno Plus (M/S Monal Enterprises)</strong> are audited and registered by{' '}
            <strong className="text-slate-800 font-medium">Star Certifications UK</strong>.
          </p>
        </div>

        {/* Dual-Pane View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Route-driven Selector Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Audited Standards
              </span>
              <span className="text-xs text-blue-600 font-medium">
                {CERTIFICATIONS.length} Registered Accreditations
              </span>
            </div>

            {CERTIFICATIONS.map((cert) => {
              const isSelected = cert.id === activeCert.id;
              return (
                <button
                  key={cert.id}
                  onClick={() => navigate(`/certifications/${cert.id}`)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-white border-[#1d68f0] shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cert.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {cert.certNo}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-base font-bold ${isSelected ? 'text-[#1d68f0]' : 'text-slate-900'}`}>
                      {cert.standard}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{cert.name}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid & Active
                    </span>
                    <span>Due: {cert.recertDate}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Document Facsimile & Live PDF Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
            
            {/* Top Toolbar */}
            <div className="bg-[#0f172a] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-amber-400 text-lg font-bold">★</span>
                <div>
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-blue-300">
                    Official UK Registered Document
                  </p>
                  <p className="text-sm font-bold leading-tight">{activeCert.standard}</p>
                </div>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setViewMode('summary')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                    viewMode === 'summary'
                      ? 'bg-[#1d68f0] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Summary</span>
                </button>
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                    viewMode === 'pdf'
                      ? 'bg-[#1d68f0] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Original PDF</span>
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-slate-100/80 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-700 font-semibold">{activeCert.certNo}</span>
                <button
                  onClick={() => handleCopy(activeCert.certNo)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
                  title="Copy Certificate Number"
                >
                  {copiedNo === activeCert.certNo ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeCert.pdfUrl}
                  download
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1d68f0] font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1d68f0] font-medium transition"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* VIEW 1: Interactive Summary Dossier */}
            {viewMode === 'summary' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                  <div>
                    <p className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                      Zertifikat • Certificaat • Certificato • Сертификат • شهادة
                    </p>
                    <p className="text-lg font-black text-slate-900 tracking-tight mt-1">
                      CERTIFICATE OF COMPLIANCE
                    </p>
                    <p className="text-xs text-slate-500">{activeCert.name}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 inline-block">
                      {activeCert.certNo}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Certificate Registration No.</p>
                  </div>
                </div>

                {/* Certified Legal Entity */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    Certified Entity & Brand
                  </div>
                  <p className="text-lg font-bold text-[#0f172a]">
                    {activeCert.legalEntity}
                  </p>
                  <div className="flex items-start gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{activeCert.registeredSite}</span>
                  </div>
                </div>

                {/* Scope & Description */}
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Scope of Certification
                  </p>
                  <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-slate-800 leading-relaxed font-medium">
                    {activeCert.scope}
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    {activeCert.description}
                  </p>
                </div>

                {/* Surveillance Schedule */}
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Audit & Compliance Validity Schedule
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Initial Reg</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{activeCert.initialDate}</p>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <p className="text-[10px] text-slate-400 uppercase font-medium">1st Surveillance</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{activeCert.surveillance1}</p>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <p className="text-[10px] text-slate-400 uppercase font-medium">2nd Surveillance</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{activeCert.surveillance2}</p>
                    </div>
                    <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60">
                      <p className="text-[10px] text-emerald-700 uppercase font-medium">Recertification Due</p>
                      <p className="text-xs font-bold text-emerald-900 mt-0.5">{activeCert.recertDate}</p>
                    </div>
                  </div>
                </div>

                {/* Authority Footer */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                  <div>
                    <p className="font-semibold text-slate-800">{activeCert.issuingBody}</p>
                    <p className="text-[11px] text-slate-500">{activeCert.issuingAddress}</p>
                    <p className="text-[10px] text-slate-400">{activeCert.accreditation}</p>
                  </div>
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs"
                  >
                    <span>Verify on Star Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* VIEW 2: Embedded Direct PDF Viewer */}
            {viewMode === 'pdf' && (
              <div className="relative w-full h-[640px] bg-slate-900">
                <object
                  data={`${activeCert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  {/* Fallback for browsers without native PDF embed support */}
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-200 bg-slate-800">
                    <FileText className="w-12 h-12 text-slate-400 mb-3" />
                    <p className="text-sm font-semibold">PDF Preview Not Directly Supported</p>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                      Your mobile browser or configuration doesn't embed PDFs inline. You can download or view the original PDF document directly.
                    </p>
                    <a
                      href={activeCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#1d68f0] hover:bg-blue-600 rounded-lg text-xs font-semibold text-white transition"
                    >
                      Open Document in New Tab
                    </a>
                  </div>
                </object>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Fullscreen PDF Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">{activeCert.standard} - Official PDF</h3>
                <p className="text-xs text-slate-400 font-mono">Reg ID: {activeCert.certNo}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeCert.pdfUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal PDF Embed */}
            <div className="flex-1 bg-slate-900">
              <iframe
                src={`${activeCert.pdfUrl}#toolbar=1`}
                title={`${activeCert.standard} Document`}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
