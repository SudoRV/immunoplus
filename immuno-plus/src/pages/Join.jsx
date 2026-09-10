import {
    Handshake,
    Building2,
    MapPin,
    BadgeCheck,

    TrendingUp,
    GraduationCap,
    Megaphone,
    FileText,
    MessageSquareText,
    FileCheck,
    Briefcase,
    Store,
    Stethoscope,
    Coins,

    Gem, HeartPulse

} from "lucide-react";

import { Navbar } from "../components/Navbar";
import heroBg from "../assets/hero_bg4.png";
import waterHandshake from "../assets/water_handshake.png";
import waterDropSplash2 from "../assets/water_drop_splash2.png";
import PartnerContactSection from "../components/Contact";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const pageMetadata = [
    <title key="title">Join Us | Immuno+</title>,
];

const opportunityFeatures = [
    {
        icon: TrendingUp,
        title: 'Growing Market Demand',
        description: 'Rising awareness for health & wellness solutions',
    },
    {
        icon: Gem,
        title: 'Premium High-Value Product',
        description: 'Superior technology with strong margins',
    },
    {
        icon: Handshake,
        title: 'Pan India Expansion',
        description: 'Be a part of our national growth journey',
    },
    {
        icon: HeartPulse,
        title: 'Healthier Communities',
        description: 'Create real impact through better water',
    },
];

const joinFeatures = [
    {
        title: "20+",
        subtitle: "Machines Supplies",
        icon: Building2,
    },
    {
        title: "10+",
        subtitle: "Business Partners",
        icon: Handshake,
    },
    {
        title: "10+",
        subtitle: "Cities Covered",
        icon: MapPin,
    },
    {
        title: "Years",
        subtitle: "Of Trust",
        icon: BadgeCheck,
    },
];

const partnerBenefits = [
    {
        icon: GraduationCap,
        title: 'Product Training &\nTechnical Support',
        description: 'Complete training to help you sell with confidence.',
    },
    {
        icon: MapPin,
        title: 'ExclusiveTerritory\nOpportunities',
        description: 'Operate and grow in your preffered region.',
    },
    {
        icon: Megaphone,
        title: 'Marketing\nAssistance',
        description: 'Marketing materials, campaign support and brand collaboration.',
    },
    {
        icon: Handshake,
        title: 'Long Term Growth\nTogether',
        description: 'Build a future-ready business with trusted brand.',
    },
];

const processSteps = [
    {
        step: '01',
        icon: FileText,
        title: 'Apply',
        description: 'Fill out the inquiry form or contact our team to express your interest.',
    },
    {
        step: '02',
        icon: MessageSquareText,
        title: 'Discuss',
        description: "We'll understand your market, goals and answer all your questions.",
    },
    {
        step: '03',
        icon: FileCheck,
        title: 'Partner Onboard',
        description: 'Complete the onboarding process and get access to products & resources.',
    },
    {
        step: '04',
        icon: TrendingUp,
        title: 'Grow Together',
        description: 'Start selling, grow your business and earn higher rewards with Immuno+.',
    },
];

const targetPartners = [
    { icon: Briefcase, title: 'Entrepreneurs' },
    { icon: Handshake, title: 'Dealers & Distributors' },
    { icon: Store, title: 'Business Owners' },
    { icon: Stethoscope, title: 'Healthcare Professionals' },
    { icon: Coins, title: 'Investors' },
];

