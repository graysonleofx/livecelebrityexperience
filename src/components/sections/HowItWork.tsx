import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Video, Star } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Browse & Search",
    description: "Discover thousands of verified celebrities across entertainment, sports, and more",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    step: 2,
    icon: Calendar,
    title: "Select & Book",
    description: "Choose your preferred booking type and schedule your personalized experience",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    step: 3,
    icon: Video,
    title: "Get Your Content",
    description: "Receive your custom video message or enjoy your exclusive meet & greet",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    step: 4,
    icon: Star,
    title: "Share & Enjoy",
    description: "Share your unforgettable celebrity experience with friends and family",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-celebrity bg-clip-text text-brand">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with celebrity bookings in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={step.step} 
              className="relative overflow-hidden group hover:shadow-luxury transition-all duration-300 bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                    {step.step}
                  </Badge>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Connecting Line (hidden on last card) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-transparent transform -translate-y-1/2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}