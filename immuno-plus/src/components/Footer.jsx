import React from 'react';
import { href, Link } from 'react-router-dom';
import {
    Phone,
    Mail,
    MapPin,
} from 'lucide-react';
import {
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa"

import { logByEvent } from "../services/fcmAnalytics";

export default function Footer({
    developerName = "Rahul Verma",
    developerLinkedIn = "https://linkedin.com/in/sudorv",
    showDeveloperCredit = true // set to false for pure client builds
}) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-br from-[#030d1c] via-[#04152d] to-[#061d3f] text-neutral-300 relative overflow-hidden border-t border-blue-950/40">
            {/* Subtle abstract background glow */}
            <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 165, 233, 0.35), rgba(59, 130, 246, 0.15), transparent 70%)'
                }}
            />

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-12 pb-8 relative z-10">
                <div className="flex flex-wrap md:flex-nowrap gap-10 lg:gap-8">

                    {/* Brand & Mission */}
                    <div className="min-w-[200px] flex flex-col gap-5">
                        <div className="flex items-center gap-0.5 text-2xl font-black tracking-wider text-white">
                            <span>IMMUNO</span>
                            <span className="text-blue-500 font-bold text-3xl  leading-none -mt-5">+</span>
                        </div>
                        <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase -mt-4">
                            Advanced Water Technology
                        </p>

                        <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-sm">
                            Advanced water ionization solutions for healthcare, wellness, and commercial environments.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: FaLinkedin, href: "https://www.linkedin.com/in/immunoplus/", label: "LinkedIn" },
                                { icon: FaFacebook, href: "https://www.facebook.com/ImmunoPlusIndia/", label: "Facebook" },
                                { icon: FaInstagram, href: "https://www.instagram.com/plusimmuno/", label: "Instagram" },
                                { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/10 transition-all duration-200"
                                    onClick={() => {
                                        logByEvent("click", {
                                            link_url: href,
                                            link_domain: new URL(href).hostname,
                                            outbound: true,
                                            social_platform: label,
                                            item_id: `social_${label}`,
                                            placement: "footer",
                                        });
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="min-w-[100px]">
                        <h3 className="text-xs lg:text-sm font-bold text-white tracking-wider uppercase mb-5">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm lg:text-base">
                            {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Products', href: '/products' }, { label: 'Our Team', href: '/team' }, { label: 'Join Us', href: '/join' }, { label: 'Contact Us', href: '/contact' }].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0, left: 0,
                                                behavior: "smooth"
                                            })
                                        }}
                                        className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Solutions */}
                    <div className="min-w-[120px]">
                        <h3 className="text-xs lg:text-sm font-bold text-white tracking-wider uppercase mb-5">
                            Our Solutions
                        </h3>
                        <ul className="space-y-2 text-sm lg:text-base">
                            {[
                                {
                                    id: "immuno-essential",
                                    label: "Essential Series",
                                },
                                {
                                    id: "immuno-professional",
                                    label: "Professional Series",
                                },
                                {
                                    id: "immuno-commercial",
                                    label: "Commercial Series",
                                },
                            ].map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={`/products?id=${item.id}`}
                                        className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partner With Us */}
                    <div className="min-w-[120px]">
                        <h3 className="text-xs lg:text-sm font-bold text-white tracking-wider uppercase mb-5">
                            Partner With Us
                        </h3>
                        <ul className="space-y-2 text-sm lg:text-base">
                            {[
                                { label: 'Become a Partner', href: '/join' }, { label: 'Partner Benefits', href: '/join#benifits' },
                                { label: 'Partner Support', href: '/join#support' },
                                { label: 'Inquiry Form', href: '/join#contact' }].map((item) => (
                                    <li key={item.label.replaceAll(" ", "_")}>
                                        {
                                            item.href === "/join" ? (
                                                <a
                                                    href={item.href}
                                                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={item.href}
                                                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="min-w-[140px] max-w-[240px]">
                        <h3 className="text-xs lg:text-sm font-bold text-white tracking-wider uppercase mb-5">
                            Contact Us
                        </h3>
                        <ul className="space-y-2 text-sm lg:text-base">
                            <li>
                                <a
                                    href="tel:+919762170838"
                                    className="group flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors"
                                    onClick={() => {
                                        logByEvent("generate_lead", {
                                            method: "phone",
                                            lead_type: "contact",
                                            placement: "footer"
                                        })
                                    }}
                                >
                                    <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span>+91 97621 70838</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="wa.me/:919762170838"
                                    className="group flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors"
                                    onClick={() => {
                                        logByEvent("generate_lead", {
                                            method: "whatsapp",
                                            lead_type: "contact",
                                            placement: "footer"
                                        })
                                    }}
                                >
                                    <FaWhatsapp className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span>+91 97621 70838</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@immunoplus.in"
                                    target='_blank'
                                    rel='noopener norefferer'
                                    className="group flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors"
                                    onClick={() => {
                                        logByEvent("generate_lead", {
                                            method: "email",
                                            lead_type: "contact",
                                            placement: "footer"
                                        })
                                    }}
                                >
                                    <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="break-all">plusimmuno@gmail.com</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">
                                    M/S Monal Enterprises, Degree College Road,
                                    Khatima Uttarakhand 262308
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-900 bg-[#091527] text-xs lg:text-sm text-slate-500 py-6">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Copyright & Optional Subtle Developer Credit */}
                    <div className="flex flex-wrap items-center gap-x-2 text-center sm:text-left">
                        <span>© {currentYear} Immuno+ All Rights Reserved</span>

                        {showDeveloperCredit && (
                            <>
                                <span className="text-slate-700 hidden sm:inline">•</span>
                                <span className="text-slate-400">
                                    Crafted by{' '}
                                    <a
                                        href={developerLinkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-300 hover:text-blue-400 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-blue-400"
                                    >
                                        {developerName}
                                    </a>
                                </span>
                            </>
                        )}
                    </div>

                    {/* Legal Links */}
                    <div className="flex items-center gap-4">
                        <a href="#privacy" className="hover:text-slate-300 transition-colors">
                            Privacy Policy
                        </a>
                        <span className="text-slate-800">|</span>
                        <a href="#terms" className="hover:text-slate-300 transition-colors">
                            Terms & Conditions
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}