export function Join() {
    const location = useLocation();
    const hash = location.hash.replace("#", "");

    const benifitsRef = useRef(null);
    const supportRef = useRef(null);
    const joinRef = useRef(null);

    useEffect(() => {
        if (!hash) return;

        let focusRef = null;

        if (hash === "benifits") {
            focusRef = benifitsRef.current;
        } else if (hash === "support") {
            focusRef = supportRef.current;
        } else if (hash === "contact") {
            focusRef = joinRef.current;
        }

        // scroll to the focus ref element
        focusRef.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [hash]);

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col overflow-x-hidden">
            {pageMetadata}
            {/* Hero Section */}
            <section
                className="w-full relative flex flex-col justify-between bg-cover bg-bottom bg-no-repeat"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                {/* The filter layer: filters the background image behind it */}
                <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: "brightness(0.75)" }} />

                {/* Navigation Bar */}
                <Navbar />

                {/* Hero Content */}
                <div className="relative z-10 flex-1 px-6 py-6 md:px-20 lg:px-20 w-full max-w-400 mx-auto">
                    <div className="w-full max-[640px]:max-w-sm sm:max-w-md lg:max-w-xl my-auto flex flex-col justify-center">
                        {/* Subheading Badge / Kicker */}
                        <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
                            Join us
                        </p>

                        {/* Main Headline */}
                        <div className="space-y-1 md:space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                                Build a Successful Business With
                            </h1>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                                Immuno+
                            </h1>
                        </div>

                        {/* Subtitle Description */}
                        <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-300">
                            Partner with India's trusted name in advanced water ionization technology and grow a profitable business while making a positive impact on health and wellness.
                        </p>


                    </div>
                </div>

                {/* Hero Footer: Glassmorphism Organization Bar */}
                <div className="relative w-fit mx-auto flex justify-center px-4 z-10">
                    <div className="w-full max-w-6xl lg:max-w-360 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-5 lg:py-8 bg-gradient-to-b from-[#062047]/60 via-[#02142d]/60 to-[#010b1a]/60 backdrop-blur-sm rounded-t-2xl border-t border-x border-blue-400/30 shadow-2xl">

                        {/* Feature Columns */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 flex-1 z-10 items-start space-y-3 sm:divide-x divide-blue-400/30">
                            {joinFeatures.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 pl-4 px-4"
                                    >
                                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-sky-400 shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <p className="text-sm md:text-xl font-bold text-sky-500 leading-tight">
                                                {item.title}
                                            </p>
                                            <p className="text-xs md:text-sm text-slate-100/80 leading-tight mt-0.5">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <img src={waterHandshake} className="absolute max-[900px]:hidden w-[50%] lg:w-[60%] 2xl:w-[80%] right-0 -top-70 lg:-right-30 lg:-top-75 2xl:-right-80 2xl:-top-95 opacity-75" />

                    </div>
                </div>
            </section>

            {/* partner benifits */}
            <section ref={benifitsRef} className="relative w-full bg-slate-50 py-10 px-6 md:px-12 lg:px-16 overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Heading & Copy */}
                    <div className="w-full lg:w-3/12 space-y-4 text-left">
                        <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-600 uppercase">
                            The Opportunity
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                            A Profitable Business.<br />
                            <span className="text-blue-600">A Greater Purpose.</span>
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed pt-2">
                            As an Immuno+ partner, you don’t just sell a product — you create
                            awareness about better water, healthier living and build a
                            long-term, sustainable business.
                        </p>
                    </div>

                    {/* Right Feature Cards Grid */}
                    <div className="w-full lg:w-9/12 grid max-[420px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {opportunityFeatures.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center text-center justify-start p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Icon Container */}
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Icon className="w-7 h-7 stroke-[1.8]" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 1. WHY PARTNER WITH IMMUNO+? */}
            <section ref={supportRef} className="bg-white">
                <div className="max-w-7xl mx-auto py-10 md:py-12 px-6 md:px-12 lg:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        <div className="lg:col-span-4 flex flex-col justify-center space-y-4 pr-0 lg:pr-6">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-600 uppercase">
                                Why Partner With Immuno+?
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                A Partnership That<br />
                                <span className="text-blue-600">Drives Growth.</span>
                            </h2>
                            <div className="w-8 h-1 bg-blue-500 rounded-full" />
                            <p className="text-slate-500 text-base leading-relaxed pt-2">
                                We provide more than just products. We provide a complete business ecosystem to help you succeed in your market.
                            </p>
                        </div>

                        <div className="lg:col-span-8 grid max-[420px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 items-stretch">
                            {partnerBenefits.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow space-y-3"
                                    >
                                        <div className="p-2 text-blue-600">
                                            <Icon className="w-7 h-7 stroke-[1.5]" />
                                        </div>
                                        <h4 className="text-base md:text-lg font-bold text-slate-900 leading-tight whitespace-pre-line">
                                            {item.title}
                                        </h4>
                                        <p className="text-[12px] md:text-sm text-slate-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            <section ref={joinRef} className="bg-white">
                <PartnerContactSection formType={"join_query"} />
            </section>

            {/* 2. HOW IT WORKS (STEP-BY-STEP) */}
            <section className="bg-blue-50">
                <div
  className="relative max-w-7xl mx-auto overflow-hidden border-y border-blue-100/60 py-10 md:py-12 px-6 md:px-12 lg:px-6 [background-image:var(--bg-image)] max-[640px]:[background-image:none]"
  style={{
    "--bg-image": `url(${waterDropSplash2})`,
    backgroundSize: "35%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center"
  }}
>

                    <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-blue-50 from-60% to-transparent" />

                    <div className="relative z-10 max-w-7xl mx-auto space-y-12">
                        <div className="space-y-2">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-600 uppercase">
                                How It Works
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                                Simple Steps to <span className="text-blue-600">Start Your Journey</span>
                            </h3>
                        </div>

                        <div className="relative max-w-3xl">
                            <div className="absolute top-10 left-10 right-10 h-0.5 bg-blue-200/80 z-0 hidden md:block" />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                                {processSteps.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={index} className="flex flex-col items-center text-center space-y-3">
                                            <div className="relative w-16 h-16 rounded-full bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-600">
                                                <span className="absolute -top-3 w-6 h-6 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center shadow">
                                                    {item.step}
                                                </span>
                                                <Icon className="w-6 h-6 stroke-[1.75]" />
                                            </div>
                                            <h4 className="text-sm md:text-lg font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-37.5">
                                                {item.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHO CAN JOIN? */}
            <section className="bg-white">
                <div className="py-10 md:py-12 px-6 md:px-12 lg:px-6 max-w-7xl mx-auto space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-600 uppercase">
                                Who Can Join?
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                                We Partner With <span className="text-blue-600">Visionaries Like You.</span>
                            </h3>
                        </div>
                        <p className="text-xs sm:text-base text-slate-500 max-w-md leading-relaxed">
                            Immuno+ welcomes passionate individuals and organizations who want to grow with a future-ready health and wellness brand.
                        </p>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 lg:divide-x divide-slate-200/80 pt-2">
                        {targetPartners.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center px-4 space-y-3">
                                    <div className="p-2 text-blue-600">
                                        <Icon className="w-8 h-8 stroke-[1.5]" />
                                    </div>
                                    <h4 className="text-sm md:text-base font-bold text-slate-800">
                                        {item.title}
                                    </h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
}
