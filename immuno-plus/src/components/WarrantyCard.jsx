import React, { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  Printer,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  Clock,
  AlertTriangle,
  PhoneCall,
  CreditCard,
  ArrowRightCircle,
} from "lucide-react";

export const WarrantyCard = ({
  cardRef,

  ticketId = "WRN-8942-EXT",
  productModel = "Immuno+ Water Ionizer",
  variant = "Standard",
  productPrice = "₹1,65,000",
  serialNumber = "IMM2026RV8126",
  purchaseDate = "13 March 2016",

  // Default Base Warranty
  defaultElectronicsYears = 2,
  defaultChamberYears = 5,
  originalElectronicsExpiry = "13 March 2018",
  originalChamberExpiry = "13 March 2021",

  // Prior/Previous Extension (if renewed earlier)
  previousRenewalDate = null,

  // Newly Purchased / Active Extension
  planTitle = "+5 Years Chamber Protection",
  extendedPrice = "₹3,499",
  extendedPurchaseDate = "26 September 2026",
  extendedElectronicsWarranty = 0,
  extendedChamberYears = 5,
  extendedElectronicsExpiry = "13 March 2018",
  chamberExpiry = "26 September 2031",

  // Status: "ACTIVE" / "SUCCESS" / "PAID" (Final) vs. "PENDING" / "PRE_FINAL" (Pre-Payment)
  status = "PENDING",

  onDownloadPdf,
}) => {
  const [copied, setCopied] = useState(false);

  // Status check: Final vs Pre-Final (Pre-Payment)
  const normalizedStatus = String(status || "PENDING").trim().toUpperCase();
  const isFinal =
    normalizedStatus === "ACTIVE" ||
    normalizedStatus === "PAID" ||
    normalizedStatus === "SUCCESS";

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    } else {
      window.print();
    }
  };

  const isElecExtended = Number(extendedElectronicsWarranty) > 0;
  const isChamberExtended = Number(extendedChamberYears) > 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 font-sans text-neutral-800">
      {/* 1. Header Banner */}
      <div
        className={`p-5 rounded-2xl flex items-center justify-between shadow-lg border transition-colors ${
          isFinal
            ? "bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-900 text-white border-emerald-900/40"
            : "bg-gradient-to-r from-amber-950 via-neutral-900 to-neutral-900 text-white border-amber-500/30"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`p-2 rounded-xl shrink-0 border ${
              isFinal
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            }`}
          >
            {isFinal ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">
                {isFinal ? "Warranty Certificate Authenticated" : "Pre-Final Summary — Awaiting Payment"}
              </p>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isFinal
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                }`}
              >
                {isFinal ? "ACTIVE" : "UNPAID"}
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5">
              Reference Ticket:{" "}
              <button
                type="button"
                onClick={handleCopyTicket}
                title="Click to copy ticket ID"
                className={`font-mono underline decoration-dotted inline-flex items-center gap-1 ${
                  isFinal ? "text-emerald-400 hover:text-emerald-300" : "text-amber-400 hover:text-amber-300"
                }`}
              >
                #{ticketId}
                {copied ? (
                  <Check className={`w-3 h-3 ${isFinal ? "text-emerald-400" : "text-amber-400"}`} />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-400" />
                )}
              </button>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer ${
            isFinal
              ? "bg-emerald-500 hover:bg-emerald-400 text-neutral-950"
              : "bg-amber-500 hover:bg-amber-400 text-neutral-950"
          }`}
        >
          <Download className="w-4 h-4" />
          Get PDF
        </button>
      </div>

      {/* 2. Warranty Certificate Card View */}
      <div
        ref={cardRef} 
        className={`bg-white rounded-2xl shadow-md p-6 relative overflow-hidden border ${
          isFinal ? "border-neutral-200/80" : "border-amber-300 ring-2 ring-amber-100"
        }`}
      >
        {/* Subtle Watermark */}
        {isFinal ? (
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-50 rounded-full opacity-60 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] rotate-[-25deg]">
            <span className="text-6xl sm:text-8xl font-black text-amber-950 tracking-widest uppercase">
              PRE-FINAL
            </span>
          </div>
        )}

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-neutral-100 gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {isFinal ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Immuno+ Certified Warranty Record
                </div>
              ) : (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold uppercase tracking-wider rounded-md border border-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Pre-Final Card (Pre-Payment)
                  </div>
                  <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded font-medium">
                    Provisional • Verification Pending
                  </span>
                </>
              )}
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mt-2">
              {isFinal ? "Digital Protection Certificate" : "Pre-Final Warranty Extension Slip"}
            </h3>
            <p className="text-xs text-neutral-500">
              {isFinal
                ? "Official verification for service coverage, assemblies, and doorstep claims."
                : "Coverage terms will be officially authenticated once payment and verification are completed."}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block">
              Ticket Ref
            </span>
            <span className="font-mono font-bold text-neutral-900 text-sm">#{ticketId}</span>
          </div>
        </div>

        {/* Section 1: Product Specifications & Purchase Details */}
        <div className="my-5 relative z-10">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            1. Product & Purchase Specification
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-100 text-xs">
            <div>
              <span className="text-neutral-400 block">Product</span>
              <span className="font-semibold text-neutral-800">{productModel}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Variant</span>
              <span className="font-medium text-neutral-700">{variant}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Purchase Price</span>
              <span className="font-semibold text-neutral-800">{productPrice}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Purchase Date</span>
              <span className="font-medium text-neutral-700">{purchaseDate}</span>
            </div>
            <div className="col-span-2 sm:col-span-4 pt-2 border-t border-neutral-200/50 flex justify-between items-center">
              <span className="text-neutral-500">Machine Serial Number:</span>
              <span className="font-mono font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                {serialNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Default Base Warranty vs. Extended Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 relative z-10">
          <div className="bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-400" /> Default Base Warranty
            </span>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Electronics ({defaultElectronicsYears} Yrs):</span>
                <span className="font-medium text-neutral-700">{originalElectronicsExpiry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Chamber ({defaultChamberYears} Yrs):</span>
                <span className="font-medium text-neutral-700">{originalChamberExpiry}</span>
              </div>
              {previousRenewalDate && (
                <div className="pt-1.5 mt-1 border-t border-neutral-200/60 text-[11px] text-neutral-500 flex justify-between">
                  <span>Prior Renewal:</span>
                  <span className="font-medium text-neutral-700">{previousRenewalDate}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              isFinal
                ? "bg-emerald-50/50 border-emerald-200/70"
                : "bg-amber-50/40 border-amber-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  isFinal ? "text-emerald-800" : "text-amber-900"
                }`}
              >
                <Sparkles className={`w-3 h-3 ${isFinal ? "text-emerald-600" : "text-amber-600"}`} />
                {isFinal ? "Active Extended Plan" : "Selected Extension Plan"}
              </span>
              {!isFinal && (
                <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">
                  PAYMENT DUE
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-600">Plan Title:</span>
                <span className={`font-bold ${isFinal ? "text-emerald-900" : "text-neutral-900"}`}>{planTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{isFinal ? "Purchase Date:" : "Application Date:"}</span>
                <span className="font-medium text-neutral-800">{extendedPurchaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{isFinal ? "Extension Price:" : "Payable Amount:"}</span>
                <span className={`font-bold ${isFinal ? "text-emerald-700" : "text-amber-700"}`}>
                  {extendedPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Covered Components & Expiry */}
        <div className="space-y-2.5 relative z-10">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            {isFinal ? "3. Certified Component Coverage" : "3. Scheduled Component Coverage"}
          </span>

          {/* Electronics Row */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
              isElecExtended
                ? isFinal
                  ? "bg-emerald-50/50 border-emerald-200/80"
                  : "bg-amber-50/50 border-amber-200"
                : "bg-neutral-50/70 border-neutral-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Cpu
                className={`w-4 h-4 ${
                  isElecExtended
                    ? isFinal
                      ? "text-emerald-600"
                      : "text-amber-600"
                    : "text-neutral-400"
                }`}
              />
              <div>
                <p className="font-semibold text-neutral-800">Electronics Unit (SMPS, PCB, Power Module)</p>
                <p className="text-[11px] text-neutral-500">
                  {isElecExtended ? (
                    isFinal ? (
                      <span className="text-emerald-700 font-medium">
                        Extended Expiry: <strong>{extendedElectronicsExpiry}</strong>
                      </span>
                    ) : (
                      <span className="text-amber-800 font-medium">
                        Tentative Expiry: <strong>{extendedElectronicsExpiry}</strong>
                      </span>
                    )
                  ) : (
                    <span>
                      Original Tenure Expired: <strong className="text-neutral-700">{originalElectronicsExpiry}</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isElecExtended
                  ? isFinal
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {isElecExtended ? (isFinal ? `+${extendedElectronicsWarranty} Yrs Plan` : "Pending Payment") : "Expired"}
            </span>
          </div>

          {/* Chamber Row */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
              isChamberExtended
                ? isFinal
                  ? "bg-emerald-50/70 border-emerald-200/90 shadow-xs"
                  : "bg-amber-50/60 border-amber-300 shadow-xs"
                : "bg-neutral-50 border-neutral-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers
                className={`w-4 h-4 ${
                  isChamberExtended
                    ? isFinal
                      ? "text-emerald-600"
                      : "text-amber-600"
                    : "text-neutral-500"
                }`}
              />
              <div>
                <p className="font-semibold text-neutral-800">Electrolysis Chamber Assembly</p>
                <p className={`text-[11px] font-medium ${isFinal ? "text-emerald-800" : "text-amber-900"}`}>
                  {isFinal ? "Effective Extended Expiry: " : "Tentative Expiry on Settlement: "}
                  <strong>{chamberExpiry}</strong>
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isFinal
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}
            >
              {isFinal
                ? `Active (+${extendedChamberYears} Yrs Chamber)`
                : `Payment Pending (+${extendedChamberYears} Yrs)`}
            </span>
          </div>
        </div>

        {/* Section 4: Next Steps & Contact Notice (Prominently rendered in Pre-Final view) */}
        {!isFinal ? (
          <div className="mt-5 p-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl relative z-10 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>Next Steps: Payment & Verification</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              Your request has been logged under Ticket <strong>#{ticketId}</strong>. Our team will contact you shortly to guide you through the further steps and complete your payment of <strong>{extendedPrice}</strong>.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-800 font-medium pt-1 border-t border-amber-200/60">
              <CreditCard className="w-3.5 h-3.5 text-amber-700" />
              <span>Your Final Certified Warranty Card will be issued automatically upon payment confirmation.</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 relative z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>This is an authenticated certificate. Present Ticket <strong>#{ticketId}</strong> during regular maintenance or service calls.</span>
          </div>
        )}
            
      </div>
    </div>
  );
};

export default WarrantyCard;
