import React from "react";

export default function Features() {
  const comparisonRows = [
    {
      parameter: "Filtration",
      normal:
        "Depends on the quality and source of the water.",
      ro:
        "Uses reverse osmosis to remove many dissolved impurities.",
      ionized:
        "Multi-stage filtration followed by water ionization.",
    },
    {
      parameter: "pH",
      normal:
        "Generally close to neutral, depending on the source.",
      ro:
        "Usually neutral to slightly acidic after filtration.",
      ionized:
        "Produces alkaline water with adjustable pH levels.",
    },
    {
      parameter: "Natural Minerals",
      normal:
        "May naturally contain minerals such as calcium and magnesium.",
      ro:
        "A significant amount of dissolved minerals can be removed during RO filtration.",
      ionized:
        "Retains naturally occurring minerals while producing alkaline water.",
    },
    {
      parameter: "Oxidation-Reduction Potential",
      normal:
        "Varies depending on the water source.",
      ro:
        "Varies depending on the source and filtration process.",
      ionized:
        "Electrolysis can produce water with a lower ORP.",
    },
    {
      parameter: "Molecular Hydrogen",
      normal:
        "No intentionally added molecular hydrogen.",
      ro:
        "No intentionally added molecular hydrogen.",
      ionized:
        "Electrolysis can produce dissolved molecular hydrogen.",
    },
    {
      parameter: "Everyday Use",
      normal:
        "Drinking, cooking and general household use.",
      ro:
        "Drinking and cooking where highly filtered water is preferred.",
      ionized:
        "Drinking, cooking and selected household or commercial uses.",
    },
  ];

  return (
    <section className="relative w-full bg-white text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* MAIN HEADING */}
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0284c7]">
            The Immuno+ Difference
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#051937] mt-4">
            Water Designed Around
            <br />
            <span className="text-[#0284c7]">
              Everyday Wellness
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-8 mt-5 max-w-3xl mx-auto">
            Immuno+ brings together advanced filtration and electrolysis to
            create freshly produced ionized water. Understanding these two
            processes makes it easier to see how ionized water differs from
            ordinary and RO water.
          </p>

        </div>


        {/* CONTENT */}
        <div className="max-w-4xl mx-auto mt-14">

          {/* MAIN HEADING */}
          <div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#051937]">
              Ionized Alkaline Water
            </h3>

            <p className="text-base text-slate-600 leading-7 mt-3">
              Ionized water is produced by passing filtered water through an
              electrolysis chamber. An electrical current interacts with the
              water through specially designed electrodes, creating separate
              streams with different characteristics. The alkaline stream is
              the one generally selected for drinking.
            </p>

          </div>


          {/* NESTED CONTENT */}
          <div className="ml-6 sm:ml-10 mt-7">

            <h4 className="text-lg sm:text-xl font-semibold text-[#051937]">
              Molecular Hydrogen & ORP
            </h4>

            <p className="text-sm sm:text-base text-slate-600 leading-7 mt-2">
              Electrolysis can also produce dissolved molecular hydrogen in
              the alkaline water and change its oxidation-reduction
              potential, commonly referred to as ORP. These are measurable
              characteristics of ionized water and are part of what
              distinguishes it from conventionally filtered water.
            </p>

          </div>


          {/* NESTED CONTENT */}
          <div className="ml-6 sm:ml-10 mt-7">

            <h4 className="text-lg sm:text-xl font-semibold text-[#051937]">
              Alkalinity & Mineral Content
            </h4>

            <p className="text-sm sm:text-base text-slate-600 leading-7 mt-2">
              Alkaline water has a pH above 7. During ionization, the water
              is separated into streams with different pH levels. The final
              mineral content depends on the original source water because
              ionization works with the minerals already present rather than
              simply adding them to the water.
            </p>

          </div>


          {/* MAIN HEADING */}
          <div className="mt-12">

            <h3 className="text-2xl sm:text-3xl font-bold text-[#051937]">
              Filtration Meets Ionization
            </h3>

            <p className="text-base text-slate-600 leading-7 mt-3">
              Filtration and ionization perform different functions.
              Filtration focuses on reducing unwanted substances from the
              incoming water, while ionization changes its electrochemical
              characteristics. Combining the two gives Immuno+ a more
              complete water-treatment approach than relying on either
              process alone.
            </p>

          </div>


          {/* NESTED CONTENT */}
          <div className="ml-6 sm:ml-10 mt-7">

            <h4 className="text-lg sm:text-xl font-semibold text-[#051937]">
              From Purification to Personal Use
            </h4>

            <p className="text-sm sm:text-base text-slate-600 leading-7 mt-2">
              The system produces water when you need it, rather than
              requiring you to continuously purchase and store packaged
              water. This makes it practical for everyday drinking and
              cooking at home, as well as for offices, fitness centres,
              clinics, hotels and other commercial environments.
            </p>

          </div>


          {/* NESTED CONTENT */}
          <div className="ml-6 sm:ml-10 mt-7">

            <h4 className="text-lg sm:text-xl font-semibold text-[#051937]">
              Water for Different Needs
            </h4>

            <p className="text-sm sm:text-base text-slate-600 leading-7 mt-2">
              Different water settings can be selected according to the
              intended use. Drinking water, cooking water and other
              applications can therefore be approached differently, while
              the system provides a convenient source from a single
              installation.
            </p>

          </div>

        </div>


        {/* COMPARISON TABLE */}
        <div className="mt-20">

          <div className="max-w-3xl mx-auto text-center mb-9">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0284c7]">
              Water Comparison
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#051937] mt-3">
              Normal Water vs RO Water vs Ionized Water
            </h3>

            <p className="text-sm sm:text-base text-slate-500 mt-3">
              A clear comparison of the characteristics that set each type
              of water apart.
            </p>

          </div>


          <div className="overflow-x-auto rounded-xl border border-slate-200">

            <table className="w-full min-w-[900px] text-left border-collapse bg-white">

              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">

                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[22%]">
                    Water Feature
                  </th>

                  <th className="py-5 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider w-[26%]">
                    Normal Water
                  </th>

                  <th className="py-5 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider w-[26%]">
                    RO Water
                  </th>

                  <th className="py-5 px-6 text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-sky-50 w-[26%]">
                    Ionized Water
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {comparisonRows.map((row, index) => (

                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >

                    <td className="py-5 px-6 font-semibold text-[#051937] align-top bg-slate-50/40">
                      {row.parameter}
                    </td>

                    <td className="py-5 px-6 text-sm text-slate-600 align-top leading-relaxed">
                      {row.normal}
                    </td>

                    <td className="py-5 px-6 text-sm text-slate-600 align-top leading-relaxed">
                      {row.ro}
                    </td>

                    <td className="py-5 px-6 text-sm font-medium text-slate-900 bg-sky-50/50 align-top leading-relaxed border-l border-r border-sky-100">
                      {row.ionized}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </section>
  );
}
