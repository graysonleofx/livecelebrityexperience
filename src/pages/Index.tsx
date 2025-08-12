import { HeroSection } from "@/components/HeroSection";
import SEO from "@/components/SEO";
import CelebrityCard from "@/components/CelebrityCard.jsx";
import { celebrities, Celebrity } from "@/data/celebrities";
import BookingModal from "@/components/BookingModal.jsx";
import DonationModal from "@/components/DonationModal.jsx";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import { HowItWorks } from "@/components/sections/HowItWork";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [selected, setSelected] = useState<Celebrity | undefined>();

  const openBook = (c: Celebrity) => { setSelected(c); setBookingOpen(true); };
  const openDonate = (c: Celebrity) => { setSelected(c); setDonateOpen(true); };

  return (
    <>
      <SEO title="Celebrity Experience — Book Celebrities Fast" description="Connect with stars for meet & greets, shoutouts, and more." />
      <HeroSection />

      <section aria-labelledby="featured" className="container mx-auto px-4 py-12">
        <h2 id="featured" className="text-2xl md:text-3xl font-bold mb-6">Featured Celebrities</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {celebrities.slice(0,6).map((c) => (
            <CelebrityCard key={c.id} celeb={c} onBook={openBook} onDonate={openDonate} />
          ))}
        </div>
      </section>

      <AboutSection />
      <HowItWorks/>
      <TestimonialsSection />
      <FAQSection />

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does booking work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Choose your experience tier, pick a date and time, and complete payment. We’ll confirm the details and coordinate with the celebrity.",
                },
              },
              {
                "@type": "Question",
                name: "What tiers are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard (most affordable), Premium (extra perks), and VIP (top-tier access and priority handling).",
                },
              },
              {
                "@type": "Question",
                name: "Can I get a refund?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Refunds are reviewed on a case-by-case basis depending on the situation and scheduling constraints.",
                },
              },
            ],
          }),
        }}
      />

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} celeb={selected} />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} celeb={selected} />
    </>
  );
};

export default Index;
