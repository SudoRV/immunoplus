import logo from "../../assets/logo.png";
import verticalLogo from "../../assets/logo_vertical.png";
import horizontalLogo from "../../assets/logo_horizontal.png";

export default function Logo({ type }) {
    if (type === "vertical") {
        return <img src={verticalLogo} alt="Immuno+ Logo" className="h-10 sm:h-14 w-fit" />;
    }

    if (type === "horizontal") {
        return <img src={horizontalLogo} alt="Immuno+ Logo" className="h-10 sm:h-14 w-fit" />;
    }

    if (type === "custom") {
        return (
            <div
                className="relative flex items-center select-none cursor-pointer -ml-1 w-fit"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                <img
                    src={logo}
                    alt="Immuno+ Logo"
                    className="h-10 sm:h-14"
                />

                <div className="flex flex-col justify-center items-center">
                    <p className="text-white font-bold tracking-wider text-base sm:text-lg lg:text-xl leading-4">
                        IMMUNO
                    </p>

                    <span className="font-bold text-lg sm:text-xl md:text-2xl text-blue-400 absolute -right-2 -top-2 sm:-right-3 sm:-top-1.5">
                        +
                    </span>

                    <p className="text-[10px] font-semibold leading-tight text-sky-400 w-fit">
                        A Drop of Heaven
                    </p>
                </div>
            </div>
        );
    }

    // Default
    return <img src={logo} alt="Immuno+ Logo" />;
}