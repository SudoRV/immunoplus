import React, { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { logByEvent } from "../services/fcmAnalytics";

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Why do I need ionized water?",
            answer:
                "Ionized water offers a different approach to everyday drinking water by combining filtration with electrolysis. Instead of only filtering the water, an ionizer can also produce alkaline water with different pH and oxidation-reduction characteristics. Immuno+ is designed to make freshly produced ionized water available whenever you need it.",
        },
        {
            question: "What are the benefits of ionized water?",
            answer:
                "Ionized water is valued for its alkaline nature and for being freshly produced on demand. Depending on the source water and machine settings, the ionization process can also produce dissolved molecular hydrogen and change the water's oxidation-reduction potential. These properties are being studied scientifically, but ionized water should not be considered a replacement for medical treatment.",
        },
        {
            question: "What is the pH of Immuno+ ionized water?",
            answer:
                "The alkaline drinking-water setting can produce water with a pH above neutral. The exact pH depends on the incoming water quality, mineral content, flow rate and selected machine setting. This allows the water to be adjusted according to the intended use.",
        },
        {
            question: "What technology does Immuno+ use?",
            answer:
                "Immuno+ combines multi-stage water filtration with electrolysis. After filtration, water passes through an electrolysis chamber containing specially engineered electrodes. An electrical current creates separate water streams with different characteristics, including an alkaline stream for drinking.",
        },
        {
            question: "What type of plates are used in Immuno+ ionizers?",
            answer:
                "Immuno+ ionizers use titanium electrodes with a platinum coating. Titanium provides a durable base for the electrode, while platinum is used for its electrochemical properties and resistance to corrosion. The exact plate configuration can vary depending on the Immuno+ model.",
        },
        {
            question: "Do I need an RO system before installing Immuno+?",
            answer:
                "Not necessarily. The right setup depends on the quality and composition of your incoming water. Immuno+ systems include filtration, but if your water has particularly high levels of dissolved solids or other concerns, additional treatment may be recommended. A water-quality assessment can help determine the best configuration.",
        },
        {
            question: "How is Immuno+ installed?",
            answer:
                "Installation involves connecting the unit to the appropriate water supply, drainage and electrical connection. The system is then tested and configured for proper operation. Professional installation is recommended to ensure the unit is correctly connected and set up.",
        },
        {
            question: "Will I get home delivery?",
            answer:
                "Yes. Immuno+ can be delivered to your home or business, subject to service availability in your location. Delivery and installation can be coordinated so that your system is ready to use after installation.",
        },
        {
            question: "Can Immuno+ be used in offices and businesses?",
            answer:
                "Yes. Immuno+ can be suitable for homes as well as offices, gyms, clinics, hotels, restaurants and other commercial environments. The appropriate model depends on the number of users, expected water consumption and available installation space.",
        },
        {
            question: "How can I order an Immuno+ ionizer?",
            answer:
                "You can submit an enquiry through the Immuno+ website or contact our team directly. We can help you select the right model, understand installation requirements, confirm availability and arrange delivery and installation.",
        },
    ];

    const toggleFaq = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
            return;
        }

        logByEvent("select_content", {
            content_type: "faq",
            question: faqs[index].question,
            placement: "homepage",
        });

        setOpenIndex(index);
    };

    return (
        <section className="w-full bg-white py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Section Header */}
                    <p className="text-lg sm:text-2xl font-bold text-slate-800 text-center">
                        Got Questions? We’ve Got Answers
                    </p>

                {/* FAQ LIST */}
                <div className="mt-8 space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                    isOpen
                                        ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100"
                                        : "bg-white/70 hover:bg-white border-slate-200/80 shadow-xs"
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between py-4 px-5 text-left text-base font-semibold text-slate-800 focus:outline-none cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>

                                    <ChevronDown
                                        className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                                            isOpen
                                                ? "rotate-180 text-blue-600"
                                                : ""
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                                        isOpen
                                            ? "max-h-60 pb-4 opacity-100"
                                            : "max-h-0 pb-0 opacity-0"
                                    }`}
                                >
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}