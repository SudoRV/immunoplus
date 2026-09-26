import hydrogenBottle from "../assets/products/hydrogen_bottle.png";
import mistMaker from "../assets/products/mist_maker.png"

// layer 9
import layer9_front from "../assets/products/9 layer/front.png";
import layer9_frontSide from "../assets/products/9 layer/front_side.png";
import layer9_side from "../assets/products/9 layer/side.png";
import layer9_back from "../assets/products/9 layer/back.png";

// layer 9 touch
import layer9_touch_front from "../assets/products/9 layer Touch/front.png";
import layer9_touch_frontSide from "../assets/products/9 layer Touch/front_side.png";

// layer 7
import layer7_front from "../assets/products/7 layer/front.png";
import layer7_frontSide from "../assets/products/7 layer/front_side.png";
import layer7_side from "../assets/products/7 layer/side.png";
import layer7_back from "../assets/products/7 layer/back.png";

// layer 5
import layer5_front from "../assets/products/5 layer/front.png";
import layer5_frontSide from "../assets/products/5 layer/front_side.png";
import layer5_sideFront from "../assets/products/5 layer/side_front.png";
import layer5_back from "../assets/products/5 layer/back.png";
import layer5_sideBack from "../assets/products/5 layer/side_back.png";

//benefits 
import immunoBenifits from "../assets/products/benefits.png"

