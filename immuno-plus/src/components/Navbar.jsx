import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useRef, useState } from 'react';

import logo from "../assets/logo.png";
import { logByEvent } from '../services/fcmAnalytics';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Our Team', path: '/team' },
    { name: 'Join Us', path: '/join' },
    { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
    const location = useLocation();

    const desktopNavRef = useRef(null);
    console.log(desktopNavRef.current?.offsetHeight)
    const [navbarExpanded, setNavBarExpended] = useState(false);

    return (
        <div ref={desktopNavRef} className="relative z-100 w-full h-fit flex justify-between items-center p-3 sm:p-2 sm:px-4 bg-transparent">
            {/* Brand Logo */}
            <div className="relative flex items-center select-none cursor-pointer" onClick={() => {
                window.location.href = "/"
            }}>
                <img className='h-10 sm:h-14' src={logo} />

                <div className='flex flex-col justify-center'>
                    <p className="text-white font-bold tracking-wider text-lg sm:text-xl lg:text-2xl leading-tight">IMMUNO</p>
                    <span className="font-bold text-lg sm:text-xl md:text-2xl text-blue-400 absolute -right-4 -top-2 sm:-top-1.5">+</span>

                    <p className='text-xs sm:text-[12px] leading-tight'>Alkaline Ionizer</p>
                </div>
            </div>

            {/* Pill Navigation Bar */}
            <nav className="hidden sm:block border border-neutral-100/30 bg-linear-to-r from-white/10 via-white/10 to-black/50 backdrop-blur-xs rounded-full px-7 py-2 shadow-lg">
                <ul className="flex items-center md:gap-2 lg:gap-6">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.path} className="relative py-2 px-1 flex flex-col items-center">
                                <Link
                                    to={item.path}
                                    className={`text-sm md:text-md transition-colors duration-200 hover:text-white! hover:scale-105 ${isActive
                                        ? 'text-blue-500 font-semibold'
                                        : 'text-neutral-100 hover:text-white font-normal'
                                        }`}
                                >
                                    {item.name}
                                </Link>

                                {/* Active Indicator: Underline + Water Droplet */}
                                {isActive && (
                                    <div className="absolute -bottom-4.75 left-0 right-0 flex flex-col items-center pointer-events-none">
                                        {/* Glowing Underline */}
                                        <div className="w-full h-px bg-linear-to-r from-blue-400 via-blue-300 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

                                        {/* Water Droplet Pin */}
                                        <svg
                                            className="w-3 h-3 text-blue-400 -mt-0.5 filter drop-shadow-[0_2px_4px_rgba(56,189,248,0.7)] animate-bounce"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* mobile navbar */}
            <nav style={{paddingTop: `${desktopNavRef.current?.offsetHeight-20 || 40}px`}} className={`absolute top-0 left-0 w-full bg-blue-400/20 backdrop-blur-md zoom-100 p-2 px-6 pb-4 rounded-b-2xl
            transition-transform duration-300 ease-in-out
            ${navbarExpanded ? "translate-y-0" : "-translate-y-full"}`}>
                <ul className="flex flex-col items-start md:gap-2 lg:gap-6">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.path} className="relative py-1 flex flex-col items-center">
                                <Link
                                    to={item.path}
                                    className={`text-base md:text-md transition-colors duration-200 hover:text-white! hover:scale-105 active:text-blue-500 active:scale-105 ${isActive
                                        ? 'text-blue-500 font-semibold'
                                        : 'text-neutral-100 hover:text-white font-normal'
                                        }`}
                                >
                                    {item.name}
                                </Link>

                                {/* Active Indicator: Underline + Water Droplet */}
                                {isActive && (
                                    <div className="hidden sm:flex absolute -bottom-4.75 left-0 right-0 flex-col items-center pointer-events-none">
                                        {/* Glowing Underline */}
                                        <div className="w-full h-px bg-linear-to-r from-blue-400 via-blue-300 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

                                        {/* Water Droplet Pin */}
                                        <svg
                                            className="w-3 h-3 text-blue-400 -mt-0.5 filter drop-shadow-[0_2px_4px_rgba(56,189,248,0.7)] animate-bounce"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Action Button */}
            <div className='flex items-center gap-4 z-100'>
                <button className="flex items-center gap-2 bg-white hover:bg-blue-500 text-blue-500 hover:text-white transition-all duration-300 font-semibold max-[460px]:px-1.5 p-1.5 px-4 sm:px-2 md:px-4 rounded-full shadow-md active:scale-95 text-sm md:text-md"
                    onClick={() => {
                        logByEvent("generate_lead", {
                            method: "whatsapp",
                            lead_type: "contact",
                            placement: "navigation_bar"
                        })
                        window.open("https://wa.me/+919762170838", "_blank", "noopener,noreferrer")
                    }}
                >
                    <FaWhatsapp className="w-7 h-7" />
                    <span className="max-[460px]:hidden sm:hidden md:block">Let's Talk</span>
                </button>

                <button className={`sm:hidden bg-white w-9 h-9 rounded-lg text-neutral-700 flex flex-col justify-center items-center ${navbarExpanded ? "space-y-0.5" : "space-y-1"}`} onClick={() => setNavBarExpended(prev => !prev)}>
                    <span className={`w-[60%] h-0.5 bg-neutral-700 rounded-full transition-all duration-200 ease-in-out ${navbarExpanded ? "rotate-z-36" : ""}`}></span>
                    <span className={`w-[60%] h-0.5 bg-neutral-700 rounded-full transition-all duration-200 ease-in-out ${navbarExpanded ? "hidden" : "block"}`}></span>
                    <span className={`w-[60%] h-0.5 bg-neutral-700 rounded-full transition-all duration-200 ease-in-out ${navbarExpanded ? "-rotate-z-36" : ""}`}></span>
                </button>
            </div>
        </div>
    );
}