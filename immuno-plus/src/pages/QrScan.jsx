import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";

// Static asset imports so the bundler bundles and provides the correct URL
import android_whatsapp from "../assets/icons/android_whatsapp.png";
import android_phone from "../assets/icons/android_phone.png";
import android_email from "../assets/icons/android_email.png";

import ios_whatsapp from "../assets/icons/ios_whatsapp.png";
import ios_phone from "../assets/icons/ios_phone.png";
import ios_email from "../assets/icons/ios_email.png";
import { logByEvent } from "../services/fcmAnalytics";

const pageMetadata = [
  <title key="title">QrScan Redirect | Immuno+</title>,
];

const ICON_MAP = {
  android: {
    whatsapp: android_whatsapp,
    phone: android_phone,
    email: android_email,
  },
  ios: {
    whatsapp: ios_whatsapp,
    phone: ios_phone,
    email: ios_email,
  },
};

function detectOS() {
  if (typeof window === "undefined") return "android";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "android";
}

const REDIRECT_DELAY_MS = 3000;

export default function QrScan() {
  const { appname } = useParams();
  const [searchParams] = useSearchParams();

  const [os, setOS] = useState("android");
  const [targetUrl, setTargetUrl] = useState("");
  const [error, setError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setOS(detectOS());
  }, []);

  const screen = searchParams.get("s");
  const referrer = screen === "q" ? "quotation" : screen === "o" ? "order" : screen === "j" ? "dealer" : "contact";
  const normalizedApp = (appname || "").toLowerCase();

  // Resolve bundled asset reference safely
  const resolvedIcon =
    ICON_MAP[os]?.[normalizedApp] ||
    ICON_MAP["android"]?.[normalizedApp] ||
    ICON_MAP["android"]["whatsapp"];

  const appMeta = useMemo(() => {
    switch (normalizedApp) {
      case "whatsapp":
        return {
          title: "WhatsApp",
          accentRing: "ring-[#25D366]/20",
          progressBg: "bg-[#25D366]",
          linkText: "text-[#25D366]",
        };
      case "phone":
        return {
          title: "Phone Dialer",
          accentRing: os === "ios" ? "ring-[#34C759]/20" : "ring-[#1A73E8]/20",
          progressBg: os === "ios" ? "bg-[#34C759]" : "bg-[#1A73E8]",
          linkText: os === "ios" ? "text-[#34C759]" : "text-[#1A73E8]",
        };
      case "email":
        return {
          title: os === "ios" ? "Apple Mail" : "Gmail",
          accentRing: os === "ios" ? "ring-sky-500/20" : "ring-slate-300/40",
          progressBg: os === "ios" ? "bg-sky-500" : "bg-slate-800",
          linkText: os === "ios" ? "text-sky-600" : "text-slate-700",
        };
      default:
        return {
          title: "Application",
          accentRing: "ring-slate-400/20",
          progressBg: "bg-slate-800",
          linkText: "text-slate-800",
        };
    }
  }, [normalizedApp, os]);

  useEffect(() => {
    const resolveDestination = async () => {
      try {
        const queryTarget = searchParams.get("redirect_url") || searchParams.get("target");

        if (queryTarget) {
          setTargetUrl(decodeURIComponent(queryTarget));
          return;
        }
        setError(true);
      } catch {
        setError(true);
      }
    };

    resolveDestination();
  }, [normalizedApp, searchParams]);

  function logContactRedirect() {
    const productId = searchParams.get("product_id");

    const productDetails = productId ? {
      product_id: productId,
      items: [
        {
          item_id: productId
        }
      ]
    } : {};

    if (targetUrl) {
      logByEvent("generate_lead", {
        method: normalizedApp || "unknown",
        lead_type: `qr_scan_${referrer}`,
        device_os: os,

        ...productDetails
      })

      window.location.replace(targetUrl);
    }
  }

  useEffect(() => {
    if (!targetUrl) return;

    // Trigger the CSS progress bar animation
    const animFrame = requestAnimationFrame(() => {
      setIsRedirecting(true);
    });

    const timer = setTimeout(() => {
      try {
        logContactRedirect()
      } catch (e) {
        console.warn("Analytics error:", e);
      }
    }, REDIRECT_DELAY_MS);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer);
    };
  }, [targetUrl, normalizedApp, os]);

  return (
    <div className="h-full bg-slate-300 flex items-center justify-center p-4 selection:bg-none font-sans px-6">
      {pageMetadata}
      
      <div className="w-full max-w-90 bg-white rounded-[28px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center flex flex-col items-center">

        <div className="mb-6 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            ImmunoPlus Direct
          </span>
        </div>

        <div className={`p-1.5 rounded-[22px] ring-4 ${appMeta.accentRing} transition-all duration-300`}>
          <img
            src={resolvedIcon}
            alt={`${os} ${normalizedApp}`}
            className="w-16 h-16 rounded-[18px] object-contain shadow-sm"
          />
        </div>

        <div className="mt-5 mb-6">
          <h1 className="text-lg font-bold text-slate-900">
            Opening {appMeta.title}...
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Redirecting to your native application
          </p>
        </div>

        {/* Dynamic moving progress bar synced to 3000ms redirect */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-2">
          <div
            className={`h-full rounded-full ${appMeta.progressBg} transition-all ease-linear`}
            style={{
              width: isRedirecting ? "100%" : "0%",
              transitionDuration: isRedirecting ? `${REDIRECT_DELAY_MS}ms` : "0ms",
            }}
          />
        </div>

        <div className="text-[12px] text-slate-400">
          Didn't open?{" "}
          {targetUrl ? (
            <a
              href={targetUrl}
              onClick={() => logContactRedirect()}
              className={`font-semibold underline ${appMeta.linkText} hover:opacity-80 transition-opacity`}
            >
              Open now
            </a>
          ) : error ? (
            <span className="text-rose-500 font-medium">Link expired or invalid</span>
          ) : (
            <span>Locating destination...</span>
          )}
        </div>
      </div>
    </div>
  );
}