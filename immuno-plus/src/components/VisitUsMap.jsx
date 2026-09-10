import React, { useState } from 'react';
import { MapPin, ExternalLink, ArrowUpRight, Compass, Locate } from 'lucide-react';
import { logByEvent } from '../services/fcmAnalytics';

export default function VisitUsMap({
  lat,
  lng,
  companyName = "Immuno+",
  addressLines = [
    "M/S Monal Enterprises, Degree College Road",
    "Khatima, Uttarakhand 262308",
  ],
  title = "Visit Us",
  subtitle = "Drop by our facilities or reach out for hands-on equipment walkthroughs.",
  badgeText = "Our Location",
  className = "",
}) {

  const placeName = "Saxena Play House";
  const addressQuery = "Saxena Playhouse, WX98+8Q Khatima, Uttarakhand";

  // Embed URL for iframe
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&hl=en&z=15&output=embed`;

  // Direct outbound link for the "Get Directions" button
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery)}`;

  const [mapKey, setMapKey] = useState(0);

  function getDirection() {
    logByEvent("select_content", {
      content_type: "store_location",
      action_type: "get_directions"
    });
    
    window.open(directionsUrl, "_blank");
  }

  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Header Info */}
      <div>
        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs lg:text-base font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-5 h-5" />
          {badgeText}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Map Container */}
      <div className="relative group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl">
        {/* Map Frame */}
        <div className="w-full h-80 sm:h-96 relative bg-slate-100">
          <iframe
            key={mapKey}
            title={`${companyName} Location`}
            src={embedUrl}
            className="w-full h-full border-0 opacity-90 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl" />
        </div>

        <button
          onClick={getDirection}
          className="inline-flex absolute top-3 right-0 w-[70%] h-12 items-center gap-1 text-xs lg:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        ></button>

        <button className='absolute right-2.5 bottom-18 p-2 rounded-full bg-neutral-50 shadow-lg cursor-pointer' onClick={() => setMapKey(prev => prev + 1)}>
          <Locate className='w-6 h-6 text-black stroke-2' />
        </button>

        {/* Floating Detail Card */}
        {/* <div className="sm:absolute sm:bottom-5 sm:left-5 sm:right-5 m-3 sm:m-0 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
          <button className='absolute right-0 -top-12 p-1.5 rounded-full bg-neutral-50 shadow-md cursor-pointer' onClick={() => setMapKey(prev => prev + 1)}>
            <Locate className='w-6 h-6 text-black stroke-2' />
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/20 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  {companyName}
                </h3>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {addressLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex absolute top-2 right-2 items-center gap-1 text-xs lg:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Directions
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between sm:hidden">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600"
            >
              Open in Google Maps
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}