const products = [
  {
    id: "ionizer-plate-9",
    name: "Water Ionizer",
    variant: "9 Plate",
    description: "Premium 9-plate hydrogen water ionizer",
    image: layer9_front,
    popular: true,
    ctaText: "View Details",
    ctaPrimary: true,
    features: [
      "9-plate electrolysis technology",
      "Advanced water ionization",
      "High-performance operation",
      "Premium home & wellness use",
    ],
    mrp: 189999,
    price: 119999,
    details: {
      mrp: "₹1,89,999",
      launchPrice: "₹1,19,999",

      warranty: {
        default: {
          electronics: "3 Years",
          chamber: "5 Years",
        },
        extended: {
          duration: "5 Years",
          price: "₹4,999",
        },
      },

      overview:
        "Our flagship 9-plate alkaline ionization system built for heavy daily usage in premium residences and wellness spaces, delivering maximum dissolved hydrogen concentration and wide pH customizability.",
      workingPrinciple:
        "High-amperage Switched-Mode Power Supply (SMPS) driven electrolysis through 9 large-surface-area solid platinum-titanium electrodes. Integrates multi-stage carbon and ultra-filtration to purify inlet water before separating it into potent antioxidant streams.",
      outputCapacity: "50 - 80 Liters/min (LPM)",
      powerConsumption: "5W – 100W (Operational) / < 5W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Advanced SMPS)",
      lcdDisplay: "pH/ORP/Temperature / Process",
      electrodePlates: "9 Solid plates",
      electrodeMaterial: "Platinum-Coated 0.5 micron Titanium Base",
      platesSize: "154mm x 75mm x 0.5mm",
      pHRange: "5.0 – 11 pH",
      waterPressure: "0.3 MPA",
      waterModes: [
        "4 Alkaline levels (Strong wash, Daily Drinking, Cooking, Tea/Coffee)",
        "1 Neutral purified water level (Medication & Baby formula)",
        "2 Acidic levels (Strong sanitization & Beauty astringent)",
      ],
      cleaningSystem:
        "Automated DARC (Double Automatic Reverse Cleaning) with zero chamber scaling pause",
      images: [
        layer9_front,
        layer9_frontSide,
        layer9_side,
        layer9_back,
        immunoBenifits,
      ],
    },
  },

  {
    id: "ionizer-hybrid-touch-fhd-plate-9",
    name: "Hybrid Water Ionizer",
    variant: "7-Inch FHD Touch 9 Plate",
    description:
      "Premium 9-plate hydrogen water ionizer with advanced 7-inch FHD touch panel",
    image: layer9_touch_front,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "9-plate electrolysis technology",
      "Advanced 7-inch FHD touch panel",
      "Powered by Japanese Technology",
      "Premium home & wellness use",
    ],
    mrp: 199999,
    price: 129999,
    details: {
      mrp: "₹1,99,999",
      launchPrice: "₹1,29,999",

      warranty: {
        default: {
          electronics: "3 Years",
          chamber: "5 Years",
        },
        extended: {
          duration: "5 Years",
          price: "₹4,999",
        },
      },

      overview:
        "Our flagship 9-plate hybrid alkaline ionization system featuring an advanced 7-inch FHD touch panel. Built for heavy daily usage in premium residences and wellness spaces, delivering maximum dissolved hydrogen concentration and wide pH customizability.",
      workingPrinciple:
        "High-amperage Switched-Mode Power Supply (SMPS) driven electrolysis through 9 large-surface-area solid platinum-titanium electrodes. Integrates multi-stage carbon and ultra-filtration to purify inlet water before separating it into potent antioxidant streams.",
      outputCapacity: "50 - 80 Liters/min (LPM)",
      powerConsumption: "5W – 100W (Operational) / < 5W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Advanced SMPS)",
      lcdDisplay:
        "7-inch FHD Touch Panel (On-screen Alkaline, Acidic, Purified, and Settings controls)",
      electrodePlates: "9 Solid plates",
      electrodeMaterial: "Platinum-Coated 0.5 micron Titanium Base",
      platesSize: "154mm x 75mm x 0.5mm",
      pHRange: "5.0 – 11 pH",
      waterPressure: "0.2 MPA",
      waterModes: [
        "4 Alkaline levels (Strong wash, Daily Drinking, Cooking, Tea/Coffee)",
        "1 Neutral purified water level (Medication & Baby formula)",
        "2 Acidic levels (Strong sanitization & Beauty astringent)",
      ],
      cleaningSystem:
        "Automated DARC (Double Automatic Reverse Cleaning) with zero chamber scaling pause",
      images: [
        layer9_touch_front,
        layer9_touch_frontSide,
        layer9_side,
        layer9_back,
        immunoBenifits,
      ],
    },
  },

  {
    id: "ionizer-plate-7",
    name: "Water Ionizer",
    variant: "7 Plate",
    description: "Advanced 7-plate hydrogen water ionizer",
    image: layer7_front,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "7-plate electrolysis technology",
      "Efficient water ionization",
      "Advanced performance",
      "Ideal for homes & wellness spaces",
    ],
    mrp: 169999,
    price: 99999,
    details: {
      mrp: "₹1,69,999",
      launchPrice: "₹99,999",

      warranty: {
        default: {
          electronics: "3 Years",
          chamber: "5 Years",
        },
        extended: {
          duration: "5 Years",
          price: "₹4,999",
        },
      },

      overview:
        "A highly efficient 7-plate domestic electrolysis system designed for modern homes, offering a perfect balance of performance, mineral-rich alkaline output, and sleek design.",
      workingPrinciple:
        "Direct-flow continuous electrolysis using a 7-plate solid platinum-coated titanium chamber. Uses ion-permeable membranes to separate filtered tap water into specialized alkaline and acidic outputs.",
      outputCapacity: "50 – 70 Liters/min (LPM)",
      powerConsumption: "5W - 100W (Operational) / < 5W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Integrated SMPS)",
      electrodePlates: "7 Solid plates",
      electrodeMaterial: "Platinum-Coated 0.5 micron Titanium Base",
      platesSize: "154mm x 75mm x 0.5mm",
      pHRange: "5.0 – 10 pH",
      waterPressure: "0.2 MPA",
      waterModes: [
        "3 Alkaline levels (Daily Drinking, Cooking, Tea/Coffee)",
        "1 Neutral purified water level (Medication & Baby formula)",
        "2 Acidic levels (Surface sanitization & Facial astringent)",
      ],
      cleaningSystem:
        "Automatic reverse polarity self-cleaning cycle after every dispense",
      images: [
        layer7_front,
        layer7_frontSide,
        layer7_side,
        layer7_back,
        immunoBenifits,
      ],
    },
  },

  {
    id: "ionizer-plate-5",
    name: "Water Ionizer",
    variant: "5 Plate",
    description: "Compact 5-plate water ionization system",
    image: layer5_front,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "5-plate electrolysis technology",
      "Compact design",
      "Efficient water ionization",
      "Ideal for everyday home use",
    ],
    mrp: 149999,
    price: 89999,
    details: {
      mrp: "₹1,49,999",
      launchPrice: "₹89,999",

      warranty: {
        default: {
          electronics: "3 Years",
          chamber: "5 Years",
        },
        extended: {
          duration: "5 Years",
          price: "₹4,999",
        },
      },

      overview:
        "Our entry-level compact domestic ionization system, engineered specifically for smaller kitchens or clinics looking to bring mineral-rich, antioxidant drinking water into their daily routine.",
      workingPrinciple:
        "Standard electrolysis via a 5-plate solid platinum-coated titanium chamber. Cleanses water of sediment and chlorine before enriching it with OH⁻ ions and dissolved molecular hydrogen.",
      outputCapacity: "50 – 60 Liters/min (LPM)",
      powerConsumption: "5W - 100W (Operational) / < 5W (Standby)",
      powerSupply: "220V - 240V AC, 50/60 Hz (Integrated SMPS)",
      electrodePlates: "5 Solid plates",
      electrodeMaterial: "Platinum-Coated 0.5 micron Titanium Base",
      platesSize: "154mm x 75mm x 0.5mm",
      pHRange: "7.0 – 11 pH",
      waterPressure: "0.1 MPA",
      waterModes: [
        "3 Alkaline levels (Daily Drinking, Cooking, Tea/Coffee)",
        "1 Neutral purified water level",
        "1 Mild Acidic level (Beauty wash)",
      ],
      cleaningSystem:
        "Automatic reverse polarity self-cleaning cycle after every dispense",
      images: [
        layer5_front,
        layer5_frontSide,
        layer5_back,
        layer5_sideBack,
        layer5_back,
        immunoBenifits,
      ],
    },
  },

  {
    id: "mist-maker",
    name: "Mist Maker",
    variant: "300 ml",
    description: "Portable 300 ml water mist spray bottle",
    image: mistMaker,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "300 ml capacity",
      "Fine water mist spray",
      "Portable design",
      "Convenient everyday use",
    ],
    mrp: 999,
    price: 499,
    details: {
      mrp: "₹999",
      launchPrice: "₹499",
      overview: "A travel-friendly misting bottle designed to convert ionized acidic water (or standard purified water) into an ultra-fine, hydrating micro-mist for skin care and cooling on the go.",
      workingPrinciple: "High-pressure mechanical atomization nozzle that breaks down water droplets into a highly absorbent, uniform micro-mist without the use of aerosols.",       
      waterModes: [
        "Continuous ultra-fine misting mode"
      ],
      generalInformation: {
        "Package Includes": "1 x 300ml Spray Bottle (Color: Black, Material: Polyethylene Terephthalate).",
        "Recommended Use": "Fill with pH 5.5 beauty water to cleanse your face from environmental dirt and pollution.",
        "Leak-Proof Design": "Pump the trigger a few times to expel the air until an ultra-fine mist is formed.",
        "360-Degree Spraying Option": "Spray with the bottle upside down without leakage or loss of prime, easily reaching all areas.",
        "Continuous Spray": "Produces a stream of sustained mist lasting a few seconds to cover large areas quickly. The ergonomic design reduces hand fatigue compared to traditional sprayers.",
        "Ultra Mist Spray Pattern": "Provides the right amount of water to mildly saturate hair without getting gunked, perfect for refreshing curls or taming a bed-head."
      },
      cleaningSystem: "Easy-rinse detachable nozzle and tank",    
      images: [mistMaker],    
    },
  },

  {
    id: "hydrogen-water-bottle",
    name: "Hydrogen Water Bottle",
    variant: "420 ml",
    description: "Portable 420 ml hydrogen water bottle",
    image: hydrogenBottle,
    popular: false,
    ctaText: "View Details",
    ctaPrimary: false,
    features: [
      "420 ml capacity",
      "Hydrogen water generation",
      "Portable design",
      "Ideal for everyday hydration",
    ],
    mrp: 20000,
    price: 12000,
    details: {
      mrp: "₹20,000",
      launchPrice: "₹12,000",
      overview: "A rechargeable, portable hydration solution that infuses standard drinking water with high concentrations of dissolved molecular hydrogen (H₂) in just minutes, perfect for gym-goers, commuters, and athletes.",
      workingPrinciple: "Advanced SPE (Solid Polymer Electrolyte) and PEM (Proton Exchange Membrane) technology safely separates hydrogen and oxygen, dissolving pure H₂ into the water while expelling ozone and chlorine gases out of the base.",
      outputCapacity: "420 ml total volume per 3-5 minute cycle",
      powerSupply: "Rechargeable Lithium-Ion Battery (USB Type-C)",
      electrodePlates: "Titanium base plates with Platinum coating + SPE Membrane",    
      orpPerformance: "Up to -400 mV / Dissolved H₂ up to 1300 ppb",
      waterModes: [
        "3-Minute Quick H₂ Generation Cycle",
        "5-Minute Deep H₂ Infusion Cycle"
      ],
      cleaningSystem: "Manual wash (Base is IPX4 water-resistant)",
      images: [hydrogenBottle],
      generalInformation: {
        "Electrolysis-Based Hydrogen Water Generation": "This hydrogen water bottle uses built-in electrolysis technology to generate hydrogen-enriched water when operated as instructed. Designed for users who prefer a modern, electronic approach to daily hydration without additives or chemicals.",
        "Simple One-Button Operation with Indicator Light": "Designed for ease of use with a single power button. Fill the bottle with clean drinking water, close the lid securely, and press the button to start the operation cycle. Visual indicators help confirm the device is working during use.",
        "USB Rechargeable and Portable Design": "Equipped with a USB rechargeable power system for convenient charging at home, in the office, or while traveling. Compact and lightweight design makes it easy to carry in backpacks, handbags, or gym bags.",
        "Durable Glass Body with Metal Base and Lid": "Features a transparent glass bottle combined with a sturdy metal base and lid. The clear body allows users to see the water during operation, while the solid construction supports regular daily use.",
        "420 ml Capacity for Personal Hydration": "The 420 ml size is suitable for individual hydration needs throughout the day. Ideal for use at home, office desks, travel, or short outdoor activities.",
        "Designed for Daily Use and Easy Cleaning": "The bottle can be easily cleaned by rinsing with clean water after use. The smooth interior surface helps reduce residue buildup when used and maintained according to the included user manual.",
        "Intended for General Hydration Use Only": "This product is designed for general water consumption and everyday hydration purposes. It is not intended to diagnose, treat, cure, or prevent any disease. Please read the user manual carefully before use."
      }
    }
  }
];

export default products;
