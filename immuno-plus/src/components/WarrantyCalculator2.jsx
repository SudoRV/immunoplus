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
  Download,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import WarrantyCard from "./WarrantyCard";

// Only 5-year extended warranty plan at ₹3,499
const EXTENDED_WARRANTY_OPTIONS = [
  { id: "ext-5yr", label: "+5 Years Extended Comprehensive Plan", years: 5, price: "₹3,499" },
];

const parseYears = (str = "") => {
  const match = String(str).match(/\d+/);
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
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const [extendForm, setExtendForm] = useState({
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    customerAddress: "",
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

      const inputDate = new Date(payload.purchaseDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const electronicsYears = parseYears(payload.electronicsWarrantyYears || payload.electronicsWarranty || "2");
      const chamberYears = parseYears(payload.chamberWarrantyYears || payload.chamberWarranty || "5");

      const electronicsExpiry = payload.electronicsExpiryDate
        ? new Date(payload.electronicsExpiryDate)
        : addYears(inputDate, electronicsYears);

      const chamberExpiry = payload.chamberExpiryDate
        ? new Date(payload.chamberExpiryDate)
        : addYears(inputDate, chamberYears);

      const electronicsStatus = calculateRemainingTime(electronicsExpiry, today, inputDate);
      const chamberStatus = calculateRemainingTime(chamberExpiry, today, inputDate);

      const minPercent = Math.min(electronicsStatus.percentRemaining, chamberStatus.percentRemaining);
      const eligibleForRenewal = minPercent <= 25 || electronicsStatus.isExpired || chamberStatus.isExpired;

      const calculatedData = {
        serialNumber: trimmedSerial,
        registeredPhone: trimmedPhone,
        productName: payload.productName || "Immuno+ Water Ionizer",
        variant: payload.variant || "Standard",
        purchaseDateFormatted: formatDate(inputDate),
        rawPurchaseDate: payload.purchaseDate,
        minPercentRemaining: minPercent,
        eligibleForRenewal,
        customerName: payload.customerName || "",
        customerEmail: payload.customerEmail || "",
        customerAddress: payload.customerAddress || "",
        electronics: {
          totalYears: electronicsYears,
          expiryDate: formatDate(electronicsExpiry),
          rawExpiryDate: electronicsExpiry,
          status: electronicsStatus,
        },
        chamber: {
          totalYears: chamberYears,
          expiryDate: formatDate(chamberExpiry),
          rawExpiryDate: chamberExpiry,
          status: chamberStatus,
        },
      };

      setResult(calculatedData);
      setExtendForm({
        customerName: payload.customerName || "",
        customerEmail: payload.customerEmail || "",
        customerMobile: trimmedPhone,
        customerAddress: payload.customerAddress || "",
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

    const chosenPlan = EXTENDED_WARRANTY_OPTIONS[0];
    const ticketId = `WRN-${Math.floor(1000 + Math.random() * 9000)}-EXT`;

    const payload = {
      action: "extend_warranty",
      ticketId,
      customerName: extendForm.customerName.trim(),
      customerEmail: extendForm.customerEmail.trim(),
      customerMobile: extendForm.customerMobile.trim(),
      serviceAddress: extendForm.customerAddress.trim(),
      productName: `${result.productName} (${result.variant})`,
      serialNumber: result.serialNumber,
      planTitle: chosenPlan.label,
      price: chosenPlan.price,
      extendedYears: chosenPlan.years,
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

      const extElectronicsDate = addYears(result.electronics.rawExpiryDate, chosenPlan.years);
      const extChamberDate = addYears(result.chamber.rawExpiryDate, chosenPlan.years);

      setIssuedCardData({
        ticketId,
        productModel: `${result.productName} — ${result.variant}`,
        serialNumber: result.serialNumber,
        purchaseDate: result.rawPurchaseDate,
        originalElectronicsExpiry: result.electronics.expiryDate,
        extendedElectronicsExpiry: formatDate(extElectronicsDate),
        chamberExpiry: formatDate(extChamberDate),
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
    setIsDownloadingPdf(true);

    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Warranty_Card_${issuedCardData?.serialNumber || "Doc"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Search Input Form */}
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

      {/* Warranty Status Details View */}
      {result && (
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-9 border border-neutral-100 shadow-xl shadow-neutral-900/5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-5 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-500 shadow-sm shadow-blue-500/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Warranty Status Report</h3>
                <p className="text-xs text-neutral-500">
                  Purchased on <span className="font-semibold text-neutral-800">{result.purchaseDateFormatted}</span>
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700">
              {result.productName} ({result.variant})
            </div>
          </div>

          {/* Assemblies breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div
              className={`p-6 rounded-2xl transition-all ${
                result.electronics.status.isExpired ? "bg-rose-50/50 border border-rose-100" : "bg-neutral-50 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-500">
                    <Cpu className="w-4 h-4" />
                  </div>
                  Electronics Unit
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white shadow-xs text-neutral-700">
                  {result.electronics.totalYears} Years
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
                  <p className="text-xs text-blue-600 font-semibold mt-1">{result.electronics.status.text}</p>
                </div>
              )}
            </div>

            <div
              className={`p-6 rounded-2xl transition-all ${
                result.chamber.status.isExpired ? "bg-rose-50/50 border border-rose-100" : "bg-neutral-50 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-500">
                    <Layers className="w-4 h-4" />
                  </div>
                  Chamber
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white shadow-xs text-neutral-700">
                  {result.chamber.totalYears} Years
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
                  <p className="text-xs text-blue-600 font-semibold mt-1">{result.chamber.status.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Extend View: Only shown when expiring or warranty life <= 25% */}
      {result && result.eligibleForRenewal && (
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-9 shadow-xl shadow-neutral-900/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {!extendSubmitted ? (
            <>
              <div className="flex items-start gap-3.5 mb-6">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0 shadow-sm shadow-emerald-500/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Extend & Protect Coverage</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Your warranty coverage is at or below 25% (or has expired). Renew now to maintain uninterrupted coverage.
                  </p>
                </div>
              </div>

              {/* 5 Year Plan Card Only */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-emerald-950 text-white flex items-center justify-between mb-6 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{EXTENDED_WARRANTY_OPTIONS[0].label}</p>
                    <p className="text-xs text-neutral-300">Comprehensive coverage on electronics & chamber</p>
                  </div>
                </div>
                <div className="text-base font-extrabold text-emerald-400 bg-white/10 px-3.5 py-1.5 rounded-xl">
                  {EXTENDED_WARRANTY_OPTIONS[0].price}
                </div>
              </div>

              <form onSubmit={handleExtendWarrantySubmit} className="space-y-4">
                <div className="bg-neutral-50 p-5 rounded-2xl space-y-4 border border-neutral-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Customer Details</p>
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
                      <span>Confirm 5-Year Protection (₹3,499)</span>
                      <ArrowRight className="w-4 h-4 text-emerald-200" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Post-Submission View: Warranty Card & PDF Download */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Warranty Extended Successfully!</h3>
                  <p className="text-xs text-neutral-500">Your digital certificate is generated and ready for download.</p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCardPdf}
                  disabled={isDownloadingPdf}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md active:scale-95 transition disabled:opacity-60 cursor-pointer"
                >
                  {isDownloadingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Warranty Card (PDF)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Only this node gets converted into the PDF */}
              <div ref={cardRef} className="p-2 bg-white rounded-2xl">
                <WarrantyCard
                  ticketId={issuedCardData?.ticketId}
                  productModel={issuedCardData?.productModel}
                  serialNumber={issuedCardData?.serialNumber}
                  purchaseDate={issuedCardData?.purchaseDate}
                  originalElectronicsExpiry={issuedCardData?.originalElectronicsExpiry}
                  extendedElectronicsExpiry={issuedCardData?.extendedElectronicsExpiry}
                  chamberExpiry={issuedCardData?.chamberExpiry}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
