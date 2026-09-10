import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import {
    ArrowRight, Headphones, Award,
    Droplet, Droplets, ShieldCheck, Users, Eye, Target,
    Cpu,
    Handshake,
    MapPin,
    Heart,
    UserCheck,
    Lightbulb,
} from "lucide-react";

import heroBg from "../assets/hero_bg4.png";
import waterDrop from "../assets/water_drop.png";
import waterDropSplash from "../assets/water_drop_splash.png";
import waterSplashRL from "../assets/water_splash_rl2.png";
import elementsIonizedWater from "../assets/elements_ionized_water.png";
import TrackedCTA from "../components/ui/TrackedCTA";

const pageMetadata = [
    <title key="title">About Us | Immuno+</title>,
];

const valueBadges = [
    {
        icon: Droplet,
        title: "Japanese/Korean",
        subtitle: "Technology",
    },
    {
        icon: ShieldCheck,
        title: "Rigorous",
        subtitle: "Quality Standards",
    },
    {
        icon: Headphones,
        title: "Reliable",
        subtitle: "Support",
    },
    {
        icon: Award,
        title: "Trusted by",
        subtitle: "Professionals",
    },
];


export function WhoWeAre() {
    return (
        <section className="relative w-full bg-neutral-50 py-12 lg:py-20 overflow-hidden">
            {/* Background Water Splash Accent (Right side) */}
            <div
                className="pointer-events-none absolute right-0 top-1/2  -translate-y-1/2 w-1/3 h-full max-h-200 bg-contain bg-right bg-no-repeat opacity-40 lg:opacity-60 "
                style={{ backgroundImage: `url(${waterSplashRL})` }}
            />

            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center">

                {/* Left Column: Overlapping Visual Cards */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
                    <div className="relative">
                        {/* Main Rounded Image */}
                        <div className="w-full max-w-95 max-h-95 rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={waterDrop}
                                alt="Water droplet technology"
                                className="w-full h-full object-cover"
                            />
                            {/* Soft inner vignette */}
                            <div className="absolute inset-0 rounded-3xl bg-blue-900/10 mix-blend-multiply" />
                        </div>

                        {/* Overlapping Floating "Our Mission" Card */}
                        <div className="absolute -left-6 -bottom-6 bg-white p-4 px-5 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.15)] border border-slate-100 sm:aspect-square max-w-50">
                            <div className="flex items-center gap-2 mb-3">
                                <Droplet className="w-6 h-6 text-sky-500 fill-sky-500" />
                                <span className="text-sm font-bold tracking-tight text-slate-800">
                                    Our Mission
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                To make premium water technology accessible through trusted
                                partnerships and exceptional support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Copy & Value Propositions */}
                <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:pl-6">

                    {/* Eyebrow / Kicker */}
                    <span className="text-xs lg:text-lg font-bold uppercase tracking-widest text-sky-500">
                        Who We Are
                    </span>

                    {/* Section Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                        Advancing the Future <br />
                        of <span className="text-blue-500">Water Technology</span>
                    </h2>

                    {/* Body Paragraphs */}
                    <div className="space-y-4 text-neutral-800 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                        <p>
                            Immuno+ is dedicated to delivering advanced water ionization
                            solutions for businesses, healthcare professionals, wellness
                            establishments, and commercial environments.
                        </p>
                        <p>
                            We partner with organizations and entrepreneurs to provide premium
                            products, reliable supply, and long-term support.
                        </p>
                    </div>

                    {/* 4 Feature Badges */}
                    <div className="w-full pt-4 flex flex-wrap justify-around min-[400px]:justify-start gap-6">
                        {valueBadges.map((badge, idx) => {
                            const Icon = badge.icon;
                            return (
                                <div key={idx} className="flex flex-col items-center min-[400px]:items-start gap-3 group min-w-25">
                                    {/* Glowing Icon Circle */}
                                    <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-sky-400/80 bg-sky-50/50 flex items-center justify-center text-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]">
                                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.75]" />
                                    </div>

                                    {/* Two-line label */}
                                    <div className="flex flex-col items-center min-[400px]:items-start">
                                        <p className="text-xs lg:text-sm font-bold text-slate-800 leading-snug">
                                            {badge.title}
                                        </p>
                                        <p className="text-xs lg:text-sm text-slate-500 leading-snug">
                                            {badge.subtitle}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Outlined Action Button */}
                    {
                        window.location.pathname !== "/about" && (
                            <div className="pt-4 ml-auto sm:ml-0">
                                <TrackedCTA className="group flex items-center gap-4 border border-sky-500 hover:border-blue-600 hover:bg-sky-50/50 text-blue-500 font-semibold text-sm lg:text-base px-6 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
                                    as="Link"
                                    to="/about"
                                    ctaName="about_company_overview"
                                    ctaType="navigation"
                                    location="homepage_about">
                                    <span>Learn more</span>
                                    <div className="w-7 h-7 rounded-full border border-sky-400 flex items-center justify-center text-sky-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </TrackedCTA>
                            </div>
                        )
                    }

                </div>

            </div>
        </section>
    );
}




const features = [
    {
        icon: Droplets,
        title: 'Advanced\nTechnology',
        description: 'Japanese/Korean Ionization Systems',
    },
    {
        icon: ShieldCheck,
        title: 'Trusted by\nProfessionals',
        description: 'Healthcare, Wellness, Hospitality & More',
    },
    {
        icon: Users,
        title: 'Growing\nNetwork',
        description: 'Distributors & Partners Across India',
    },
];

export function About() {
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
                            ABOUT IMMUNO+
                        </p>

                        {/* Main Headline */}
                        <div className="space-y-1 md:space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                                Advancing Water
                            </h1>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                                Empowering Life
                            </h1>
                        </div>

                        {/* Subtitle Description */}
                        <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-300">
                            Immuno+ is dedicated to delivering advanced water ionization solutions that promote better hydration, better living and better environments for businesses and communities.
                        </p>

                        <div className="max-w-6xl flex mt-8 justify-start max-[400px]:divide-none divide-x divide-blue-500/20 -ml-4">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-center px-3 sm:px-4 md:px-6"
                                    >
                                        {/* Glowing Circular Icon Container */}
                                        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-sky-400 bg-blue-950/30 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-sm">
                                            <Icon className="w-6 h-6 text-sky-400 stroke-[1.5]" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xs lg:text-sm tracking-tight text-slate-100/80 pt-2 whitespace-pre-line">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        {/* <p className="text-xs lg:text-sm text-slate-100/80  leading-relaxed max-w-xs">
                                            {item.description}
                                        </p> */}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            <WhoWeAre />

            <section className="w-full bg-white py-6 px-6 md:px-12 lg:px-16 text-slate-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch lg:col-span-3">

                    {/* Left Column: Purpose Intro */}
                    <div className="flex flex-col justify-center pr-0 lg:pr-8 space-y-4 lg:col-span-1">
                        <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                            Our Purpose
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Better Water.<br />Better Future.
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                            We believe water is more than a necessity—it's the foundation of a healthier life and a better world. Immuno+ is on a mission to make advanced water technology accessible to organizations and entrepreneurs who want to create real impact.
                        </p>
                    </div>

                    <div className="w-full flex gap-8 lg:col-span-2 flex-wrap sm:flex-nowrap">
                        {/* Middle Column: Our Vision */}
                        <div className="w-full flex flex-col justify-between rounded-3xl bg-gradient-to-b from-blue-50/60 to-blue-50/20 border border-blue-100/50 space-y-8">

                            <div className="w-full h-full space-y-8 p-8">
                                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                    <Eye className="w-7 h-7 stroke-[2]" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                        To be India's most trusted partner in advanced water technology, creating a healthier nation through innovation, education and entrepreneurship.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Our Mission */}
                        <div className="w-full relative flex flex-col justify-between rounded-3xl border border-blue-100/50 overflow-hidden">

                            <img src={waterDropSplash} className="absolute w-full h-full right-0 bottom-0 z-10" />

                            <div className="p-8 h-full space-y-8 z-20 bg-linear-to-r from-white via-to-white/80 to-white/40 ">
                                <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                    <Target className="w-7 h-7 stroke-[2]" />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                        To provide premium water ionization solutions with uncompromised quality, reliable support and empowering business opportunities for our partners.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full bg-neutral-50 py-12 lg:py-16 px-6 md:px-12 lg:px-20 text-slate-800">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* Top Section: Our Story */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* Left Column: Text & Stats */}
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                                    Our Story
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Built on Passion.<br />Driven by Purpose.
                                </h2>
                                <div className="w-8 h-1 bg-blue-500 rounded-full" />
                            </div>

                            <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                                <p>
                                    Immuno+ was founded with a simple belief—everyone deserves access to clean, ionized, healthy water. What started as a passion for technology and wellness has grown into a mission to empower businesses, healthcare professionals, and communities with solutions that truly make a difference.
                                </p>
                                <p>
                                    Today, Immuno+ is a growing network of innovators, professionals, and partners working together to build a healthier, stronger future through the power of water.
                                </p>
                            </div>

                            {/* Hardcoded 4 Stat Badges */}
                            <div className="grid grid-cols-2 min-[500px]:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                {/* Stat 1 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-blue-400/50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <Award className="w-5 h-5 stroke-[1.75]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-blue-500 leading-tight">5+</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-tight">Years of Expertise</p>
                                    </div>
                                </div>

                                {/* Stat 2 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-blue-400/50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <Cpu className="w-5 h-5 stroke-[1.75]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-blue-500 leading-tight">500+</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-tight">Machines Supplied</p>
                                    </div>
                                </div>

                                {/* Stat 3 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-blue-400/50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <Handshake className="w-5 h-5 stroke-[1.75]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-blue-500 leading-tight">100+</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-tight">Business Partners</p>
                                    </div>
                                </div>

                                {/* Stat 4 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-blue-400/50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <MapPin className="w-5 h-5 stroke-[1.75]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-blue-500 leading-tight">20+</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-tight">Cities Covered</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="w-full h-72 sm:h-96 lg:h-105 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 mt-8">
                            <img
                                src={elementsIonizedWater}
                                alt="Water crown splash"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                    {/* Bottom Section: Our Values */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-slate-100">

                        {/* Header */}
                        <div className="lg:col-span-4 space-y-3">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                                Our Values
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                The Principles That<br />
                                <span className="text-blue-500">Guide Us</span> Every Day.
                            </h3>
                        </div>

                        {/* Hardcoded 4 Values */}
                        <div className="lg:col-span-8 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]  gap-6">

                            {/* Value 1 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-blue-500 flex-shrink-0 stroke-[2]" />
                                    <h4 className="text-base md:text-lg font-bold text-slate-900">Integrity</h4>
                                </div>
                                <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                                    We believe in honest communication and transparent business practices.
                                </p>
                            </div>

                            {/* Value 2 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-blue-500 flex-shrink-0 stroke-[2]" />
                                    <h4 className="text-base md:text-lg font-bold text-slate-900">Excellence</h4>
                                </div>
                                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                                    We are committed to delivering the highest standards in technology and service.
                                </p>
                            </div>

                            {/* Value 3 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 stroke-[2]" />
                                    <h4 className="text-base md:text-lg font-bold text-slate-900">Innovation</h4>
                                </div>
                                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                                    We continuously innovate to bring better solutions for our partners.
                                </p>
                            </div>

                            {/* Value 4 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-500 flex-shrink-0 stroke-[2]" />
                                    <h4 className="text-base md:text-lg font-bold text-slate-900">Impact</h4>
                                </div>
                                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                                    We create solutions that positively impact health, businesses and communities.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
