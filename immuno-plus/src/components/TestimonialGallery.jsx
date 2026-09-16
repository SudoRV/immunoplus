import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Quote, X } from "lucide-react";

const clients = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=85",
    name: "Rahul Sharma",
    role: "Hospital Director",
    description:
      "The solution has made our daily operations much simpler. The team was professional, responsive, and easy to work with throughout the entire process.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=85",
    name: "Priya Mehta",
    role: "Wellness Consultant",
    description:
      "A smooth experience from beginning to end. We were able to introduce the solution into our workflow without unnecessary complexity.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85",
    name: "Amit Verma",
    role: "Business Owner",
    description:
      "What stood out most was the simplicity. Everything feels thoughtfully designed and the support has been excellent.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85",
    name: "Neha Singh",
    role: "Clinic Manager",
    description:
      "Our team adapted quickly and the overall experience has been very positive. It has become a valuable part of our workflow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85",
    name: "Arjun Kapoor",
    role: "Hotel Manager",
    description:
      "The implementation was straightforward and the solution fits naturally into our business requirements.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85",
    name: "Ananya Gupta",
    role: "Health Coach",
    description:
      "A modern and reliable solution. The attention to detail and overall user experience really impressed us.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=85",
    name: "Vikram Singh",
    role: "Gym Owner",
    description:
      "Everything was handled professionally. The solution has helped us provide a more consistent experience for our customers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85",
    name: "Sneha Kapoor",
    role: "Wellness Expert",
    description:
      "The process was simple, transparent, and professional. We appreciated the attention given to our specific requirements.",
  },
];

/*
|--------------------------------------------------------------------------
| Random visual properties
|--------------------------------------------------------------------------
|
| No explicit image size is stored in the testimonial data.
| Each image gets a random size / rotation / vertical position.
|
*/

const randomStyles = [
  {
    width: "w-[92px]",
    height: "h-[122px]",
    rotate: "-rotate-2",
    margin: "mt-10",
  },
  {
    width: "w-[108px]",
    height: "h-[142px]",
    rotate: "rotate-1",
    margin: "mt-0",
  },
  {
    width: "w-[86px]",
    height: "h-[116px]",
    rotate: "-rotate-1",
    margin: "mt-14",
  },
  {
    width: "w-[112px]",
    height: "h-[148px]",
    rotate: "rotate-2",
    margin: "mt-3",
  },
  {
    width: "w-[96px]",
    height: "h-[128px]",
    rotate: "-rotate-2",
    margin: "mt-8",
  },
  {
    width: "w-[105px]",
    height: "h-[138px]",
    rotate: "rotate-1",
    margin: "mt-1",
  },
];

function getRandomStyle(index) {
  return randomStyles[index % randomStyles.length];
}

