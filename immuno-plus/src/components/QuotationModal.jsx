import { Check, Loader2, X } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { logByEvent } from '../services/fcmAnalytics';

// Target business details
const BUSINESS_PHONE = "919762170838"; // Country code without '+' or special characters
const BUSINESS_EMAIL = "plusimmuno@gmail.com";

export default function QuotationModal({
    quotationModal,
    setQuotationModal,
    selectedProduct
}) {
    const isOrder = quotationModal?.type === 'order';

    // log user clicks for order / quotation form start
    useEffect(() => {
        if (!quotationModal?.status || !selectedProduct?.id) return;
        logByEvent("form_start", {
            form_name: quotationModal.type,
            product_name: selectedProduct.name + " " + selectedProduct.variant,
            currency: "INR",
            value: selectedProduct.price,
            placement: "product_modal",
            items: [
                {
                    item_id: selectedProduct.id,
                    item_name: selectedProduct.name + " " + selectedProduct.variant,
                    item_brand: 'ImmunoPlus',
                    price: selectedProduct.price,
                }
            ]
        })
    }, [quotationModal.type, selectedProduct])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        message: '',
        address: '',
        quantity: 1,
    });

    const [formStatus, setFormStatus] = useState({});

    const [qrMode, setQrMode] = useState('whatsapp');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value?.trim() }));
    };

    // Calculate total if price exists and mode is order
    const totalAmount = useMemo(() => {
        if (!selectedProduct?.price) return null;
        return Number(selectedProduct.price) * (Number(formData.quantity) || 1);
    }, [selectedProduct?.price, formData.quantity]);

    // Dynamic message template based on modal mode
    const whatsappMessage = useMemo(() => {
        const header = isOrder ? `🛍️ *NEW DIRECT ORDER REQUEST*` : `📋 *QUOTATION ENQUIRY*`;

        let msg = `${header}\n\n`;
        msg += `*Product Details:*\n`;
        msg += `- Item: ${selectedProduct?.name || 'N/A'} ${selectedProduct?.variant || ''}\n`;
        if (selectedProduct?.price) msg += `- Unit Price: Rs ${selectedProduct.price}\n`;
        if (isOrder) {
            msg += `- Quantity: ${formData.quantity || 1}\n`;
            if (totalAmount) msg += `- Estimated Total: Rs ${totalAmount}\n`;
        }
        msg += `\n*Customer Details:*\n`;
        msg += `- Name: ${formData.name?.trim() || 'Not specified'}\n`;
        msg += `- Phone: ${formData.phone?.trim() || 'Not specified'}\n`;
        msg += `- Email: ${formData.email?.trim() || 'Not specified'}\n`;
        if (isOrder) msg += `- Delivery Address: ${formData.address?.trim() || 'Not specified'}\n`;

        return msg;
    }, [quotationModal.type, isOrder, formData, selectedProduct, totalAmount]);

    // Dynamic Email message (Uses \r\n for universal client line-break support)
    const emailMessage = useMemo(() => {
        const header = isOrder ? `NEW DIRECT ORDER REQUEST` : `QUOTATION ENQUIRY`;

        let msg = `${header}\r\n\r\n`;
        msg += `PRODUCT DETAILS:\r\n`;
        msg += `• Item: ${selectedProduct?.name || 'N/A'} ${selectedProduct?.variant || ''}\r\n`;
        if (selectedProduct?.price) msg += `• Unit Price: Rs ${selectedProduct.price}\r\n`;
        if (isOrder) {
            msg += `• Quantity: ${formData.quantity || 1}\r\n`;
            if (totalAmount) msg += `• Estimated Total: Rs ${totalAmount}\r\n`;
        }
        msg += `\r\nCUSTOMER DETAILS:\r\n`;
        msg += `• Name: ${formData.name?.trim() || 'Not specified'}\r\n`;
        msg += `• Phone: ${formData.phone?.trim() || 'Not specified'}\r\n`;
        msg += `• Email: ${formData.email?.trim() || 'Not specified'}\r\n`;
        if (isOrder) msg += `• Delivery Address: ${formData.address?.trim() || 'Not specified'}\r\n`;

        return msg;
    }, [quotationModal.type, isOrder, formData, selectedProduct, totalAmount]);

    // Construct dynamic URLs
    const whatsappUrl = useMemo(() => {
        return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
    }, [quotationModal.type, whatsappMessage]);

    const mailtoUrl = useMemo(() => {
        const subject = encodeURIComponent(
            `${isOrder ? 'New Order Placement' : 'Quotation Request'} - ${selectedProduct?.name || 'Product'}`
        );
        const body = encodeURIComponent(emailMessage);
        return `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    }, [isOrder, emailMessage, selectedProduct]);

    const targetDestination = qrMode === 'whatsapp' ? whatsappUrl : mailtoUrl;

    const activeQrUrl = encodeURIComponent(`${window.location.origin}/qrscan/${qrMode}?s=${quotationModal?.type?.toLowerCase()[0]}&product_id=${encodeURIComponent(selectedProduct.id)}&redirect_url=${encodeURIComponent(targetDestination)}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({
            status: "sending",
            message: "Sending query",
        });

        const query = {
            type: quotationModal.type === "quotation" ? "quotation_query" : "order_query",
            product: {
                name: selectedProduct.name,
                variant: selectedProduct.variant,
                price: selectedProduct.price
            },
            ...formData
        }

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

                // log the lead event / order quotation submission
                logByEvent("generate_lead", {
                    method: "website",
                    lead_type: quotationModal.type,
                    product_id: selectedProduct.id,
                    placement: "product_modal",
                    product_name: selectedProduct.name + " " + selectedProduct.variant,
                    currency: "INR",
                    value: selectedProduct.price,
                    items: [
                        {
                            item_id: selectedProduct.id,
                            item_name: selectedProduct.name + " " + selectedProduct.variant,
                            item_brand: 'ImmunoPlus',
                            price: selectedProduct.price,
                            quantity: selectedProduct.quantity
                        }
                    ]
                });
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
                });

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    whatsapp: '',
                    message: '',
                    address: '',
                    quantity: 1,
                })
            }, 6000)
        }
    };

    const handleClose = () => {
        setQuotationModal((prev) => ({ ...prev, status: false }));
    };

    return (
        <div
            className={`fixed overflow-hidden inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${quotationModal?.status
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
        >
            <div
                className={`relative w-full max-w-4xl max-h-[80vh] sm:max-h[90vh] mx-6 overflow-y-auto hide-scollbar rounded-xl md:roumded-3xl bg-white shadow-2xl ring-1 ring-neutral-900/5 transition-all duration-300 ${quotationModal?.status ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'
                    }`}
            >

                <button className='static top-4 right-4 text-neutral-800' onClick={handleClose}>
                    <X className='w-6 h-6 stroke-2.5' />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 mt-2">
                    {/* Left Column: Dynamic Form Section */}
                    <div className="relative p-6 sm:p-8 md:col-span-7">
                        {/* response */}
                        <div className={`absolute top-4 p-2 px-4 rounded-xl shadow-xl transition-transform duration-300 ease-in-out 
                        ${["sent", "error"].includes(formStatus.status) ? "right-4" : "right-full"
                            } ${formStatus.status === "sent" ? "bg-emerald-500" : formStatus.status === "error" ? "bg-red-400" : "bg-transparent"
                            } 
                      text-white text-sm font-semibold z-40`}>
                            <p>{formStatus.message}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold tracking-tight text-neutral-800">
                                {isOrder ? 'Place Your Order' : 'Request Quotation'}
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                {isOrder
                                    ? 'Provide your shipping info to place an immediate order or reserve stock.'
                                    : 'Enter your details to generate a quotation or submit directly.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Akash ..."
                                        required
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition duration-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                                        Phone / WhatsApp
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 812XX XXXXX"
                                        required
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition duration-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                                    />
                                </div>
                            </div>

                            <div className={isOrder ? "grid grid-cols-1 gap-4 sm:grid-cols-3" : ""}>
                                <div className={isOrder ? "sm:col-span-2" : ""}>
                                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition duration-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                                    />
                                </div>

                                {/* Quantity Field (Shown exclusively for Orders) */}
                                {isOrder && (
                                    <div>
                                        <label htmlFor="quantity" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                                            Quantity
                                        </label>
                                        <input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-800 outline-none transition duration-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Delivery Address Field (Shown exclusively for Orders) */}
                            {isOrder && (
                                <div>
                                    <label htmlFor="address" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                                        Delivery Address & Pincode
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Flat / House no, Landmark, City, State - Pincode"
                                        required
                                        className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition duration-200 focus:border-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
                                    />
                                </div>
                            )}

                            {/* Selected Product & Price Calculation Summary */}
                            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3.5">
                                <span className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                                    Selected Item
                                </span>
                                <div className="mt-1 flex items-start justify-between text-sm">
                                    <div>
                                        <p className="font-semibold text-neutral-800">
                                            {selectedProduct?.name} {selectedProduct?.variant}
                                        </p>
                                        <p className="text-xs text-neutral-500 line-clamp-1">
                                            {selectedProduct?.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {selectedProduct?.price && (
                                            <p className="font-semibold text-neutral-900">
                                                Rs {isOrder && totalAmount ? totalAmount : selectedProduct.price}
                                            </p>
                                        )}
                                        {isOrder && selectedProduct?.price && formData.quantity > 1 && (
                                            <span className="block text-[10px] text-neutral-400">
                                                Rs {selectedProduct.price} × {formData.quantity}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="cursor-pointer rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`
                                        cursor-pointer rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 active:scale-95
                                        flex justify-center items-center gap-2
                                        ${formStatus.status === "sending" ? "bg-amber-400!" : formStatus.status === "sent" && "bg-emerald-500!"}`}
                                >
                                    {
                                        isOrder ? 'Place Order' : 'Submit Request'
                                    }
                                    {
                                        formStatus.status === "sending" && (
                                            <Loader2 className='animate-spin' />
                                        )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Instant Links & Switchable Live QR */}
                    <div className="flex flex-col justify-between border-t border-neutral-100 bg-neutral-50/80 p-6 sm:p-8 md:col-span-5 md:border-t-0 md:border-l">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                Instant Order via Chat
                            </span>
                            <p className="mt-1 text-xs text-neutral-500">
                                Send pre-filled details straight to our support team.
                            </p>

                            {/* Switcher Tabs */}
                            <div className="mt-4 flex rounded-xl bg-neutral-200/70 p-1">
                                <button
                                    type="button"
                                    onClick={() => setQrMode('whatsapp')}
                                    className={`flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-semibold transition-all duration-200 ${qrMode === 'whatsapp'
                                        ? 'bg-white text-emerald-700 shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                        }`}
                                >
                                    WhatsApp
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setQrMode('email')}
                                    className={`flex-1 cursor-pointer rounded-lg py-1.5 text-xs font-semibold transition-all duration-200 ${qrMode === 'email'
                                        ? 'bg-white text-blue-700 shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                        }`}
                                >
                                    Email
                                </button>
                            </div>

                            {/* Dynamic QR Code Card */}
                            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm">
                                <div className="overflow-hidden rounded-lg bg-white p-1">
                                    <img
                                        key={`${qrMode}-${quotationModal?.type}`}
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${activeQrUrl}`}
                                        alt={`${qrMode === 'whatsapp' ? 'WhatsApp' : 'Email'} QR Code`}
                                        width={130}
                                        height={130}
                                        className="h-50 w-50 rounded-lg transition-opacity duration-200"
                                    />
                                </div>
                                <span className="mt-2.5 text-[11px] font-medium text-neutral-500">
                                    Scan to {isOrder ? 'order' : 'request'} via {qrMode === 'whatsapp' ? 'WhatsApp' : 'Email'}
                                </span>
                            </div>
                        </div>

                        {/* Direct Connect Action Links */}
                        <div className="mt-6 space-y-2.5">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-emerald-500 active:scale-95"
                                onClick={() => {
                                    // lead generation through direct contact (order / quotation)
                                    logByEvent("generate_lead", {
                                        method: "whatsapp",
                                        lead_type: quotationModal.type,
                                        product_id: selectedProduct.id,
                                        placement: "product_modal",

                                        product_name: selectedProduct.name + " " + selectedProduct.variant,
                                        currency: "INR",
                                        value: selectedProduct.price,
                                        items: [
                                            {
                                                item_id: selectedProduct.id,
                                                item_name: selectedProduct.name + " " + selectedProduct.variant,
                                                item_brand: 'ImmunoPlus',
                                                price: selectedProduct.price,
                                                quantity: selectedProduct.quantity
                                            }
                                        ]
                                    })
                                }}
                            >
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                </svg>
                                <span>{isOrder ? 'Order via WhatsApp' : 'Request via WhatsApp'}</span>
                            </a>

                            <a
                                href={mailtoUrl}
                                target='blank'
                                rel='noopener norefferer'
                                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition duration-150 hover:bg-neutral-100 active:scale-95"
                                onClick={() => {
                                    logByEvent("generate_lead", {
                                        method: "email",
                                        lead_type: quotationModal.type,
                                        product_id: selectedProduct.id,
                                        placement: "product_modal",

                                        product_name: selectedProduct.name + " " + selectedProduct.variant,
                                        currency: "INR",
                                        value: selectedProduct.price,
                                        items: [
                                            {
                                                item_id: selectedProduct.id,
                                                item_name: selectedProduct.name + " " + selectedProduct.variant,
                                                item_brand: 'ImmunoPlus',
                                                price: selectedProduct.price,
                                                quantity: selectedProduct.quantity
                                            }
                                        ]
                                    })
                                }}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{isOrder ? 'Order via Email' : 'Open in Email'}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}