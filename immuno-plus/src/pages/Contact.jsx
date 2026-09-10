import React, { useRef, useState } from "react";
import {
    Handshake,
    Building2,
    MapPin,
    BadgeCheck,
    ShieldCheck,

    ChevronDown,
    HelpCircle,
    ArrowUpRight
} from "lucide-react";
import { FaHeadset } from 'react-icons/fa6';

import { Navbar } from "../components/Navbar";
import heroBg from "../assets/hero_bg4.png";
import waterHandshake from "../assets/water_handshake.png";
import PartnerContactSection from "../components/Contact";
import VisitUsMap from "../components/VisitUsMap";
import { logByEvent } from "../services/fcmAnalytics";

const pageMetadata = [
    <title key="title">Contact Us | Immuno+</title>,
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

const features = [
    {
        icon: FaHeadset,
        title: 'Quick Support',
        description: 'We value your time'
    },
    {
        icon: ShieldCheck,
        title: 'Expert Support',
        description: 'From our specialist'
    },
    {
        icon: Handshake,
        title: 'Reliable Partner',
        description: 'For four growth'
    },
];

const defaultFaqs = [
    {
        question: "What types of businesses do you work with?",
        answer: "We partner with clinical labs, research institutes, enterprise healthcare providers, and regional medical distributors worldwide."
    },
    {
        question: "How can I become a distributor or dealer?",
        answer: "Submit a distributor inquiry form through our partner portal. Our channel management team will review your credentials within 2 business days."
    },
    {
        question: "Do you provide product demonstrations?",
        answer: "Yes, we provide both virtual walkthroughs and on-site demonstrations for qualified healthcare facilities and bulk procurement teams."
    },
    {
        question: "What is the warranty on your products?",
        answer: "Standard hardware comes with a comprehensive 24-month warranty, expandable up to 5 years under our enterprise maintenance plans."
    },
    {
        question: "How long does it take to get a response?",
        answer: "Our direct support line responds within 2–4 hours during standard operational hours (Mon–Fri, 9am–6pm IST)."
    }
];

export function Contact() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);

        // log faq open
        if (openIndex !== index) {
            logByEvent("select_content", {
                content_type: "faq",
                question: defaultFaqs[index].question,
            })
        }
    };
    const formRef = useRef(null);

    const lat = 28.91836550222201;
    const lng = 79.96692420650858;
    const companyName = "Immuno+";
    const addressLines = [
        "M/S Monal Enterprises, Degree College Road",
        "Khatima Uttarakhand 262308"
    ];
    const faqs = defaultFaqs;

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
                <div className="relative z-40 flex-1 px-6 py-6 md:px-20 lg:px-20 w-full max-w-400 mx-auto">
                    <div className="w-full md:max-w-md lg:max-w-2xl my-auto flex flex-col justify-center">
                        {/* Subheading Badge / Kicker */}
                        <p className="text-sky-400 font-semibold tracking-wider text-xs md:text-xs lg:text-sm mb-3 uppercase">
                            Contact us
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

                        <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blue-500/20 text-white mt-8 space-y-4 md:-ml-8">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-center px- text-left gap-2"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <Icon className="w-9 h-9 text-sky-500 stroke-[1.5]" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm tracking-wide leading-snug whitespace-pre-line">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-neutral-300">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Hero Footer: Glassmorphism Organization Bar (neglect it) */}
                <div className="relative w-fit mx-auto flex justify-center px-4 z-10 h-0">
                    <div className="w-full max-w-6xl lg:max-w-360 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-5 lg:py-8">

                        {/* Feature Columns */}
                        <div className="grid grid-cols-2 md:grid-cols-4 flex-1 z-10 divide-x divide-blue-400/30 opacity-0">
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
                                            <p className="text-[10px] md:text-sm text-neutral-400 leading-tight mt-0.5">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <img src={waterHandshake} className="absolute w-[50%] max-[900px]:hidden lg:w-[60%] 2xl:w-[80%] right-0 -top-90 lg:-right-30 lg:-top-95 2xl:-right-80 2xl:-top-115 opacity-75" />

                    </div>
                </div>
            </section>

            <section ref={formRef} className="bg-white">
                <PartnerContactSection formType={"contact_query"} />
            </section>

            <section className="w-full bg-slate-50 py-12 px-6 sm:px-10 lg:px-16 text-slate-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left: Map Component */}
                    <div className="md:col-span-6">
                        <VisitUsMap
                            lat={lat}
                            lng={lng}
                            companyName={companyName}
                            addressLines={addressLines}
                        />
                    </div>

                    {/* Right: FAQ Section */}
                    <div className="md:col-span-6 flex flex-col gap-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs lg:text-lg font-semibold uppercase tracking-wider mb-3">
                                <HelpCircle className="w-5 h-5 text-blue-600" />
                                Frequently Asked Questions
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                                Quick Answers
                            </h2>
                            <p className="mt-2 text-sm sm:text-base text-slate-500">
                                Find fast solutions to common inquiries about partnership, demos, and support.
                            </p>
                        </div>

                        {/* Accordion List */}
                        <div className="space-y-3">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                                            ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100'
                                            : 'bg-white/70 hover:bg-white border-slate-200/80 shadow-sm'
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between py-4 px-5 text-left text-sm sm:text-base font-semibold text-slate-800 focus:outline-none"
                                            aria-expanded={isOpen}
                                        >
                                            <span>{faq.question}</span>
                                            <ChevronDown
                                                className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-blue-600' : ''
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${isOpen ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
                                                }`}
                                        >
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Help Banner */}
                        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    ?
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                                    Still have questions? Reach out directly.
                                </p>
                            </div>

                            <button
                                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
                                onClick={() => {
                                    // log learn more faqs
                                    logByEvent("select_content", {
                                        content_type: "faq_learn_more",
                                    });

                                    formRef.current.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    })
                                }}
                            >
                                Contact our team
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}