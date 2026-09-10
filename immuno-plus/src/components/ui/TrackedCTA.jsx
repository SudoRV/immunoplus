import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logByEvent } from "../../services/fcmAnalytics";

export default function TrackedCTA({
  children,
  as: Component = "button", // Can be "button", "a", "Link", or the component reference `Link`

  event="select_content",
  ctaName,            // e.g. "order_now", "get_directions", "whatsapp_chat"
  ctaType = "button", // "lead", "navigation", "outbound", "map"
  location,           // e.g. "navbar", "hero", "footer", "map_card"

  to,                 // Router path e.g. "/products"
  href,               // External or hash link e.g. "https://..." or "#contact"
  onClick,
  target,
  rel,
  className = "",
  autoScroll,
  ...props
}) {
  const destination = to || href;

  const handleClick = (e) => {
    try {
      logByEvent("select_content", {
        content_type: ctaType,
        item_id: ctaName,
        placement: location || window.location.pathname,
        destination_url: destination || "none",
      });
    } catch (err) {
      console.warn("Analytics error:", err);
    }

    if (autoScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if (onClick) onClick(e);
  };

  // 1. React Router Link (when passed as="Link" or as={Link})
  if (Component === "Link" || Component === Link || Component === "link") {
    return (
      <Link
        to={destination}
        target={target}
        rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // 2. Outbound / External Anchor (when passed as="a")
  if (Component === "a") {
    return (
      <a
        href={destination}
        target={target}
        rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  // 3. Default Native Button
  return (
    <button
      type={props.type || "button"}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}