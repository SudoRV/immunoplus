// src/components/WarrantyCalculator.jsx
import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Hash,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import WarrantyCard from "./WarrantyCard";

const EXTENDED_WARRANTY_OPTIONS = [
  {
    id: "ext-chamber-5yr",
    label: "+5 Years Chamber Protection",
    scope: "chamber_only",
    electronicsYears: 0,
    chamberYears: 5,
    price: "₹3,499",
    description: "Exclusive 5-year coverage extended exclusively for the Electrolysis Chamber assembly.",
  },
];

const parseYears = (val) => {
  if (val === undefined || val === null) return 0;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const addYears = (startDate, yearsToAdd) => {
  const d = new Date(startDate);
  const year = d.getFullYear() + yearsToAdd;
  const month = d.getMonth();
  const day = d.getDate();

  const newDate = new Date(year, month, day);
  if (newDate.getMonth() !== month) {
    newDate.setDate(0);
  }
  return newDate;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const calculateRemainingTime = (expiryDate, referenceDate = new Date(), startDate = null) => {
  const exp = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
  const now = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  let percentRemaining = 100;
  if (startDate) {
    const totalDuration = exp.getTime() - startDate.getTime();
    const remainingDuration = exp.getTime() - now.getTime();
    if (totalDuration > 0) {
      percentRemaining = Math.max(0, Math.min(100, Math.round((remainingDuration / totalDuration) * 100)));
    }
  }

  if (exp < now) {
    return { isExpired: true, text: "Coverage Expired", percentRemaining: 0 };
  }

  if (exp.getTime() === now.getTime()) {
    return { isExpired: false, text: "Expires today", percentRemaining: 0 };
  }

  let years = exp.getFullYear() - now.getFullYear();
  let months = exp.getMonth() - now.getMonth();
  let days = exp.getDate() - now.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(exp.getFullYear(), exp.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
  if (years === 0 && months === 0 && days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);

  return {
    isExpired: false,
    text: `${parts.join(" ")} remaining`,
    percentRemaining,
  };
};

const LAMBDA_ENDPOINT = "https://x3bbsynf2vwlhegcuppquz2fbm0chccm.lambda-url.ap-south-1.on.aws/";

export default function WarrantyCalculator({ className = "", onResultCalculated }) {
  const [serialNumber, setSerialNumber] = useState("");
  const [registeredPhone, setRegisteredPhone] = useState("");

  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [isCheckingWarranty, setIsCheckingWarranty] = useState(false);
  const [isSubmittingExtension, setIsSubmittingExtension] = useState(false);

  const [extendForm, setExtendForm] = useState({
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    customerAddress: "",
    selectedPlanId: EXTENDED_WARRANTY_OPTIONS[0].id,
  });

  const [extendSubmitted, setExtendSubmitted] = useState(false);
  const [issuedCardData, setIssuedCardData] = useState(null);

  const cardRef = useRef(null);

  const handleCheckWarranty = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setExtendSubmitted(false);
    setIssuedCardData(null);

    const trimmedSerial = serialNumber.trim();
    const trimmedPhone = registeredPhone.trim();

    if (!trimmedSerial) {
      setError("Please provide your product Serial Number.");
      return;
    }

    if (!trimmedPhone) {
      setError("Please enter the registered mobile number linked to the purchase.");
      return;
    }

    setIsCheckingWarranty(true);

    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "fetch_warranty",
          serialNumber: trimmedSerial,
          registeredPhone: trimmedPhone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to retrieve warranty info (Status: ${response.status})`);
      }

      const rawData = await response.json();
      const payload = rawData.data || rawData;

      if (!payload || !payload.purchaseDate) {
        throw new Error(rawData.message || "No warranty records found for this serial and phone number combination.");
      }

      // Split Product Name and Variant on '-'
      const fullProductName = String(payload.productName || "Immuno+ Water Ionizer - Standard");
      let extractedName = fullProductName;
      let extractedVariant = payload.variant || "Standard";

      if (fullProductName.includes("-")) {
        const parts = fullProductName.split("-");
        extractedName = parts[0].trim();
        extractedVariant = parts.slice(1).join("-").trim() || extractedVariant;
      }

      const productPurchaseDate = new Date(payload.purchaseDate);
      const rawRenewedDate = payload.warrantyRenewedDate || payload.extendedWarranty?.warrantyRenewedDate;
      const renewedDate = rawRenewedDate ? new Date(rawRenewedDate) : null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const baseElecYears = parseYears(
        payload.electronicsWarrantyYears ||
        payload.defaultWarranty?.electronicsWarranty ||
        payload.defaultElectronicsWarranty ||
        "2"
      );
      const baseChamberYears = parseYears(
        payload.chamberWarrantyYears ||
        payload.defaultWarranty?.chamberYears ||
        payload.defaultChamberYears ||
        "5"
      );

      const extElecYears = parseYears(
        payload.extendedElectronicsWarranty ||
        payload.extendedWarranty?.electronicsWarrantyAdded ||
        0
      );
      const extChamberYears = parseYears(
        payload.extendedChamberYears ||
        payload.extendedWarranty?.chamberYearsAdded ||
        0
      );

      const baseElecExpiry = addYears(productPurchaseDate, baseElecYears);
      const baseChamberExpiry = addYears(productPurchaseDate, baseChamberYears);

      let effectiveElecExpiry = baseElecExpiry;
      if (extElecYears > 0) {
        effectiveElecExpiry = renewedDate ? addYears(renewedDate, extElecYears) : addYears(baseElecExpiry, extElecYears);
      }

      let effectiveChamberExpiry = baseChamberExpiry;
      if (extChamberYears > 0) {
        effectiveChamberExpiry = renewedDate ? addYears(renewedDate, extChamberYears) : addYears(baseChamberExpiry, extChamberYears);
      }

      const elecEffectiveStart = extElecYears > 0 && renewedDate ? renewedDate : productPurchaseDate;
      const chamberEffectiveStart = extChamberYears > 0 && renewedDate ? renewedDate : productPurchaseDate;

      const electronicsStatus = calculateRemainingTime(effectiveElecExpiry, today, elecEffectiveStart);
      const chamberStatus = calculateRemainingTime(effectiveChamberExpiry, today, chamberEffectiveStart);

      const bothExpired = electronicsStatus.isExpired && chamberStatus.isExpired;
      const eligibleForRenewal = chamberStatus.percentRemaining <= 25 || chamberStatus.isExpired;

      const calculatedData = {
        ticketId: payload.ticketId || "",
        serialNumber: trimmedSerial,
        registeredPhone: trimmedPhone,
        productName: extractedName,
        variant: extractedVariant,
        purchaseDateFormatted: formatDate(productPurchaseDate),
        rawPurchaseDate: payload.purchaseDate,
        rawRenewedDate: rawRenewedDate,
        warrantyRenewedDateFormatted: renewedDate ? formatDate(renewedDate) : null,
        chamberPercentRemaining: chamberStatus.percentRemaining,
        bothExpired,
        eligibleForRenewal,
        customerName: payload.customerName || payload.name || "",
        customerEmail: payload.customerEmail || payload.email || "",
        customerAddress: payload.customerAddress || payload.address || "",
        productMrp: payload.productMrp || "",
        productPrice: payload.productPrice || "",
        defaultElectronicsWarranty: baseElecYears,
        defaultChamberYears: baseChamberYears,
        planTitle: payload.planTitle || payload.extendedWarranty?.planTitle || "",
        extendedPrice: payload.extendedPrice || payload.extendedWarranty?.price || "",
        paymentStatus: payload.paymentStatus || "ACTIVE",
        rawExistingRowData: payload,
        electronics: {
          baseYears: baseElecYears,
          extendedYears: extElecYears,
          totalYears: baseElecYears + extElecYears,
          isAffectedByExtension: extElecYears > 0,
          originalExpiryDate: formatDate(baseElecExpiry),
          expiryDate: formatDate(effectiveElecExpiry),
          rawExpiryDate: effectiveElecExpiry,
          status: electronicsStatus,
        },
        chamber: {
          baseYears: baseChamberYears,
          extendedYears: extChamberYears,
          totalYears: baseChamberYears + extChamberYears,
          isAffectedByExtension: extChamberYears > 0,
          originalExpiryDate: formatDate(baseChamberExpiry),
          expiryDate: formatDate(effectiveChamberExpiry),
          rawExpiryDate: effectiveChamberExpiry,
          status: chamberStatus,
        },
      };

      setResult(calculatedData);
      setExtendForm({
        customerName: payload.customerName || payload.name || "",
        customerEmail: payload.customerEmail || payload.email || "",
        customerMobile: trimmedPhone,
        customerAddress: payload.customerAddress || payload.address || "",
        selectedPlanId: EXTENDED_WARRANTY_OPTIONS[0].id,
      });

      if (onResultCalculated) onResultCalculated(calculatedData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch warranty status. Please try again.");
    } finally {
      setIsCheckingWarranty(false);
    }
  };

  const handleExtendWarrantySubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingExtension(true);

    const chosenPlan =
      EXTENDED_WARRANTY_OPTIONS.find((p) => p.id === extendForm.selectedPlanId) || EXTENDED_WARRANTY_OPTIONS[0];
    const ticketId = result.rawExistingRowData?.ticketId || `WRN-${Math.floor(1000 + Math.random() * 9000)}-EXT`;

    const payload = {
      action: "extend_warranty",
      ticketId,
      customerName: extendForm.customerName.trim() || result.customerName,
      customerEmail: extendForm.customerEmail.trim() || result.customerEmail,
      customerMobile: extendForm.customerMobile.trim() || result.registeredPhone,
      serviceAddress: extendForm.customerAddress.trim() || result.customerAddress,
      productName: `${result.productName} - ${result.variant}`,
      serialNumber: result.serialNumber,
      purchaseDate: result.rawPurchaseDate,
      productMrp: result.productMrp || result.rawExistingRowData?.productMrp || "",
      productPrice: result.productPrice || result.rawExistingRowData?.productPrice || "",
      defaultElectronicsWarranty: result.defaultElectronicsWarranty,
      defaultChamberYears: result.defaultChamberYears,
      planTitle: chosenPlan.label,
      price: chosenPlan.price,
      extendedPrice: chosenPlan.price,
      extendedElectronicsWarranty: chosenPlan.electronicsYears,
      extendedChamberYears: chosenPlan.chamberYears,
      extendedYears: Math.max(chosenPlan.electronicsYears, chosenPlan.chamberYears),
      paymentStatus: "PENDING",
    };

    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit extension. Status: ${response.status}`);
      }

      const now = new Date();
      const extElectronicsDate =
        chosenPlan.electronicsYears > 0
          ? addYears(now, chosenPlan.electronicsYears)
          : result.electronics.rawExpiryDate;

      const extChamberDate =
        chosenPlan.chamberYears > 0
          ? addYears(now, chosenPlan.chamberYears)
          : result.chamber.rawExpiryDate;

      setIssuedCardData({
        ticketId,
        productModel: result.productName,
        variant: result.variant,
        serialNumber: result.serialNumber,
        purchaseDate: result.purchaseDateFormatted,
        productPrice: result.productPrice,
        defaultElectronicsYears: result.defaultElectronicsWarranty,
        defaultChamberYears: result.defaultChamberYears,
        originalElectronicsExpiry: result.electronics.originalExpiryDate,
        originalChamberExpiry: result.chamber.originalExpiryDate,
        previousRenewalDate: result.warrantyRenewedDateFormatted,
        planTitle: chosenPlan.label,
        extendedPrice: chosenPlan.price,
        extendedPurchaseDate: formatDate(now),
        extendedElectronicsWarranty: chosenPlan.electronicsYears,
        extendedChamberYears: chosenPlan.chamberYears,
        extendedElectronicsExpiry:
          chosenPlan.electronicsYears > 0 ? formatDate(extElectronicsDate) : `${result.electronics.expiryDate} (No Change)`,
        chamberExpiry: formatDate(extChamberDate),
        status: "PENDING",
      });

      setExtendSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to process warranty extension.");
    } finally {
      setIsSubmittingExtension(false);
    }
  };

    const handleDownloadCardPdf = async () => {
    if (!cardRef.current) return;

    try {
      const element = cardRef.current;
      
      // Use html-to-image to bypass the oklch parsing limitation
      const imgData = await toPng(element, {
        pixelRatio: 2, 
        backgroundColor: "#ffffff",
        style: {
          transform: 'scale(1)', // Ensures no scaling artifacts
          transformOrigin: 'top left'
        }
      });

      // Get exact dimensions for the PDF mapping
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      
      const downloadSerial = issuedCardData?.serialNumber || result?.serialNumber || "Document";
      pdf.save(`Immuno+ Warranty Card ${downloadSerial}.pdf`);
      
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please try again.");
    }
  };


  const activeSelectedPlan =
    EXTENDED_WARRANTY_OPTIONS.find((p) => p.id === extendForm.selectedPlanId) || EXTENDED_WARRANTY_OPTIONS[0];

  // Strictly gate the card: NEVER render until result exists AND (not expired OR extension was submitted)
  const shouldRenderCard = Boolean(result) && (!result.bothExpired || extendSubmitted);

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* 1. Search Form */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-500 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            Live Cloud Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 tracking-tight">
            Check Your Warranty
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-md mx-auto">
            Enter your product serial number and registered mobile number to fetch warranty status.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm rounded-2xl animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCheckWarranty} className="space-y-4">
          <div>
            <label htmlFor="serialNumber" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Serial Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="serialNumber"
                required
                disabled={isCheckingWarranty}
                placeholder="e.g. IM9-2023-0926-9884"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full border border-neutral-200 focus:border-blue-500 rounded-2xl px-4 py-3.5 pl-10 text-sm text-neutral-900 focus:outline-none transition disabled:opacity-60"
              />
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="registeredPhone" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Registered Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="registeredPhone"
                required
                disabled={isCheckingWarranty}
                placeholder="+91 98765 43210"
                value={registeredPhone}
                onChange={(e) => setRegisteredPhone(e.target.value)}
                className="w-full border border-neutral-200 focus:border-blue-500 rounded-2xl px-4 py-3.5 pl-10 text-sm text-neutral-900 focus:outline-none transition disabled:opacity-60"
              />
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCheckingWarranty}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl font-semibold text-sm text-white bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCheckingWarranty ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Fetching Details from Cloud...</span>
              </>
            ) : (
              <span>Fetch Warranty Details</span>
            )}
          </button>
        </form>
      </div>

      {/* 2. Fetched Status Overview */}
      {result && (
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-9 border border-neutral-100 shadow-xl shadow-neutral-900/5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-5 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-500 shadow-sm shadow-blue-500/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Warranty Status Overview</h3>
                <p className="text-xs text-neutral-500">
                  Purchased on <span className="font-semibold text-neutral-800">{result.purchaseDateFormatted}</span>
                  {result.warrantyRenewedDateFormatted && (
                    <span className="ml-2 pl-2 border-l border-neutral-300 text-emerald-600 font-medium">
                      Renewed: {result.warrantyRenewedDateFormatted}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700">
              {result.productName} ({result.variant})
            </div>
          </div>

          {result.bothExpired && !extendSubmitted && (
            <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              All base and prior warranty terms have expired. Extend coverage below to initiate a renewal request.
            </div>
          )}

          {/* Assemblies Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Electronics Unit */}
            <div
              className={`p-6 rounded-2xl transition-all relative ${
                result.electronics.isAffectedByExtension
                  ? "bg-emerald-50/40 border border-emerald-200"
                  : result.electronics.status.isExpired
                  ? "bg-rose-50/50 border border-rose-100"
                  : "bg-neutral-50 shadow-xs"
              }`}
            >
              {result.electronics.isAffectedByExtension && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                  <RefreshCw className="w-2.5 h-2.5" /> Plan Extended
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-500">
                    <Cpu className="w-4 h-4" />
                  </div>
                  Electronics Unit
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white shadow-xs text-neutral-700">
                  {result.electronics.baseYears} {result.electronics.extendedYears > 0 ? `+ ${result.electronics.extendedYears}` : ""} Years
                </span>
              </div>

              {result.electronics.status.isExpired ? (
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                    <ShieldAlert className="w-3.5 h-3.5" /> Expired
                  </span>
                  <p className="mt-3 text-xs text-neutral-500">
                    Expired: <span className="text-neutral-800 font-medium">{result.electronics.expiryDate}</span>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      {result.electronics.status.percentRemaining}% life left
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-neutral-500">
                    Valid until: <span className="text-neutral-900 font-semibold">{result.electronics.expiryDate}</span>
                  </p>
                  {result.electronics.isAffectedByExtension && (
                    <p className="text-[11px] text-neutral-400 line-through mt-0.5">
                      Base Expiry: {result.electronics.originalExpiryDate}
                    </p>
                  )}
                  <p className="text-xs text-blue-600 font-semibold mt-1">{result.electronics.status.text}</p>
                </div>
              )}
            </div>

            {/* Chamber */}
            <div
              className={`p-6 rounded-2xl transition-all relative ${
                result.chamber.isAffectedByExtension
                  ? "bg-emerald-50/40 border border-emerald-200"
                  : result.chamber.status.isExpired
                  ? "bg-rose-50/50 border border-rose-100"
                  : "bg-neutral-50 shadow-xs"
              }`}
            >
              {result.chamber.isAffectedByExtension && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                  <RefreshCw className="w-2.5 h-2.5" /> Plan Extended
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-500">
                    <Layers className="w-4 h-4" />
                  </div>
                  Chamber
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white shadow-xs text-neutral-700">
                  {result.chamber.baseYears} {result.chamber.extendedYears > 0 ? `+ ${result.chamber.extendedYears}` : ""} Years
                </span>
              </div>

              {result.chamber.status.isExpired ? (
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                    <ShieldAlert className="w-3.5 h-3.5" /> Expired
                  </span>
                  <p className="mt-3 text-xs text-neutral-500">
                    Expired: <span className="text-neutral-800 font-medium">{result.chamber.expiryDate}</span>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      {result.chamber.status.percentRemaining}% life left
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-neutral-500">
                    Valid until: <span className="text-neutral-900 font-semibold">{result.chamber.expiryDate}</span>
                  </p>
                  {result.chamber.isAffectedByExtension && (
                    <p className="text-[11px] text-neutral-400 line-through mt-0.5">
                      Base Expiry: {result.chamber.originalExpiryDate}
                    </p>
                  )}
                  <p className="text-xs text-blue-600 font-semibold mt-1">{result.chamber.status.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

     {/* 3. Certificate Card: Conditionally displays Pre-Final or Final Card */}
{shouldRenderCard && (
  <div className="mt-8 animate-in fade-in duration-300 space-y-4">
    {extendSubmitted && (
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Extension Application Submitted (Pre-Final Stage)</p>
          <p className="text-amber-800 mt-0.5">
            Your pre-final warranty card has been generated. Our team will contact you for further steps and payment.
          </p>
        </div>
      </div>
    )}

    <div>
      <WarrantyCard
        cardRef={cardRef}
        
        ticketId={extendSubmitted ? issuedCardData?.ticketId : result.ticketId}
        productModel={extendSubmitted ? issuedCardData?.productModel : result.productName}
        variant={extendSubmitted ? issuedCardData?.variant : result.variant}
        productPrice={extendSubmitted ? issuedCardData?.productPrice : result.productPrice}
        serialNumber={extendSubmitted ? issuedCardData?.serialNumber : result.serialNumber}
        purchaseDate={extendSubmitted ? issuedCardData?.purchaseDate : result.purchaseDateFormatted}
        defaultElectronicsYears={result.defaultElectronicsWarranty}
        defaultChamberYears={result.defaultChamberYears}
        originalElectronicsExpiry={result.electronics.originalExpiryDate}
        originalChamberExpiry={result.chamber.originalExpiryDate}
        previousRenewalDate={result.warrantyRenewedDateFormatted}
        planTitle={extendSubmitted ? issuedCardData?.planTitle : (result.planTitle || "+5 Years Chamber Protection")}
        extendedPrice={extendSubmitted ? issuedCardData?.extendedPrice : result.extendedPrice}
        extendedPurchaseDate={extendSubmitted ? issuedCardData?.extendedPurchaseDate : (result.warrantyRenewedDateFormatted || result.purchaseDateFormatted)}
        extendedElectronicsWarranty={extendSubmitted ? issuedCardData?.extendedElectronicsWarranty : result.electronics.extendedYears}
        extendedChamberYears={extendSubmitted ? issuedCardData?.extendedChamberYears : result.chamber.extendedYears}
        extendedElectronicsExpiry={extendSubmitted ? issuedCardData?.extendedElectronicsExpiry : result.electronics.expiryDate}
        chamberExpiry={extendSubmitted ? issuedCardData?.chamberExpiry : result.chamber.expiryDate}
        status={extendSubmitted ? "PRE_FINAL" : (result?.paymentStatus || "ACTIVE")}
        onDownloadPdf={handleDownloadCardPdf}
      />
    </div>
  </div>
)}


      {/* 4. Extend Chamber Form: Rendered ONLY if chamber warranty <= 25% or expired */}
      {result && result.eligibleForRenewal && !extendSubmitted && (
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-9 shadow-xl shadow-neutral-900/5 border border-neutral-100 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-start gap-3.5 mb-6">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0 shadow-sm shadow-emerald-500/10">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Extend Chamber Warranty</h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Your chamber warranty coverage is at or below 25% (or has expired). Apply below to renew and protect your machine.
              </p>
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <label htmlFor="selectedPlanId" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Select Protection Package
            </label>
            <div className="relative">
              <select
                id="selectedPlanId"
                value={extendForm.selectedPlanId}
                onChange={(e) => setExtendForm({ ...extendForm, selectedPlanId: e.target.value })}
                disabled={isSubmittingExtension}
                className="w-full appearance-none border border-neutral-200 focus:border-emerald-500 bg-white rounded-2xl px-4 py-3.5 pr-10 text-sm text-neutral-900 font-medium focus:outline-none transition disabled:opacity-60"
              >
                {EXTENDED_WARRANTY_OPTIONS.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.label} - {plan.price}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-emerald-950 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{activeSelectedPlan.label}</p>
                  <p className="text-xs text-neutral-300">{activeSelectedPlan.description}</p>
                </div>
              </div>
              <div className="text-base font-extrabold text-emerald-400 bg-white/10 px-3.5 py-1.5 rounded-xl whitespace-nowrap ml-3">
                {activeSelectedPlan.price}
              </div>
            </div>
          </div>

          <form onSubmit={handleExtendWarrantySubmit} className="space-y-4">
            <div className="bg-neutral-50 p-5 rounded-2xl space-y-4 border border-neutral-100">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Customer & Machine Details</p>

              <h2 className="text-xl font-bold">{result.productName} {result.variant}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-white border border-neutral-200/70 rounded-xl text-xs">                            
                <div>
                  <span className="text-neutral-400 block">Purchase Price</span>
                  <span className="font-semibold text-neutral-800">{result.productPrice || "Verified"}</span>
                </div>
                
                <div>
                  <span className="text-neutral-400 block">Base Electronics Warranty</span>
                  <span className="font-semibold text-neutral-800">{result.defaultElectronicsWarranty} Years</span>
                </div>     
                
                <div>
                  <span className="text-neutral-400 block">Base Chamber Warranty</span>
                  <span className="font-semibold text-neutral-800">{result.defaultChamberYears} Years</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="customerName"
                      required
                      disabled={isSubmittingExtension}
                      placeholder="John Doe"
                      value={extendForm.customerName}
                      onChange={(e) => setExtendForm({ ...extendForm, customerName: e.target.value })}
                      className="w-full bg-white shadow-xs rounded-xl px-3.5 py-2.5 pl-9 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition disabled:opacity-60"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="customerMobile" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="customerMobile"
                      required
                      disabled={isSubmittingExtension}
                      value={extendForm.customerMobile}
                      onChange={(e) => setExtendForm({ ...extendForm, customerMobile: e.target.value })}
                      className="w-full bg-white shadow-xs rounded-xl px-3.5 py-2.5 pl-9 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition disabled:opacity-60"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="customerEmail"
                    required
                    disabled={isSubmittingExtension}
                    placeholder="user@example.com"
                    value={extendForm.customerEmail}
                    onChange={(e) => setExtendForm({ ...extendForm, customerEmail: e.target.value })}
                    className="w-full bg-white shadow-xs rounded-xl px-3.5 py-2.5 pl-9 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition disabled:opacity-60"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customerAddress" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Service & Installation Address
                </label>
                <div className="relative">
                  <textarea
                    id="customerAddress"
                    required
                    rows={2}
                    disabled={isSubmittingExtension}
                    placeholder="Street, City, Pin Code"
                    value={extendForm.customerAddress}
                    onChange={(e) => setExtendForm({ ...extendForm, customerAddress: e.target.value })}
                    className="w-full bg-white shadow-xs rounded-xl px-3.5 py-2.5 pl-9 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition resize-none disabled:opacity-60"
                  />
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingExtension}
              className="w-full mt-3 py-3.5 px-6 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-neutral-400 disabled:to-neutral-400 shadow-lg shadow-emerald-600/25 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmittingExtension ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Extension Request...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Confirm {activeSelectedPlan.label} ({activeSelectedPlan.price})</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
