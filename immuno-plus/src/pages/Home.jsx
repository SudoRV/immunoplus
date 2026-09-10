import { Navbar } from "../components/Navbar";
import {
    ArrowRight,
    Users,
    Building2,
    Sparkles,
    ConciergeBell,
    Building,
    Droplet, ShieldCheck, Globe
} from "lucide-react";

import heroBg from "../assets/hero_bg4.png";
import heroBgRock from "../assets/hero_bg_rock.png";
import { WhoWeAre } from "./About";
import { ProductSolutions, WhyChooseImmuno } from "./Products";
import TrackedCTA from "../components/ui/TrackedCTA";

const pageMetadata = [
    <title key="title">Immuno+ | Advanced Water Ionization Solutions</title>,
];

const targetAudiences = [
    {
        title: "Healthcare",
        subtitle: "Hospitals & Clinics",
        icon: Building2,
    },
    {
        title: "Wellness",
        subtitle: "Gyms & Wellness Centers",
        icon: Sparkles,
    },
    {
        title: "Hospitality",
        subtitle: "Hotels & Resorts",
        icon: ConciergeBell,
    },
    {
        title: "Corporate",
        subtitle: "Offices & Institutions",
        icon: Building,
    },
];

const features = [
    {
        icon: Droplet,
        line1: "Advanced",
        line2: "Ionization",
    },
    {
        icon: ShieldCheck,
        line1: "Premium",
        line2: "Quality",
    },
    {
        icon: Globe, // Or use a custom network/location icon
        line1: "Nationwide",
        line2: "Opportunities",
    },
];

export function Home() {
    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col overflow-x-hidden">
            {pageMetadata}
            {/* Hero Section */}
            <section
                className="w-full flex flex-col justify-between min-h-160  lg:min-h-200 xl:min-h-screen bg-cover bg-top lg:bg-top-left bg-no-repeat"
                style={{ backgroundImage: `url(${heroBg})`, }}
            >
                {/* The filter layer: filters the background image behind it */}
                <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: "brightness(0.75)" }} />

                {/* Navigation Bar */}
                <Navbar />

                {/* Hero Content */}
                <div className="px-6 md:px-20 lg:px-20 py-6 w-full max-w-400 mx-auto z-20">
                    <div className="w-full max-[640px]:max-w-sm sm:max-w-md lg:max-w-xl my-auto flex flex-col justify-center">
                        {/* Subheading Badge / Kicker */}
                        <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
                            Advanced Water Ionization Solutions
                        </p>

                        {/* Main Headline */}
                        <div className="space-y-1 md:space-y-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
                                Transforming Water
                            </h1>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-sky-400">
                                To Live Better
                            </h1>
                        </div>

                        {/* Subtitle Description */}
                        <p className="mt-4 text-sm md:text-base lg:text-lg 2xl:text-xl text-neutral-300">
                            Premium water ionizers for healthcare, wellness, hospitality,
                            corporate, and high-end commercial environments.
                        </p>
                    </div>

                    {/* Action CTAs */}
                    <div className="mt-8 flex flex-wrap gap-4 items-center">
                        {/* Primary Action Button */}
                        <TrackedCTA className="group flex items-center justify-between gap-3 md:gap-5 bg-blue-500 hover:bg-blue-400 transition-all text-white text-xs sm:text-sm md:text-base font-semibold py-1.5 pl-5 pr-2 md:py-2 md:pl-6 md:pr-2.5 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
                            as="link"
                            to="/products"
                            ctaName="explore_products"
                            ctaType="navigation"
                            location="homepage_hero"
                        >
                            <span>Explore Our Products</span>
                            <div className="bg-white rounded-full p-2 md:p-2.5 text-neutral-950 transition-transform group-hover:translate-x-1">
                                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-900" />
                            </div>
                        </TrackedCTA>

                        {/* Secondary Action Button */}
                        <TrackedCTA className="flex items-center gap-3 border border-neutral-400/40 hover:border-neutral-200 hover:bg-white/10 transition-all text-neutral-100 text-xs sm:text-sm md:text-base font-medium py-2.5 px-5 md:py-3.5 md:px-7 rounded-full backdrop-blur-sm active:scale-95 cursor-pointer"
                            as="Link"
                            to="/join"
                            ctaName="dealer_inquiry"
                            ctaType="navigation"
                            location="homepage_hero"
                            autoScroll={true}>
                            <span>Become a Dealer</span>
                            <Users className="w-4 h-4 md:w-5 md:h-5 text-neutral-300" />
                        </TrackedCTA>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-transparent py-4 mt-4 sm:mt-8">
                        {features.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={index} className="flex items-center gap-3.5 group cursor-default">
                                    {/* Glowing Circular Icon Container */}
                                    <div className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-sky-400 bg-sky-950/30 shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.7)] group-hover:border-sky-300">
                                        <IconComponent
                                            className="w-5 h-5 md:w-6 md:h-6 text-sky-400 transition-transform duration-300 group-hover:scale-105"
                                            strokeWidth={1.75}
                                        />
                                    </div>

                                    {/* Two-line Text */}
                                    <div className="flex flex-col text-left">
                                        <span className="text-sm lg:text-base text-white leading-tight">
                                            {item.line1}
                                        </span>
                                        <span className="text-xs lg:text-sm text-slate-100/80 leading-tight">
                                            {item.line2}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Hero Footer: Glassmorphism Organization Bar */}
                <div className="relative w-full flex justify-center px-4 z-10">
                    <div className="w-full max-[540px]:flex-col sm:max-w-6xl lg:max-w-360 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-5 lg:py-8 bg-linear-to-b from-[#062047]/90 via-[#02142d]/95 to-[#010b1a]/95 backdrop-blur-md rounded-t-2xl border-t border-x border-blue-400/30 shadow-2xl">

                        {/* Header Callout */}
                        <div className="min-w-fit pr-2 z-10">
                            <p className="text-[11px] md:text-xs lg:text-sm font-semibold text-sky-400 tracking-wider">
                                BUILT FOR ORGANIZATIONS
                            </p>
                            <p className="text-xs md:text-sm lg:text-base font-bold text-neutral-100">
                                THAT VALUE BETTER WATER
                            </p>
                        </div>

                        {/* Feature Columns */}
                        <div className="grid grid-cols-2 min-[670px]:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 flex-1 z-10">
                            {targetAudiences.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 border-0 md:border-l border-blue-400/30 pl-4 md:pl-5 first:border-l-0 md:first:border-l"
                                    >
                                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-sky-400 shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <p className="text-sm md:text-sm lg:text-xl font-semibold text-neutral-100 leading-tight">
                                                {item.title}
                                            </p>
                                            <p className="text-xs md:text-sm lg:text-base text-neutral-400 leading-tight mt-0.5">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <img src={heroBgRock} className="absolute max-[900px]:hidden z-0 w-[40%] lg:w-[38%] right-0 -top-32 md:-top-40 lg:-top-52 xl:-top-60" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <WhoWeAre />

            {/* Products Solutions */}
            <ProductSolutions />

            {/* WhyChooseImmuno */}
            <WhyChooseImmuno />
        </div>
    );
}
