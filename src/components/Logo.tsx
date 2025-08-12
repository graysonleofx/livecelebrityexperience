import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  withText?: boolean;
  className?: string;
}

const Logo = ({ withText = true, className }: LogoProps) => {
  return (
    <Link to="/" aria-label="Celebrity Experience Home" className={`flex items-center gap-2 ${className ?? ""}`}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground shadow-elegant">
        <Crown className="h-5 w-5" />
      </span>
      {withText && (
        <span className="font-extrabold tracking-tight leading-none text-xl">
          Celebrity <span className="text-primary">Experience</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
