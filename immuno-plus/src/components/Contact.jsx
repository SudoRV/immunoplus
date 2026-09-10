import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Send,
  MessageCircle,
  PhoneCall,
  Mail,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Smartphone,
  X,
  Loader2,
  Check
} from 'lucide-react';
import { logByEvent } from '../services/fcmAnalytics';
import { QRCodeSVG } from 'qrcode.react';

const directContacts = [
  {
    id: 'whatsapp',
    title: 'Chat on WhatsApp',
    subtitle: 'Instant response from our advisory team',
    value: '+91 97621 70838',
    actionText: 'Message Us',
    href: 'https://wa.me/919762170838',
    icon: MessageCircle,
    colorClasses: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300',
    btnClasses: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
  {
    id: 'phone',
    title: 'Call Direct Support',
    subtitle: 'Speak directly with an executive',
    value: '+91 97621 70838',
    actionText: 'Call Now',
    href: 'tel:+919762170838',
    icon: PhoneCall,
    colorClasses: 'text-blue-500 bg-blue-50 border-blue-100 hover:border-blue-300',
    btnClasses: 'bg-blue-500 hover:bg-blue-700 text-white',
  },
  {
    id: 'email',
    title: 'Send an Email',
    subtitle: 'Inquiries, proposals & official support',
    value: 'plusimmuno@gmail.com',
    actionText: 'Compose Mail',
    href: 'mailto:plusimmuno@gmail.com',
    icon: Mail,
    colorClasses: 'text-cyan-600 bg-cyan-50 border-cyan-100 hover:border-cyan-300',
    btnClasses: 'bg-cyan-600 hover:bg-cyan-700 text-white',
  },
];

export default function PartnerContactSection({ formType }) {
  const url = useLocation();
  const location = url.pathname;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    status: null,
    message: null,
  });

  const [selectedContact, setSelectedContact] = useState(directContacts[0]);

  const sourceKey = formType ? formType.toLowerCase() : "contact";
  const qrUrl = encodeURIComponent(`${window.location.origin}/qrscan/${selectedContact?.id}?s=${sourceKey[0]}&redirect_url=${encodeURIComponent(selectedContact?.href)}`);

  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      status: "sending",
      message: "Sending query",
    });

    const query = {
      formType,
      ...formData
    };

    try {
      const response = await fetch(
        "https://wo4uo3zdrnvqwfehrtoyhisz5a0ekuww.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setFormStatus({
          status: "sent",
          message: data.message,
        })

        // log form submit 
        logByEvent("generate_lead", {
          method: "website",
          lead_type: formType === "contact_query" ? "contact" : "dealer"
        })
      } else {
        setFormStatus({
          status: "error",
          message: data.message,
        })
      }
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "Internal server error",
      })
    } finally {
      setTimeout(() => {
        setFormStatus({
          status: null,
          message: null,
          error: null
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          message: '',
        })
      }, 6000)
    }
  };

  const handleCardClick = (contact) => {
    setSelectedContact((prev) => (prev?.id === contact.id ? null : contact));
  };

  return (
    <section className="relative w-full bg-slate-50/50 py-12 lg:py-12 px-6 md:px-12 lg:px-6 text-slate-800 overflow-hidden">
      {/* Soft background blue ambient blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs lg:text-lg font-bold tracking-widest text-blue-500 uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Discuss Your <span className="text-blue-500">{location === "/contact" ? "Queries" : "Partnership."}</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Fill in the details below to initiate a discussion, or connect with us directly via WhatsApp, call, or email.
          </p>
        </div>

        {/* Form + Direct Actions Grid */}
        <div className="flex gap-12 flex-wrap md:flex-nowrap justify-center items-start">

          {/* Left Column: Form Card */}
          <div className="max-w-xl space-y-6">
            <div className='bg-white rounded-3xl p-8 md:p-8 mt-2 border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)]'>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span>Send Us an Inquiry</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700 tracking-wide">
                    Full Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700 tracking-wide">
                    Email Address <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* Phone + WhatsApp Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-base font-semibold text-slate-700 tracking-wide">
                      Phone Number <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-base font-semibold text-slate-700 tracking-wide">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-base font-semibold text-slate-700 tracking-wide">
                    Your Message or Requirement <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={location === "/contact" ? "Share your queries.." : "Share details about your background, territory interest, or product questions..."}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className={
                    `w-full py-3.5 px-6 rounded-full bg-blue-500 ${formStatus.status === "sending" ? "bg-amber-300" : formStatus.status === "sent" ? "bg-emerald-500" : formStatus.status === "error" && "bg-red-400"} hover:bg-blue-700 text-white font-semibold text-sm md:text-base transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer`
                  }
                >
                  {
                    !formStatus.status ? (
                      <div className='flex items-center gap-2'>
                        <span>{location === "/contact" ? "Submit Query" : "Submit Partnership Application"}</span>
                        <Send className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <span>{formStatus.message}</span>
                        {
                          formStatus.status === "sending" ? (
                            <Loader2 className='animate-spin' />
                          ) : formStatus.status === "sent" && (
                            <Check className='w-6 h-6' />
                          )
                        }
                      </div>
                    )
                  }
                </button>
              </form>
            </div>

            {/* Trust Assurances */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/60 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>What Happens Next?</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-1.5 pl-6 list-disc marker:text-blue-500">
                <li>Your inquiry is routed directly to your local territorial lead.</li>
                <li>Initial onboarding call scheduled within 24 business hours.</li>
                <li>Comprehensive product and margin decks delivered via email.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Direct Contact Hub */}
          <div className="max-w-lg flex flex-col justify-between space-y-6">

            {/* Header note */}
            <div className="space-y-2">
              <span className="text-xs lg:text-lg font-bold tracking-widest text-slate-400 uppercase">
                Direct Channels
              </span>
              <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                Prefer immediate answers? Speak to us directly.
              </h3>
              <p className="text-sm lg:text-base text-slate-500 leading-relaxed">
                Connect with our authorized regional team members for immediate guidance regarding franchise setups and bulk supplies.
              </p>
            </div>

            {/* Direct Connect Action Cards */}
            <div className="space-y-4">
              {directContacts.map((contact) => {
                const Icon = contact.icon;
                const isSelected = selectedContact?.id === contact.id;

                return (
                  <div
                    key={contact.id}
                    onClick={() => handleCardClick(contact)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border cursor-pointer transition-all overflow-x-clip ${isSelected
                      ? 'border-blue-500 shadow-md ring-2 ring-blue-500/15'
                      : 'border-slate-200/80 hover:border-blue-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${contact.colorClasses}`}>
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm md:text-base font-bold text-slate-900 leading-tight">
                          {contact.title}
                        </h4>
                        <p className="text-xs lg:text-sm text-slate-400 font-medium">
                          {contact.subtitle}
                        </p>
                        <p className="text-xs lg:text-sm font-semibold text-slate-700 pt-0.5">
                          {contact.value}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0 shrink-0">
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs lg:text-sm wrap-break-word font-semibold transition-all shadow-sm shrink-0 ${contact.btnClasses}`}
                        onClick={() => {
                          // log cta lead (direct contacts )
                          logByEvent("generate_lead", {
                            method: contact.id,
                            lead_type: formType === "contact_query" ? "contact" : "dealer",
                            placement: `${formType?.split("_")[0]}page_direct_cta`
                          })
                        }}
                      >
                        <span>{contact.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic QR Code Box for Selected Channel */}
            {selectedContact && (
              <div className="p-5 rounded-2xl bg-white border border-blue-200/80 shadow-sm transition-all duration-300">
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-slate-900">
                      Scan to open {selectedContact.title.replace('Chat on ', '').replace('Send an ', '').replace('Call ', '')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedContact(null)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-inner shrink-0">
                    <QRCodeSVG
  value={qrUrl}
  size={200}
  level="M"
  fgColor="#000000"
  bgColor="#ffffff"
  marginSize={1}
  
  className="w-50 h-50 sm:w-35 h-35"
/>
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-blue-600">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Point camera to connect instantly</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Scan with your smartphone camera to launch directly into your native phone app without saving contact details manually.
                    </p>
                    <p className="text-sm font-mono text-slate-400 break-all pt-1">
                      {selectedContact.value}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
