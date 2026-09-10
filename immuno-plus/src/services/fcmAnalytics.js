import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import analytics from "./fcm";

export default function FcmAnalytics() {
    const location = useLocation();
    const page = location.pathname + location.search;

    // page view
    useEffect(() => {
        if(!analytics) return;
        try {
            logEvent(analytics, "page_view", {
                // debug_mode: true,
                page_title: document.title,
                page_location: page,
                screen_name: location.hash?.replace("#", "") || location.pathname === "/" ? "home" : location.pathname.replace("/", "")
            })
        } catch (error) {
            console.warn("Analytics error: ", error);
        }
    }, [location])

    return null;
}

export function logByEvent(event, payload) {
    try {
        if(!analytics) return;
        logEvent(analytics, event, {
            // debug_mode: true,
            ...payload
        });
    } catch (error) {
        console.warn("Analytics error: ", error);
    }
}