import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Users, Calendar, Shield } from "lucide-react"
import heroImage from "@/assets/hero/hero.jpg"


export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Celebrity booking platform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-brand"/>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center ">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <Badge className="bg-accent/10 text-accent border-accent/30 text-sm px-4 py-2 m-2">
            <Star className="h-4 w-4 mr-2" />
            #1 Celebrity Booking Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl mx-auto">
            Book Your Favorite
            <span className="bg-gradient-celebrity bg-clip-text text-primary block">
              Celebrities
            </span>
            in Minutes
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Connect with stars for meet & greets, shoutouts, and more. Experience unforgettable moments with your favorite celebrities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => window.location.href = '/Browse'}
            >
              Browse Celebrities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[200px] bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
              onClick={() => window.location.href = '/Contact'}
            >
              Contact Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2 animate-slide-in">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-bold text-primary-foreground">10K+</span>
              </div>
              <p className="text-primary-foreground/80">Verified Celebrities</p>
            </div>
            
            <div className="text-center space-y-2 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-center">
                <Calendar className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-bold text-primary-foreground">1M+</span>
              </div>
              <p className="text-primary-foreground/80">Bookings Completed</p>
            </div>
            
            <div className="text-center space-y-2 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-bold text-primary-foreground">100%</span>
              </div>
              <p className="text-primary-foreground/80">Secure & Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-glow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-glow" style={{ animationDelay: "1s" }} />
    </section>
  )
}