function ClientImage({
  client,
  index,
  onSelect,
  isSelected,
}) {
  const style = getRandomStyle(index);

  return (
    <button
      type="button"
      onClick={() => onSelect(client)}
      aria-label={`View feedback from ${client.name}`}
      className={`
        group
        relative
        shrink-0
        overflow-visible
        ${style.width}
        ${style.height}
        ${style.margin}
        ${style.rotate}

        rounded-2xl

        transition-all
        duration-500
        ease-out

        ${
          isSelected
            ? "z-50 scale-[1.18] rotate-0"
            : "hover:z-30 hover:scale-110 hover:rotate-0"
        }

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
      `}
    >
      {/* Image */}

      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-100
          shadow-sm
          transition-all
          duration-500

          group-hover:border-blue-500/50
          group-hover:shadow-xl
          group-hover:shadow-blue-500/10
        "
      >
        <img
          src={client.image}
          alt={client.name}
          loading="lazy"
          draggable="false"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Hover overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-neutral-800/50
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Click indicator */}

        <div
          className="
            absolute
            bottom-2
            right-2
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-blue-500
            text-white
            opacity-0
            shadow-md
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <Quote size={11} fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

function ImageScroller({
  selectedClient,
  onSelect,
  onPause,
  onResume,
}) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const scroll = () => {
      if (!selectedClient) {
        container.scrollLeft += 0.45;

        /*
         * Because the images are duplicated,
         * reset at the halfway point.
         */
        if (
          container.scrollLeft >=
          container.scrollWidth / 2
        ) {
          container.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(scroll);
    };

    animationRef.current =
      requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [selectedClient]);

  const duplicatedClients = [
    ...clients,
    ...clients,
  ];

  return (
    <div
      ref={scrollRef}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={onPause}
      onTouchEnd={() => {
        setTimeout(onResume, 1200);
      }}
      className="
        h-full
        w-full
        overflow-x-auto
        overflow-y-visible
        scrollbar-hide
        touch-pan-x
        overscroll-x-contain
      "
    >
      <div
        className="
          flex
          min-w-max
          items-start
          gap-5
          px-[calc(50vw-360px)]
          py-2

          sm:gap-6
          sm:px-[calc(50vw-440px)]

          lg:gap-7
          lg:px-[calc(50vw-520px)]
        "
      >
        {duplicatedClients.map((client, index) => (
          <ClientImage
            key={index}
            client={client}
            index={index % clients.length}
            isSelected={
              selectedClient?.name === client.name
            }
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialGallery() {
  const [selectedClient, setSelectedClient] =
    useState(null);

  const isPaused = useRef(false);

  const pauseScroll = () => {
    isPaused.current = true;
  };

  const resumeScroll = () => {
    isPaused.current = false;
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-22">

      {/* =====================================================
          IMAGE SCROLLER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          mb-12
          h-[190px]
          w-full

          sm:mb-14
          sm:h-[215px]

          lg:h-[235px]
        "
      >
        <ImageScroller
          selectedClient={selectedClient}
          onSelect={(client) => {
            pauseScroll();
            setSelectedClient(client);
          }}
          onPause={pauseScroll}
          onResume={resumeScroll}
        />
      </div>

      {/* =====================================================
          CENTER CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-2xl
          flex-col
          items-center
          px-6
          text-center
        "
      >
        {/* Label */}

        <div className="mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-neutral-500
            "
          >
            Client Testimonials
          </span>
        </div>

        {/* Heading */}

        <h2
          className="
            text-[34px]
            font-semibold
            leading-[1.08]
            tracking-[-0.035em]
            text-neutral-800

            sm:text-[44px]
            lg:text-[52px]
          "
        >
          Trusted by leaders
          <br />

          <span className="text-neutral-400">
            from various industries
          </span>
        </h2>

        {/* Description */}

        <p
          className="
            mt-5
            max-w-lg
            text-[13px]
            leading-6
            text-neutral-500

            sm:text-sm
          "
        >
          Discover how businesses and professionals
          are using our solutions to improve efficiency,
          simplify operations, and deliver better
          experiences.
        </p>

        {/* CTA */}
        {/*
            <button
          type="button"
          className="
            group
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-neutral-800
            px-5
            py-2.5
            text-xs
            font-medium
            text-white
            transition-all
            duration-300
            hover:bg-blue-500
            hover:shadow-lg
            hover:shadow-blue-500/20
          "
        >
          Read Success Stories

          <span
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-white/10
              transition-transform
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          >
            <ArrowUpRight size={12} />
          </span>
        </button>
         */}
        
      </div>

      {/* =====================================================
          SELECTED TESTIMONIAL
      ====================================================== */}

      {selectedClient && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-neutral-800/25
            px-5
            backdrop-blur-sm
          "
          onClick={() => {
            setSelectedClient(null);
            resumeScroll();
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-neutral-200
              bg-white
              p-7
              shadow-2xl
              sm:p-8
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}

            <button
              type="button"
              onClick={() => {
                setSelectedClient(null);
                resumeScroll();
              }}
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-neutral-100
                text-neutral-600
                transition
                hover:bg-blue-500
                hover:text-white
              "
              aria-label="Close testimonial"
            >
              <X size={16} />
            </button>

            {/* Client information */}

            <div className="flex items-center gap-4 pr-8">
              <img
                src={selectedClient.image}
                alt={selectedClient.name}
                className="
                  h-16
                  w-16
                  shrink-0
                  rounded-2xl
                  object-cover
                "
              />

              <div>
                <h3 className="text-sm font-semibold text-neutral-800">
                  {selectedClient.name}
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  {selectedClient.role}
                </p>
              </div>
            </div>

            {/* Quote */}

            <div className="mt-6 flex gap-3">
              <Quote
                size={24}
                className="mt-1 shrink-0 text-blue-500"
                fill="currentColor"
              />

              <p
                className="
                  text-sm
                  leading-7
                  text-neutral-600
                "
              >
                {selectedClient.description}
              </p>
            </div>

            {/* Close hint */}

            <p className="mt-6 text-[10px] text-neutral-400">
              Click outside to close
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          CUSTOM CSS
      ====================================================== */}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide img {
          -webkit-user-drag: none;
          user-select: none;
        }
      `}</style>
    </section>
  );
}