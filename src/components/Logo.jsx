import { Crown } from "lucide-react";
import brand from "@/assets/brand.png";
import { Link } from "react-router-dom";

const Logo = ({ withText = true, className }) => {
  return (
    <Link to="/" aria-label="Celebrity Experience Home" className={`flex items-center gap-2 ${className ?? ""}`}>
      <img src={brand} alt="Brand Logo" className="h-11 border-2" />
      {withText && (
        <span className="font-extrabold tracking-tight leading-none text-xl">
          Celebrity <span className="text-primary">Experience</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
