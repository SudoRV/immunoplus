import fullLogo from "../../assets/immuno-logo-full.png";
import navbarLogo from "../../assets/navbar-logo.png";


export default function Logo({ type, className }) {    
    if (type === "horizontal") {
        return (                  
  <div className="relative w-fit px-6 py-1 group">
    <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-slate-100 to-blue-200 rounded-[100%] -rotate-6 scale-[1.15] -z-10 shadow-[0_0_25px_rgba(255,255,255,0.3)] border border-white/60 transition-transform duration-300 group-hover:scale-[1.2]"></div>
    
    {/* 
      Optional: Secondary colored glow underneath to blend with the dark background 
    */}
    <div className="absolute inset-0 bg-cyan-500/20 rounded-[100%] blur-xl -z-20 scale-125"></div>
    
    {/* Logo */}
    <img 
      src={fullLogo} 
      alt="Immun💧+" 
      // Note: changed h-18 to h-16/h-20 as h-18 is not a standard Tailwind class
      className={`relative h-16 sm:h-20 w-auto object-contain drop-shadow-sm ${className}`} 
    />
  </div>       
);

    }

    if (type === "custom") {
        return <img src={navbarLogo} alt="Immuno+ Logo" className={`h-10 sm:h-14 w-fit ${className}`} />;
    }

    // Default
    return <img src={fullLogo} alt="Immuno+ Logo" />;
}
