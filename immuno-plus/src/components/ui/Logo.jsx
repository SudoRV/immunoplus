import logo from "../../assets/logo.png";
import navLogo from "../../assets/nav_logo.png";


export default function Logo({ type, className }) {    
    if (type === "horizontal") {
        return (                  
          <div className="relative w-fit px-8">
            {/* White tilted oval */}
            <div className="absolute inset-0 bg-white rounded-[50%] rotate-[-8deg] scale-[1.05] -z-10"></div>
            
            {/* Logo */}
            <img src={logo} alt="Immun💧+" className={`h-18 sm:h-16 w-fit ${className}`} />
          </div>       
        );
    }

    if (type === "custom") {
        return <img src={navLogo} alt="Immuno+ Logo" className={`h-10 sm:h-14 w-fit ${className}`} />;
    }

    // Default
    return <img src={logo} alt="Immuno+ Logo" />;
}