import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import QuotationModal from "./QuotationModal";
import { logByEvent } from "../services/fcmAnalytics";

export default function ImmunoProductModal({ selectedProduct, setSelectedProduct }) {
  const [activeImage, setActiveImage] = useState(null);
  const [quotationModal, setQuotationModal] = useState({
    status: false,
    type: null
  });


  useEffect(() => {
    if (selectedProduct?.details?.images?.length) {
      setActiveImage(selectedProduct.details.images[0]);
    } else if (selectedProduct?.image) {
      setActiveImage(selectedProduct.image);
    }

    // log product view
    if(!selectedProduct?.id) return;
    logByEvent("view_item", {
      product_name: selectedProduct.name + " " + selectedProduct.variant,
      currency: "INR",
      value: selectedProduct.price,
      items: [
        {
          item_id: selectedProduct.id,
          item_name: selectedProduct.name + " " + selectedProduct.variant,
          item_brand: 'ImmunoPlus',
          price: selectedProduct.price,
        }
      ]
    })
  }, [selectedProduct]);

  const images =
    selectedProduct?.details?.images?.length > 0
      ? selectedProduct.details.images
      : selectedProduct?.image
        ? [selectedProduct.image]
        : [];

  const isOpen = Boolean(selectedProduct?.id);

  function closeModal() {
    setSelectedProduct({});
    window.history.replaceState(null, '', '/products');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => closeModal()}
        className={`fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-90 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Slide-in Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-3xl bg-neutral-50 z-100 flex flex-col text-neutral-900 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none overflow-y-auto overscroll-contain"
          }`}>
        {/* Navigation & Header */}
        <div className="w-full flex items-center justify-between px-8 py-2 border-b border-neutral-200 bg-white sticky top-0 z-20">
          <div>
            <span className="text-xs lg:text-lg font-semibold text-blue-500 tracking-wider uppercase">
              {selectedProduct?.name} Series
            </span>
          </div>

          <button
            onClick={() => closeModal()}
            className="p-2 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5 stroke-2" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* Gallery Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Thumbnails */}
            <div className="md:col-span-2 flex md:flex-col gap-2.5 order-2 md:order-1 overflow-x-auto md:overflow-y-auto">
              {images.map((img, idx) => {
                const isSelected = activeImage === img;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative shrink-0 w-16 h-16 md:w-full md:h-20 rounded-lg overflow-hidden p-2 transition-all cursor-pointer bg-white ${isSelected
                      ? "border-2 border-blue-400 shadow-sm"
                      : "border border-neutral-200 hover:border-sky-500"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Large Preview */}
            <div className="w-full md:col-span-10 order-1 md:order-2 bg-white border border-neutral-200 rounded-xl p-6 flex items-center justify-center  min-h-[260px] max-h-[400px] aspect-video">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={selectedProduct?.name}
                  className="h-full w-auto max-w-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Pricing & Summary */}
          <div className="border-b border-neutral-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-neutral-700">
                  {selectedProduct?.name} {selectedProduct?.variant}
                </h1>
                <p className="mt-1 text-sm lg:text-base text-neutral-600">
                  {selectedProduct?.description}
                </p>
              </div>

              <div className="pt-2 sm:pt-0">
                {
                  selectedProduct?.price ? (
                    <div>
                      <span className="text-2xl font-bold text-neutral-900">
                        Rs {selectedProduct?.price}
                      </span>
                      <span className="text-xs lg:text-sm text-neutral-600 ml-2 font-semibold">Standard MRP</span>
                    </div>
                  ) : (
                    <p className="font-semibold text-neutral-400">Contact for Customized Quotation</p>
                  )
                }
              </div>

            </div>
          </div>

          {/* Clinical Overview & Operation */}
          {selectedProduct?.details && (
            <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
              {selectedProduct.details.overview && (
                <div>
                  <h3 className="text-xs lg:text-lg font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Overview
                  </h3>
                  <p className="lg:text-base">{selectedProduct.details.overview}</p>
                </div>
              )}

              {selectedProduct.details.workingPrinciple && (
                <div>
                  <h3 className="text-xs lg:text-lg font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Working Principle
                  </h3>
                  <p className="lg:text-base">{selectedProduct.details.workingPrinciple}</p>
                </div>
              )}

              {/* Data Table for Specs */}
              <div>
                <h3 className="text-xs lg:text-lg font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                  Technical Specifications
                </h3>
                <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse text-xs lg:text-sm">
                    <tbody className="divide-y divide-neutral-100">
                      {selectedProduct.details.outputCapacity && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 w-1/3 bg-neutral-50/50">
                            Flow Rate / Output
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.outputCapacity}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.powerConsumption && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            Power Consumption
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.powerConsumption}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.powerSupply && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            Power Supply
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.powerSupply}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.electrodePlates && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            Electrode Chamber
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.electrodePlates}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.pHRange && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            pH Range
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.pHRange}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.orpPerformance && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            ORP Range
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900 font-medium">
                            {selectedProduct.details.orpPerformance}
                          </td>
                        </tr>
                      )}
                      {selectedProduct.details.cleaningSystem && (
                        <tr>
                          <td className="py-2.5 px-4 font-medium text-neutral-500 bg-neutral-50/50">
                            Maintenance
                          </td>
                          <td className="py-2.5 px-4 text-neutral-900">
                            {selectedProduct.details.cleaningSystem}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Water Modes */}
              {selectedProduct.details.waterModes && (
                <div>
                  <h3 className="text-xs lg:text-lg font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Supported Output Modes
                  </h3>
                  <ul className="list-disc list-outside pl-4 space-y-1.5 text-neutral-600 lg:text-base">
                    {selectedProduct.details.waterModes.map((mode, i) => (
                      <li key={i}>{mode}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-white flex items-center justify-end gap-4">

          <button className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-sky-500 text-white text-xs md:text-sm font-semibold tracking-wide transition-colors cursor-pointer" onClick={() => setQuotationModal({ status: true, type: "quotation" })}>
            Request Quotation & Details
          </button>

          {
            selectedProduct?.price && (
              <button className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs md:text-sm font-semibold tracking-wide transition-colors cursor-pointer" onClick={() => setQuotationModal({ status: true, type: "order" })}>
                Order
              </button>
            )
          }

        </div>
      </div>




      {/* request quotation */}
      <QuotationModal quotationModal={quotationModal} setQuotationModal={setQuotationModal} selectedProduct={selectedProduct} />


    </>
  );
}