import { Crown } from "lucide-react";
import brand from "@/assets/brand.png";
import { Link } from "react-router-dom";

const Logo = ({ withText = true, className }) => {
  return (
    <Link to="/" aria-label="Celebrity Experience Home" className={`flex items-center gap-2 ${className ?? ""}`}>
      <div className="flex items-center h-8 md:h-11 md:mx-6 sm:h-7">
        <img src={brand} alt="Brand Logo" className="border-2 h-7 md:h-11 object-cover" />
      </div>
      {withText && (
        <span className="font-extrabold tracking-tight leading-none md:text-sm lg:text-xl ">
          Celebrity <span className="text-primary">Experience</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
