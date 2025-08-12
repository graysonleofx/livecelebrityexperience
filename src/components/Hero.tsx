import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero/hero.jpg";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Excited fans at a celebrity event, representing memorable experiences"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/10" aria-hidden="true" />
        <div className="absolute inset-0 opacity-0 pointer-events-none bg-gradient-brand" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 py-24 md:py-32 text-center text-card-foreground">
        <h1 className=" text-4xl md:text-5xl font-bold mb-4">
          Unforgettable Celebrity Experiences
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
          Book meet & greets, video shoutouts, and premium appearances in minutes.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/browse">
            <Button size="lg" variant="hero" className="hover-scale">Book Now</Button>
          </Link>
          <a href="#about">
            <Button size="lg" variant="outline" className="hover-scale">Learn More</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
