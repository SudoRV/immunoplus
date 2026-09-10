import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import {
    Droplet, ShieldCheck, Users, Eye, Target,
    Handshake,
    Lightbulb,
    GraduationCap,
    HeartHandshake,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

import { FaLinkedinIn } from "react-icons/fa";

import heroBg from "../assets/hero_bg4.png";
import TrackedCTA from "../components/ui/TrackedCTA";

const pageMetadata = [
    <title key="title">Our Team | Immuno+</title>,
];

const features = [
    {
        icon: Users,
        title: '5+',
        description: 'Team Members',
    },
    {
        icon: ShieldCheck,
        title: 'Years',
        description: 'Of Experience',
    },
    {
        icon: Handshake,
        title: 'One',
        description: 'Common Goal - Better Water for All',
    },
];

const leaders = [
    {
        name: 'Rahul Sharma',
        role: 'Founder & Managing Director',
        bio: 'Visionary leader with 15+ years of experience in technology, business strategy and operations.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        linkedin: '#',
    },
    {
        name: 'Vikram Mehta',
        role: 'Chief Business Officer',
        bio: 'Expert in business development and partnerships with a strong focus on growth and innovation.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
        linkedin: '#',
    },
    {
        name: 'Dr. Amit Verma',
        role: 'Technical Director',
        bio: 'PhD in Water Technology. Leads our research, product innovation and quality assurance.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        linkedin: '#',
    },
    {
        name: 'Neha Kapoor',
        role: 'Operations Head',
        bio: 'Operations expert ensuring seamless supply chain, delivery and customer satisfaction.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        linkedin: '#',
    },
    {
        name: 'Arjun Singh',
        role: 'Marketing Head',
        bio: 'Strategic marketer focused on brand development, marketing and partner enablement.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
        linkedin: '#',
    },
];

const extendedTeam = [
    {
        icon: Users,
        title: '20+',
        subtitle: 'Dedicated Professionals',
        description: null,
    },
    {
        icon: GraduationCap,
        title: 'Diverse',
        subtitle: 'Expertise',
        description: 'Engineering, Healthcare, Business & More',
    },
    {
        icon: Lightbulb,
        title: 'Innovative',
        subtitle: 'Thinkers',
        description: 'Driven by curiosity and continuous improvement',
    },
    {
        icon: HeartHandshake,
        title: 'Customer',
        subtitle: 'Focused',
        description: 'Committed to delivering real value and trust',
    },
];

export function Team() {
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
                    <div className="w-full min-[460px]:px-10 sm:px-0 sm:max-w-md lg:max-w-xl my-auto flex flex-col justify-center">
                        {/* Subheading Badge / Kicker */}
                        <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
                            OUT TEAM
                        </p>

                        {/* Main Headline */}
                        <div className="space-y-1 md:space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                                The People Behind
                            </h1>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                                Immuno+
                            </h1>
                        </div>

                        {/* Subtitle Description */}
                        <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-300">
                            At Immuno+, we combine expertise, passion and innovation to deliver advanced water ionization solutions and build long–term partnerships across India.
                        </p>

                        <div className="flex justify-start flex-wrap md:flex-nowrap gap-4 mt-8">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex text-left gap-2"
                                    >
                                        <Icon className="w-9 h-9 text-sky-500 stroke-[1.5]" />

                                        <div className="flex flex-col items-start justify-start">

                                            {/* Title */}
                                            <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-tight text-sky-500 pt-1 leading-snug">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs lg:text-sm text-slate-100/80 max-w-40">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            <section className="relative w-full bg-slate-50 py-10 lg:py-12 px-6 md:px-12 lg:px-20 text-slate-800">
                {/* 1. Header Row */}
                <div className="relative max-w-7xl mx-auto flex gap-8  flex-wrap sm:flex-nowrap sm:divide-x divide-blue-100">

                    <div className="flex items-start gap-4 max-w-xl pr-4 lg:pr-14">
                        <div className="w-12 h-12 rounded-full border border-blue-400/50 bg-blue-50/50 flex items-center justify-center text-blue-500 shrink-0 mt-1">
                            <Droplet className="w-6 h-6 stroke-[1.75]" />
                        </div>
                        <div className="space-y-3">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                                United by Purpose
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Experts. Innovators.<br />
                                <span className="text-blue-500">Partners in Progress.</span>
                            </h2>
                            <div className="w-8 h-1 bg-blue-500 rounded-full" />
                        </div>
                    </div>

                    <div className="max-w-md text-xs md:text-base text-slate-600 leading-relaxed space-y-2 pl-4 lg:pl-8 pt-2">
                        <p>
                            Our team brings together experts from diverse backgrounds — engineering, healthcare, business and customer support — working with one mission:
                        </p>
                        <p className="font-semibold text-slate-900">
                            To make advanced water technology accessible and impactful.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-12 lg:py-14 px-6 md:px-12 lg:px-20 text-slate-800">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* 2. Leadership Team Grid */}
                    <div className="space-y-12">
                        <div className="text-center space-y-2">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                                Meet Our Leadership Team
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                                Leadership Driving Our Vision
                            </h3>
                        </div>

                        <div className="grid gird grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
                            {leaders.map((leader, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-blue-100/60 via-blue-50/40 to-blue-50/10 transition-all shadow-sm hover:shadow-lg hover:shadow-blue-900/10 hover:scale-105 space-y-4"
                                >
                                    {/* Profile Photo */}
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 border-blue-500/30">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>

                                    {/* Name & Role */}
                                    <div className="">
                                        <h4 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                                            {leader.name}
                                        </h4>
                                        <p className="text-xs md:text-base font-medium text-blue-500">
                                            {leader.role}
                                        </p>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed flex-1">
                                        {leader.bio}
                                    </p>

                                    {/* LinkedIn Badge */}
                                    <Link
                                        to={leader.linkedin}
                                        aria-label={`${leader.name}'s LinkedIn`}
                                        className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/50 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                                    >
                                        <FaLinkedinIn className="w-4 h-4 fill-current" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Extended Team Strip */}
                    <div className="relative max-w-6xl mx-auto rounded-3xl bg-slate-100 p-8 overflow-hidden">
                        <div className="text-center space-y-2 mb-10">
                            <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
                                Our Extended Team
                            </span>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                                The Strength Behind Our Success
                            </h3>
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                            {extendedTeam.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full border border-blue-200 bg-blue-50/40 flex items-center justify-center text-blue-500 shrink-0">
                                            <Icon className="w-6 h-6 stroke-[1.75]" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-bold text-blue-500 leading-tight">
                                                {item.title}
                                            </h4>
                                            <p className="text-base font-semibold text-slate-800 leading-tight">
                                                {item.subtitle}
                                            </p>
                                            {item.description && (
                                                <p className="text-sm text-slate-500 pt-1 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>


                    </div>

                    <div className="w-full max-w-7xl mx-auto px-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[#021024] bg-gradient-to-r from-[#020b18] via-[#031d42] to-[#025091] px-6 sm:px-10 py-8 lg:py-10 text-white shadow-xl">

                            {/* Subtle Water/Rays Glow Texture on the right */}
                            <div className="absolute -right-16 -bottom-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

                                {/* Left: Icon & Headline */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                                    {/* White Circle Icon */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                                        <Users className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 stroke-[1.75]" />
                                    </div>

                                    {/* Headings */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-blue-400 uppercase">
                                            Let's Build a Better Future Together
                                        </span>
                                        <h3 className="text-2xl sm:text-2xl font-bold tracking-tight leading-snug">
                                            Stronger Together.<br />
                                            <span className="text-blue-500">Better for Everyone.</span>
                                        </h3>
                                    </div>
                                </div>

                                {/* Right: Subtext & Button */}
                                <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 max-w-sm">
                                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                                        We believe great things happen when passionate people work together with a shared purpose.
                                    </p>

                                    <TrackedCTA
                                        as="Link"
                                        to={"/join"}
                                        ctaName="dealer_inquiry"
                                        ctaType="navigation"
                                        location="teampage_footer"

                                        autoScroll={true}

                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/40 hover:border-white text-white font-medium text-xs sm:text-sm transition-all hover:bg-white/10 backdrop-blur-sm shadow-sm"
                                    >
                                        <span>Join Our Journey</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </TrackedCTA>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}